import type {
  CycleEntry,
  PregnancyProfile,
  ReminderSettings,
  SymptomEntry,
  TrackingMode,
  Order,
} from "../models/types";

const getAppVersion = (): string | undefined => {
  try {
    // Optional dependency in Expo apps.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Constants = require("expo-constants");
    return (
      Constants?.expoConfig?.version ??
      Constants?.default?.expoConfig?.version ??
      Constants?.manifest?.version ??
      Constants?.default?.manifest?.version
    );
  } catch (error) {
    return undefined;
  }
};

type HealthExportState = {
  mode: TrackingMode;
  cycleEntries: CycleEntry[];
  symptomsByDate: Record<string, SymptomEntry>;
  pregnancy: PregnancyProfile | null;
  reminders: ReminderSettings;
};

type OrdersExportState = {
  orders: Order[];
};

export type ExportPayload = {
  schemaVersion: 1;
  exportedAt: string;
  appVersion?: string;
  health: HealthExportState;
  orders: OrdersExportState;
};

export function buildExportPayload(
  healthState: HealthExportState,
  ordersState: OrdersExportState
): ExportPayload {
  const appVersion = getAppVersion();
  return {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    ...(appVersion ? { appVersion } : {}),
    health: healthState,
    orders: ordersState,
  };
}

export function stringifyExport(payload: ExportPayload) {
  return JSON.stringify(payload, null, 2);
}
