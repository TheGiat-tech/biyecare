import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { TextField } from "../../components/TextField";
import type { PregnancyProfile, TrackingMode } from "../../models/types";
import { useHealthState } from "../../state/HealthState";
import {
  addDays,
  calcNextPeriodDate,
  calcPregnancyWeek,
  toISODate,
} from "../../utils/dates";

const FLOW_OPTIONS: Array<"light" | "medium" | "heavy"> = [
  "light",
  "medium",
  "heavy",
];

export function CycleTrackingScreen() {
  const {
    mode,
    setMode,
    cycleEntries,
    symptomsByDate,
    pregnancy,
    addCycleEntry,
    updateSymptom,
    setPregnancyProfile,
  } = useHealthState();

  const [showPeriodForm, setShowPeriodForm] = useState(false);
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");

  const todayIso = useMemo(() => toISODate(new Date()), []);
  const [selectedDateIso, setSelectedDateIso] = useState(todayIso);
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());

  const [showSymptomsForm, setShowSymptomsForm] = useState(false);
  const [symptomMood, setSymptomMood] = useState("");
  const [symptomPain, setSymptomPain] = useState("");
  const [symptomFlow, setSymptomFlow] = useState<"light" | "medium" | "heavy" | "">("");
  const [symptomNotes, setSymptomNotes] = useState("");

  const [showPregnancyForm, setShowPregnancyForm] = useState(false);
  const [pregnancyMethod, setPregnancyMethod] = useState<"lmp" | "dueDate">(
    "lmp"
  );
  const [pregnancyDate, setPregnancyDate] = useState("");

  const latestCycle = useMemo(() => {
    if (!cycleEntries.length) {
      return null;
    }
    return [...cycleEntries].sort(
      (left, right) =>
        new Date(right.startDate).getTime() - new Date(left.startDate).getTime()
    )[0];
  }, [cycleEntries]);

  const predictedNextPeriod = useMemo(
    () => calcNextPeriodDate(cycleEntries),
    [cycleEntries]
  );

  const fertileWindow = useMemo(() => {
    if (!latestCycle) {
      return null;
    }
    const start = addDays(new Date(latestCycle.startDate), 11);
    const end = addDays(new Date(latestCycle.startDate), 17);
    return { start, end };
  }, [latestCycle]);

  const pregnancySummary = useMemo(() => {
    if (!pregnancy) {
      return null;
    }
    return calcPregnancyWeek(pregnancy);
  }, [pregnancy]);

  const selectedPregnancySummary = useMemo(() => {
    if (!pregnancy) {
      return null;
    }
    return calcPregnancyWeek(pregnancy, new Date(selectedDateIso));
  }, [pregnancy, selectedDateIso]);

  const predictedNextPeriodIso = useMemo(
    () => toISODate(predictedNextPeriod),
    [predictedNextPeriod]
  );

  const periodDates = useMemo(() => {
    const dates = new Set<string>();
    cycleEntries.forEach((entry) => {
      const start = new Date(entry.startDate);
      const end = entry.endDate ? new Date(entry.endDate) : start;
      if (end.getTime() < start.getTime()) {
        dates.add(toISODate(start));
        return;
      }
      let cursor = new Date(start);
      while (cursor.getTime() <= end.getTime()) {
        dates.add(toISODate(cursor));
        cursor = addDays(cursor, 1);
      }
    });
    return dates;
  }, [cycleEntries]);

  const currentMonthStart = useMemo(
    () => new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1),
    [currentMonthDate]
  );

  const calendarWeeks = useMemo(() => {
    const weeks: Array<
      Array<{ date: Date; iso: string; inMonth: boolean } | null>
    > = [];
    const year = currentMonthStart.getFullYear();
    const month = currentMonthStart.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingBlanks = currentMonthStart.getDay();
    let currentWeek: Array<
      { date: Date; iso: string; inMonth: boolean } | null
    > = [];

    for (let index = 0; index < leadingBlanks; index += 1) {
      currentWeek.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      currentWeek.push({ date, iso: toISODate(date), inMonth: true });
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }, [currentMonthStart]);

  useEffect(() => {
    if (!showSymptomsForm) {
      return;
    }
    const existing = symptomsByDate[selectedDateIso];
    setSymptomMood(existing?.mood ?? "");
    setSymptomPain(
      existing?.painLevel !== undefined ? existing.painLevel.toString() : ""
    );
    setSymptomFlow(existing?.flow ?? "");
    setSymptomNotes(existing?.notes ?? "");
  }, [selectedDateIso, showSymptomsForm, symptomsByDate]);

  useEffect(() => {
    if (!showPregnancyForm) {
      return;
    }
    if (pregnancy) {
      setPregnancyMethod(pregnancy.method);
      setPregnancyDate(
        pregnancy.method === "lmp"
          ? pregnancy.lmpDate ?? ""
          : pregnancy.dueDate ?? ""
      );
      return;
    }
    setPregnancyMethod("lmp");
    setPregnancyDate("");
  }, [pregnancy, showPregnancyForm]);

  const handleAddPeriod = () => {
    if (!periodStart.trim()) {
      return;
    }
    addCycleEntry(periodStart.trim(), periodEnd.trim() || undefined);
    setPeriodStart("");
    setPeriodEnd("");
    setShowPeriodForm(false);
  };

  const handleSaveSymptoms = () => {
    const painValue = symptomPain.trim() === "" ? undefined : Number(symptomPain);
    updateSymptom(selectedDateIso, {
      mood: symptomMood.trim() || undefined,
      painLevel: Number.isNaN(painValue) ? undefined : painValue,
      flow: symptomFlow || undefined,
      notes: symptomNotes.trim() || undefined,
    });
    setShowSymptomsForm(false);
  };

  const handleSavePregnancy = () => {
    if (!pregnancyDate.trim()) {
      return;
    }
    const nextProfile: PregnancyProfile =
      pregnancyMethod === "lmp"
        ? { method: "lmp", lmpDate: pregnancyDate.trim() }
        : { method: "dueDate", dueDate: pregnancyDate.trim() };
    setPregnancyProfile(nextProfile);
    setShowPregnancyForm(false);
  };

  const handleSelectDay = (iso: string) => {
    setSelectedDateIso(iso);
  };

  const handleChangeMonth = (direction: "prev" | "next") => {
    const year = currentMonthStart.getFullYear();
    const month = currentMonthStart.getMonth();
    setCurrentMonthDate(
      new Date(year, direction === "prev" ? month - 1 : month + 1, 1)
    );
  };

  const renderModeSwitch = () => (
    <View style={styles.segmentedControl}>
      {(["cycle", "pregnancy"] as TrackingMode[]).map((option) => (
        <Pressable
          key={option}
          onPress={() => setMode(option)}
          style={[
            styles.segmentedButton,
            mode === option && styles.segmentedButtonActive,
          ]}
        >
          <Text
            style={[
              styles.segmentedText,
              mode === option && styles.segmentedTextActive,
            ]}
          >
            {option === "cycle" ? "Cycle" : "Pregnancy"}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const renderSymptomForm = () => (
    <View>
      <Text style={styles.cardTitle}>Log symptoms</Text>
      <Text style={styles.cardCaption}>For {selectedDateIso}</Text>
      <TextField
        label="Mood"
        placeholder="e.g. calm"
        value={symptomMood}
        onChangeText={setSymptomMood}
      />
      <View style={styles.inlineField}>
        <Text style={styles.inlineLabel}>Pain level (0-10)</Text>
        <TextInput
          style={styles.inlineInput}
          keyboardType="number-pad"
          value={symptomPain}
          onChangeText={setSymptomPain}
          placeholder="0"
          placeholderTextColor="#B0B3BC"
        />
      </View>
      <Text style={styles.inlineLabel}>Flow</Text>
      <View style={styles.flowRow}>
        {FLOW_OPTIONS.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.flowChip,
              symptomFlow === option && styles.flowChipActive,
            ]}
            onPress={() => setSymptomFlow(option)}
          >
            <Text
              style={[
                styles.flowChipText,
                symptomFlow === option && styles.flowChipTextActive,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
      <TextField
        label="Notes"
        placeholder="Optional notes"
        value={symptomNotes}
        onChangeText={setSymptomNotes}
      />
      <PrimaryButton label="Save symptoms" onPress={handleSaveSymptoms} />
    </View>
  );

  const renderSelectedDayDetails = () => {
    const symptoms = symptomsByDate[selectedDateIso];

    return (
      <View style={styles.selectedDayPanel}>
        <View style={styles.selectedDayHeader}>
          <Text style={styles.cardTitle}>Selected day</Text>
          <Text style={styles.selectedDayDate}>{selectedDateIso}</Text>
        </View>
        {mode === "pregnancy" && pregnancy && selectedPregnancySummary ? (
          <Text style={styles.cardText}>
            Week {selectedPregnancySummary.weeks} +{" "}
            {selectedPregnancySummary.days}
          </Text>
        ) : null}
        {symptoms ? (
          <View>
            {symptoms.mood ? (
              <Text style={styles.cardText}>Mood: {symptoms.mood}</Text>
            ) : null}
            {symptoms.painLevel !== undefined ? (
              <Text style={styles.cardText}>
                Pain level: {symptoms.painLevel}
              </Text>
            ) : null}
            {symptoms.flow ? (
              <Text style={styles.cardText}>Flow: {symptoms.flow}</Text>
            ) : null}
            {symptoms.notes ? (
              <Text style={styles.cardText}>Notes: {symptoms.notes}</Text>
            ) : null}
          </View>
        ) : (
          <Text style={styles.cardCaption}>No symptoms logged.</Text>
        )}
        <PrimaryButton
          label={symptoms ? "Edit symptoms" : "Log symptoms"}
          onPress={() => setShowSymptomsForm(true)}
        />
      </View>
    );
  };

  const renderCalendarSection = () => (
    <View style={styles.card}>
      <View style={styles.calendarHeader}>
        <Pressable
          style={styles.calendarNavButton}
          onPress={() => handleChangeMonth("prev")}
        >
          <Text style={styles.calendarNavText}>{"‹"}</Text>
        </Pressable>
        <Text style={styles.calendarTitle}>
          {currentMonthStart.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <Pressable
          style={styles.calendarNavButton}
          onPress={() => handleChangeMonth("next")}
        >
          <Text style={styles.calendarNavText}>{"›"}</Text>
        </Pressable>
      </View>
      <View style={styles.calendarGrid}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
          <Text key={label} style={styles.calendarDayLabel}>
            {label}
          </Text>
        ))}
        {calendarWeeks.flat().map((day, index) => {
          if (!day) {
            return <View key={`blank-${index}`} style={styles.calendarCell} />;
          }
          const isSelected = day.iso === selectedDateIso;
          const isPeriod = periodDates.has(day.iso);
          const isPredicted = day.iso === predictedNextPeriodIso;

          return (
            <Pressable
              key={day.iso}
              onPress={() => handleSelectDay(day.iso)}
              style={[
                styles.calendarCell,
                isSelected && styles.calendarCellSelected,
                isPeriod && styles.calendarCellPeriod,
              ]}
            >
              <Text
                style={[
                  styles.calendarCellText,
                  isSelected && styles.calendarCellTextSelected,
                ]}
              >
                {day.date.getDate()}
              </Text>
              {isPredicted ? <View style={styles.predictedDot} /> : null}
            </Pressable>
          );
        })}
      </View>
      {showSymptomsForm ? renderSymptomForm() : renderSelectedDayDetails()}
    </View>
  );

  const renderCycleMode = () => (
    <View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current cycle</Text>
        <Text style={styles.cardText}>
          Last period: {latestCycle ? latestCycle.startDate : "Not logged"}
          {latestCycle?.endDate ? ` → ${latestCycle.endDate}` : ""}
        </Text>
        <Text style={styles.cardText}>
          Predicted next period: {toISODate(predictedNextPeriod)}
        </Text>
        {fertileWindow ? (
          <Text style={styles.cardCaption}>
            Estimated fertile window: {toISODate(fertileWindow.start)} -{" "}
            {toISODate(fertileWindow.end)} (estimate)
          </Text>
        ) : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add a period</Text>
        {showPeriodForm ? (
          <View>
            <TextField
              label="Start date"
              placeholder="YYYY-MM-DD"
              value={periodStart}
              onChangeText={setPeriodStart}
            />
            <TextField
              label="End date"
              placeholder="YYYY-MM-DD (optional)"
              value={periodEnd}
              onChangeText={setPeriodEnd}
            />
            <PrimaryButton label="Save period" onPress={handleAddPeriod} />
          </View>
        ) : (
          <PrimaryButton
            label="Add period"
            onPress={() => setShowPeriodForm(true)}
          />
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Symptoms</Text>
        <Text style={styles.cardCaption}>
          Use the calendar above to log or review symptoms for a day.
        </Text>
      </View>
    </View>
  );

  const renderPregnancyForm = () => (
    <View>
      <Text style={styles.cardTitle}>Pregnancy dates</Text>
      <View style={styles.methodToggle}>
        {["lmp", "dueDate"].map((option) => (
          <Pressable
            key={option}
            onPress={() =>
              setPregnancyMethod(option === "lmp" ? "lmp" : "dueDate")
            }
            style={[
              styles.methodButton,
              pregnancyMethod === option && styles.methodButtonActive,
            ]}
          >
            <Text
              style={[
                styles.methodText,
                pregnancyMethod === option && styles.methodTextActive,
              ]}
            >
              {option === "lmp"
                ? "I know my last period (LMP)"
                : "I know my due date"}
            </Text>
          </Pressable>
        ))}
      </View>
      <TextField
        label={pregnancyMethod === "lmp" ? "LMP date" : "Due date"}
        placeholder="YYYY-MM-DD"
        value={pregnancyDate}
        onChangeText={setPregnancyDate}
      />
      <PrimaryButton label="Save pregnancy dates" onPress={handleSavePregnancy} />
    </View>
  );

  const renderPregnancyMode = () => (
    <View>
      {pregnancy && pregnancySummary?.dueDate ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pregnancy overview</Text>
          <Text style={styles.cardText}>
            You are {pregnancySummary.weeks} weeks + {pregnancySummary.days} days
          </Text>
          <Text style={styles.cardText}>
            Estimated due date: {toISODate(pregnancySummary.dueDate)}
          </Text>
        </View>
      ) : null}

      {pregnancy ? (
        <View style={styles.card}>
          {showPregnancyForm ? (
            renderPregnancyForm()
          ) : (
            <PrimaryButton
              label="Edit pregnancy dates"
              onPress={() => setShowPregnancyForm(true)}
            />
          )}
        </View>
      ) : (
        <View style={styles.card}>{renderPregnancyForm()}</View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Symptoms</Text>
        <Text style={styles.cardCaption}>
          Use the calendar above to log or review symptoms for a day.
        </Text>
      </View>
    </View>
  );

  return (
    <ScreenLayout title="Cycle Tracking">
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderModeSwitch()}
        {renderCalendarSection()}
        {mode === "cycle" ? renderCycleMode() : renderPregnancyMode()}
        <Text style={styles.disclaimer}>
          For tracking purposes only. Not medical advice.
        </Text>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  segmentedButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  segmentedButtonActive: {
    backgroundColor: "#F05A78",
  },
  segmentedText: {
    fontSize: 13,
    color: "#8B8F99",
    fontWeight: "600",
  },
  segmentedTextActive: {
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 13,
    color: "#4A4D57",
    marginBottom: 6,
  },
  cardCaption: {
    fontSize: 12,
    color: "#8B8F99",
  },
  selectedDayPanel: {
    marginTop: 16,
  },
  selectedDayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedDayDate: {
    fontSize: 12,
    color: "#7A7D87",
    fontWeight: "600",
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  calendarNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E3E8",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarNavText: {
    fontSize: 18,
    color: "#4A4D57",
    fontWeight: "600",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  calendarDayLabel: {
    width: "14.2857%",
    textAlign: "center",
    fontSize: 11,
    color: "#8B8F99",
    marginBottom: 6,
  },
  calendarCell: {
    width: "14.2857%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 6,
  },
  calendarCellSelected: {
    backgroundColor: "#FDE7EC",
  },
  calendarCellPeriod: {
    borderWidth: 1,
    borderColor: "#F05A78",
  },
  calendarCellText: {
    fontSize: 13,
    color: "#333333",
    fontWeight: "600",
  },
  calendarCellTextSelected: {
    color: "#F05A78",
  },
  predictedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F05A78",
    marginTop: 2,
  },
  inlineField: {
    marginBottom: 16,
  },
  inlineLabel: {
    fontSize: 12,
    color: "#7A7D87",
    marginBottom: 6,
  },
  inlineInput: {
    borderWidth: 1,
    borderColor: "#E2E3E8",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333333",
  },
  flowRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  flowChip: {
    flex: 1,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E3E8",
    alignItems: "center",
  },
  flowChipActive: {
    backgroundColor: "#FDE7EC",
    borderColor: "#F05A78",
  },
  flowChipText: {
    fontSize: 12,
    color: "#7A7D87",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  flowChipTextActive: {
    color: "#F05A78",
  },
  methodToggle: {
    marginBottom: 16,
  },
  methodButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E3E8",
    borderRadius: 12,
    marginBottom: 10,
  },
  methodButtonActive: {
    borderColor: "#F05A78",
    backgroundColor: "#FDE7EC",
  },
  methodText: {
    fontSize: 13,
    color: "#4A4D57",
    fontWeight: "600",
  },
  methodTextActive: {
    color: "#F05A78",
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 11,
    color: "#8B8F99",
    marginTop: 8,
    marginBottom: 24,
  },
});
