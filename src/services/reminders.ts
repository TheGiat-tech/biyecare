import type {
  CycleEntry,
  PregnancyProfile,
  ReminderSettings,
  TrackingMode,
} from "../models/types";

export type ReminderScheduleState = {
  mode: TrackingMode;
  cycleEntries: CycleEntry[];
  pregnancy: PregnancyProfile | null;
  reminders: ReminderSettings;
};

export async function scheduleAllReminders(state: ReminderScheduleState) {
  void state;
  // TODO: Wire up expo-notifications to schedule period and pregnancy reminders.
}

export async function cancelAllReminders() {
  // TODO: Wire up expo-notifications to cancel scheduled reminders.
}
