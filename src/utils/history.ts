import type { SymptomEntry } from "../models/types";
import { addDays } from "./dates";

export type RecentLog = {
  date: string;
  bleedingType: SymptomEntry["bleedingType"];
  dischargeType: SymptomEntry["dischargeType"];
};

export function getRecentLogs(
  symptomsByDate: Record<string, SymptomEntry>,
  days: number
): RecentLog[] {
  const today = new Date();
  const startDate = addDays(today, -(days - 1));

  return Object.entries(symptomsByDate)
    .map(([isoDate, entry]) => {
      const date = entry.date ?? isoDate;
      return {
        date,
        parsedDate: new Date(date),
        bleedingType: entry.bleedingType ?? "none",
        dischargeType: entry.dischargeType ?? "none",
      };
    })
    .filter(
      (item) =>
        !Number.isNaN(item.parsedDate.getTime()) &&
        item.parsedDate >= startDate &&
        item.parsedDate <= today &&
        (item.bleedingType !== "none" || item.dischargeType !== "none")
    )
    .sort((left, right) => right.parsedDate.getTime() - left.parsedDate.getTime())
    .map(({ date, bleedingType, dischargeType }) => ({
      date,
      bleedingType,
      dischargeType,
    }));
}
