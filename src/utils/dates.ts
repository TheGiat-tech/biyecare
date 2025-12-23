const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function diffDays(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / MS_PER_DAY);
}

export function calcNextPeriodDate(cycleEntries: { startDate: string }[]) {
  if (!cycleEntries.length) {
    return addDays(new Date(), 28);
  }

  const sorted = [...cycleEntries].sort(
    (left, right) =>
      new Date(left.startDate).getTime() - new Date(right.startDate).getTime()
  );
  const lastEntry = sorted[sorted.length - 1];
  const cycleLengths: number[] = [];

  for (let index = 1; index < sorted.length; index += 1) {
    const previousStart = new Date(sorted[index - 1].startDate);
    const currentStart = new Date(sorted[index].startDate);
    const length = diffDays(previousStart, currentStart);
    if (length > 0) {
      cycleLengths.push(length);
    }
  }

  const averageLength =
    cycleLengths.length > 0
      ? cycleLengths.reduce((sum, value) => sum + value, 0) / cycleLengths.length
      : 28;

  return addDays(new Date(lastEntry.startDate), Math.round(averageLength));
}

export function calcPregnancyWeek(profile: {
  method: "lmp" | "dueDate";
  lmpDate?: string;
  dueDate?: string;
}) {
  const today = new Date();
  let lmpDate: Date | null = null;
  let dueDate: Date | null = null;

  if (profile.method === "lmp" && profile.lmpDate) {
    lmpDate = new Date(profile.lmpDate);
    dueDate = addDays(lmpDate, 280);
  }

  if (profile.method === "dueDate" && profile.dueDate) {
    dueDate = new Date(profile.dueDate);
    lmpDate = addDays(dueDate, -280);
  }

  if (!lmpDate || !dueDate) {
    return { weeks: 0, days: 0, dueDate: null as Date | null };
  }

  const gestationalAgeDays = Math.max(0, diffDays(lmpDate, today));
  const weeks = Math.floor(gestationalAgeDays / 7);
  const days = gestationalAgeDays % 7;

  return { weeks, days, dueDate };
}
