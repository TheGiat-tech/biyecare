import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";

const days = Array.from({ length: 30 }, (_, index) => index + 1);

export function CycleTrackingScreen() {
  return (
    <ScreenLayout title="Cycle Tracking">
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Current cycle</Text>
        <Text style={styles.summarySubtitle}>Next period in 6 days</Text>
      </View>
      <View style={styles.calendar}>
        <Text style={styles.month}>May 2025</Text>
        <View style={styles.grid}>
          {days.map((day) => (
            <View
              key={day}
              style={[styles.day, day >= 12 && day <= 16 && styles.dayActive]}
            >
              <Text
                style={[styles.dayText, day >= 12 && day <= 16 && styles.dayTextActive]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <PrimaryButton label="Log symptoms" />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  summarySubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#8B8F99",
  },
  calendar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
  },
  month: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  day: {
    width: "14.2%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  dayText: {
    fontSize: 11,
    color: "#8B8F99",
  },
  dayActive: {
    backgroundColor: "#FDE7EC",
    borderRadius: 16,
  },
  dayTextActive: {
    color: "#F05A78",
    fontWeight: "600",
  },
});
