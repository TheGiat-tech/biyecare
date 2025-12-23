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
  SymptomEntry,
  TrackingMode,
} from "../models/types";

const HEALTH_KEY = "biyecare.health";

type HealthStateValue = {
  mode: TrackingMode;
  cycleEntries: CycleEntry[];
  symptomsByDate: Record<string, SymptomEntry>;
  pregnancy: PregnancyProfile | null;
  setMode: (mode: TrackingMode) => void;
  addCycleEntry: (startDate: string, endDate?: string) => void;
  updateSymptom: (date: string, partial: Partial<SymptomEntry>) => void;
  setPregnancyProfile: (profile: PregnancyProfile | null) => void;
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
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const stored = await AsyncStorage.getItem(HEALTH_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as {
            mode?: TrackingMode;
            cycleEntries?: CycleEntry[];
            symptomsByDate?: Record<string, SymptomEntry>;
            pregnancy?: PregnancyProfile | null;
          };
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
        }
      } catch (error) {
        setModeState("cycle");
        setCycleEntries([]);
        setSymptomsByDate({});
        setPregnancy(null);
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
          HEALTH_KEY,
          JSON.stringify({
            mode,
            cycleEntries,
            symptomsByDate,
            pregnancy,
          })
        );
      } catch (error) {
        // Ignore persistence errors for local mock state.
      }
    };

    persistHealth();
  }, [cycleEntries, hasLoaded, mode, pregnancy, symptomsByDate]);

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

  const value = useMemo(
    () => ({
      mode,
      cycleEntries,
      symptomsByDate,
      pregnancy,
      setMode,
      addCycleEntry,
      updateSymptom,
      setPregnancyProfile,
    }),
    [
      addCycleEntry,
      cycleEntries,
      mode,
      pregnancy,
      setMode,
      setPregnancyProfile,
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
