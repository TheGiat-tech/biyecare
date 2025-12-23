import type { BleedingType, DischargeType } from "../models/types";
import type { CycleContext } from "../utils/cycleContext";

export function getBleedingDischargeInsight(params: {
  bleedingType?: BleedingType;
  dischargeType?: DischargeType;
  context: CycleContext;
}) {
  const bleedingType = params.bleedingType ?? "none";
  const dischargeType = params.dischargeType ?? "none";
  const { daysFromLastPeriodStart, daysToNextPeriod, isMidCycleEstimate } =
    params.context;

  if (bleedingType === "spotting") {
    if (daysToNextPeriod !== null && daysToNextPeriod >= 0 && daysToNextPeriod <= 2) {
      return "Spotting can sometimes show up as your period approaches.";
    }
    if (
      daysFromLastPeriodStart !== null &&
      daysFromLastPeriodStart >= 0 &&
      daysFromLastPeriodStart <= 3
    ) {
      return "Spotting can appear in the days just after a period.";
    }
  }

  if (dischargeType === "eggwhite" && isMidCycleEstimate) {
    return "Egg-white discharge is often noticed around mid-cycle.";
  }

  if (
    (dischargeType === "creamy" || dischargeType === "sticky") &&
    daysToNextPeriod !== null &&
    daysToNextPeriod >= 0 &&
    daysToNextPeriod <= 7
  ) {
    return "Creamy or sticky discharge is common later in the cycle.";
  }

  return null;
}
