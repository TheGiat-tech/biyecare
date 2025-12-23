import type { CycleEntry, PregnancyProfile, SymptomEntry } from "../models/types";
import { calcPregnancyWeek, diffDays } from "./dates";

type DateHelpers = {
  calcNextPeriodDate: (cycleEntries: { startDate: string }[]) => Date;
  toISODate: (date: Date) => string;
};

export type SymptomSummary = { label: string; count: number };

export function calcAverageCycleLength(cycleEntries: CycleEntry[]) {
  if (cycleEntries.length < 2) {
    return null;
  }

  const sorted = [...cycleEntries].sort(
    (left, right) =>
      new Date(left.startDate).getTime() - new Date(right.startDate).getTime()
  );
  const lengths: number[] = [];

  for (let index = 1; index < sorted.length; index += 1) {
    const previousStart = new Date(sorted[index - 1].startDate);
    const currentStart = new Date(sorted[index].startDate);
    const length = diffDays(previousStart, currentStart);
    if (length > 0) {
      lengths.push(length);
    }
  }

  if (!lengths.length) {
    return null;
  }

  const average = lengths.reduce((sum, value) => sum + value, 0) / lengths.length;
  return Math.round(average);
}

export function calcAveragePeriodLength(cycleEntries: CycleEntry[]) {
  const lengths = cycleEntries
    .filter((entry) => entry.endDate)
    .map((entry) => {
      const start = new Date(entry.startDate);
      const end = new Date(entry.endDate as string);
      if (end.getTime() < start.getTime()) {
        return null;
      }
      return diffDays(start, end) + 1;
    })
    .filter((length): length is number => typeof length === "number");

  if (!lengths.length) {
    return null;
  }

  const average = lengths.reduce((sum, value) => sum + value, 0) / lengths.length;
  return Math.round(average);
}

export function calcNextPeriodPrediction(
  cycleEntries: CycleEntry[],
  datesHelpers: DateHelpers
) {
  return datesHelpers.toISODate(
    datesHelpers.calcNextPeriodDate(cycleEntries)
  );
}

export function calcTopSymptoms(
  symptomsByDate: Record<string, SymptomEntry>
): SymptomSummary[] {
  const counts: Record<string, number> = {
    Mood: 0,
    "Pain level": 0,
    Flow: 0,
    Notes: 0,
  };

  Object.values(symptomsByDate).forEach((entry) => {
    if (entry.mood?.trim()) {
      counts.Mood += 1;
    }
    if (entry.painLevel !== undefined) {
      counts["Pain level"] += 1;
    }
    if (entry.flow) {
      counts.Flow += 1;
    }
    if (entry.notes?.trim()) {
      counts.Notes += 1;
    }
  });

  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .filter((item) => item.count > 0)
    .sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }
      return left.label.localeCompare(right.label);
    })
    .slice(0, 3);
}

export function calcPregnancyProgress(
  profile: PregnancyProfile,
  referenceDate: Date
) {
  const summary = calcPregnancyWeek(profile, referenceDate);

  if (!summary.dueDate) {
    return {
      weeks: 0,
      days: 0,
      dueDate: null as Date | null,
      percent: 0,
    };
  }

  const totalDays = summary.weeks * 7 + summary.days;
  const percent = Math.min(100, Math.max(0, (totalDays / 280) * 100));

  return {
    weeks: summary.weeks,
    days: summary.days,
    dueDate: summary.dueDate,
    percent,
  };
}
