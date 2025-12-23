import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { ScreenLayout } from "../../components/ScreenLayout";
import { pregnancyWeeks } from "../../data/pregnancyWeeks";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export function WeekDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "WeekDetails">>();
  const { week } = route.params;

  const weekInfo = useMemo(
    () => pregnancyWeeks.find((entry) => entry.week === week) ?? null,
    [week]
  );

  return (
    <ScreenLayout title={`Week ${week}`}>
      <View style={styles.card}>
        {weekInfo ? (
          <>
            <Text style={styles.title}>Week {weekInfo.week}</Text>
            <Text style={styles.sizeText}>
              Baby is about the size of a {weekInfo.sizeLabel}.
            </Text>
            <Text style={styles.summary}>{weekInfo.summary}</Text>
            <Text style={styles.sectionTitle}>Development highlights</Text>
            {weekInfo.highlights.map((item) => (
              <View key={item} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.summary}>
            Week details will be available soon.
          </Text>
        )}
      </View>
      <Text style={styles.disclaimer}>For informational tracking only.</Text>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  sizeText: {
    fontSize: 14,
    color: "#4A4D57",
  },
  summary: {
    fontSize: 13,
    color: "#4A4D57",
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    fontSize: 14,
    color: "#F05A78",
    marginRight: 6,
    lineHeight: 18,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: "#4A4D57",
    lineHeight: 18,
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 11,
    color: "#8B8F99",
    marginTop: 12,
  },
});
