import type { CycleEntry } from "../models/types";
import { diffDays } from "./dates";

export type CycleContext = {
  daysToNextPeriod: number | null;
  daysFromLastPeriodStart: number | null;
  isMidCycleEstimate: boolean;
};

type CycleContextParams = {
  selectedDate: Date;
  cycleEntries: CycleEntry[];
  predictedNextPeriod: Date | null;
};

export function buildCycleContext({
  selectedDate,
  cycleEntries,
  predictedNextPeriod,
}: CycleContextParams): CycleContext {
  const lastPeriodStart = cycleEntries.length
    ? [...cycleEntries].sort(
        (left, right) =>
          new Date(right.startDate).getTime() -
          new Date(left.startDate).getTime()
      )[0].startDate
    : null;

  const daysFromLastPeriodStart = lastPeriodStart
    ? diffDays(new Date(lastPeriodStart), selectedDate)
    : null;

  const daysToNextPeriod =
    predictedNextPeriod && cycleEntries.length
      ? diffDays(selectedDate, predictedNextPeriod)
      : null;

  const isMidCycleEstimate =
    daysFromLastPeriodStart !== null &&
    daysFromLastPeriodStart >= 12 &&
    daysFromLastPeriodStart <= 16;

  return {
    daysToNextPeriod,
    daysFromLastPeriodStart,
    isMidCycleEstimate,
  };
}
