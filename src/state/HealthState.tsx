import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  CycleEntry,
  PregnancyProfile,
  ReminderSettings,
  ReminderType,
  SymptomEntry,
  TrackingMode,
} from "../models/types";
import { scheduleAllReminders } from "../services/reminders";
import { STORAGE_KEYS } from "../constants/storageKeys";

const createDefaultReminders = (): ReminderSettings => ({
  enabled: {
    periodPrediction: false,
    pregnancyWeekly: false,
  },
  timeOfDay: { hour: 9, minute: 0 },
  periodDaysBefore: 2,
});

type HealthStateValue = {
  mode: TrackingMode;
  cycleEntries: CycleEntry[];
  symptomsByDate: Record<string, SymptomEntry>;
  pregnancy: PregnancyProfile | null;
  reminders: ReminderSettings;
  setMode: (mode: TrackingMode) => void;
  addCycleEntry: (startDate: string, endDate?: string) => void;
  updateSymptom: (date: string, partial: Partial<SymptomEntry>) => void;
  setPregnancyProfile: (profile: PregnancyProfile | null) => void;
  setReminderEnabled: (type: ReminderType, enabled: boolean) => void;
  setReminderTime: (hour: number, minute: number) => void;
  setPeriodDaysBefore: (days: number) => void;
  resetHealthState: () => void;
};

const HealthStateContext = createContext<HealthStateValue | undefined>(undefined);

const buildCycleId = () =>
  `cycle_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

export function HealthStateProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<TrackingMode>("cycle");
  const [cycleEntries, setCycleEntries] = useState<CycleEntry[]>([]);
  const [symptomsByDate, setSymptomsByDate] = useState<
    Record<string, SymptomEntry>
  >({});
  const [pregnancy, setPregnancy] = useState<PregnancyProfile | null>(null);
  const [reminders, setReminders] =
    useState<ReminderSettings>(createDefaultReminders());
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.HEALTH);
        if (stored) {
          const parsed = JSON.parse(stored) as {
            mode?: TrackingMode;
            cycleEntries?: CycleEntry[];
            symptomsByDate?: Record<string, SymptomEntry>;
            pregnancy?: PregnancyProfile | null;
            reminders?: ReminderSettings;
          };
          const defaultReminders = createDefaultReminders();
          if (parsed.mode) {
            setModeState(parsed.mode);
          }
          if (parsed.cycleEntries) {
            setCycleEntries(parsed.cycleEntries);
          }
          if (parsed.symptomsByDate) {
            setSymptomsByDate(parsed.symptomsByDate);
          }
          if (parsed.pregnancy !== undefined) {
            setPregnancy(parsed.pregnancy ?? null);
          }
          if (parsed.reminders) {
            setReminders({
              ...defaultReminders,
              ...parsed.reminders,
              enabled: {
                ...defaultReminders.enabled,
                ...parsed.reminders.enabled,
              },
              timeOfDay: {
                ...defaultReminders.timeOfDay,
                ...parsed.reminders.timeOfDay,
              },
            });
          }
        }
      } catch (error) {
        setModeState("cycle");
        setCycleEntries([]);
        setSymptomsByDate({});
        setPregnancy(null);
        setReminders(createDefaultReminders());
      } finally {
        setHasLoaded(true);
      }
    };

    loadHealth();
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }
    const persistHealth = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.HEALTH,
          JSON.stringify({
            mode,
            cycleEntries,
            symptomsByDate,
            pregnancy,
            reminders,
          })
        );
      } catch (error) {
        // Ignore persistence errors for local mock state.
      }
    };

    persistHealth();
  }, [cycleEntries, hasLoaded, mode, pregnancy, reminders, symptomsByDate]);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }
    scheduleAllReminders({
      mode,
      cycleEntries,
      pregnancy,
      reminders,
    });
  }, [cycleEntries, hasLoaded, mode, pregnancy, reminders]);

  const setMode = useCallback((nextMode: TrackingMode) => {
    setModeState(nextMode);
  }, []);

  const addCycleEntry = useCallback((startDate: string, endDate?: string) => {
    const entry: CycleEntry = {
      id: buildCycleId(),
      startDate,
      endDate,
    };
    setCycleEntries((prev) => [entry, ...prev]);
  }, []);

  const updateSymptom = useCallback(
    (date: string, partial: Partial<SymptomEntry>) => {
      setSymptomsByDate((prev) => ({
        ...prev,
        [date]: {
          date,
          ...prev[date],
          ...partial,
        },
      }));
    },
    []
  );

  const setPregnancyProfile = useCallback(
    (profile: PregnancyProfile | null) => {
      setPregnancy(profile);
    },
    []
  );

  const setReminderEnabled = useCallback(
    (type: ReminderType, enabled: boolean) => {
      setReminders((prev) => ({
        ...prev,
        enabled: {
          ...prev.enabled,
          [type]: enabled,
        },
      }));
    },
    []
  );

  const setReminderTime = useCallback((hour: number, minute: number) => {
    setReminders((prev) => ({
      ...prev,
      timeOfDay: { hour, minute },
    }));
  }, []);

  const setPeriodDaysBefore = useCallback((days: number) => {
    setReminders((prev) => ({
      ...prev,
      periodDaysBefore: days,
    }));
  }, []);

  const resetHealthState = useCallback(() => {
    setModeState("cycle");
    setCycleEntries([]);
    setSymptomsByDate({});
    setPregnancy(null);
    setReminders(createDefaultReminders());
  }, []);

  const value = useMemo(
    () => ({
      mode,
      cycleEntries,
      symptomsByDate,
      pregnancy,
      reminders,
      setMode,
      addCycleEntry,
      updateSymptom,
      setPregnancyProfile,
      setReminderEnabled,
      setReminderTime,
      setPeriodDaysBefore,
      resetHealthState,
    }),
    [
      addCycleEntry,
      cycleEntries,
      mode,
      pregnancy,
      reminders,
      resetHealthState,
      setMode,
      setPregnancyProfile,
      setPeriodDaysBefore,
      setReminderEnabled,
      setReminderTime,
      symptomsByDate,
      updateSymptom,
    ]
  );

  return (
    <HealthStateContext.Provider value={value}>
      {children}
    </HealthStateContext.Provider>
  );
}

export function useHealthState() {
  const context = useContext(HealthStateContext);
  if (!context) {
    throw new Error("useHealthState must be used within a HealthStateProvider");
  }
  return context;
}
