import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { SectionCard } from "../../components/SectionCard";

export function MapScreen() {
  return (
    <ScreenLayout title="Nearby Machines">
      <View style={styles.mapArea}>
        <View style={styles.mapPin} />
        <View style={[styles.mapPin, styles.mapPinSecondary]} />
      </View>
      <SectionCard>
        <Text style={styles.sheetTitle}>Machine 3344</Text>
        <Text style={styles.sheetSubtitle}>1.2 km • Open now</Text>
        <View style={styles.row}>
          <Text style={styles.detailLabel}>Stock</Text>
          <Text style={styles.detailValue}>Available</Text>
        </View>
        <PrimaryButton label="Start Navigation" />
      </SectionCard>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  mapArea: {
    height: 260,
    borderRadius: 24,
    backgroundColor: "#E9EBF1",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  mapPin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#F05A78",
    marginBottom: 8,
  },
  mapPinSecondary: {
    backgroundColor: "#FFB6C6",
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  sheetSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#8B8F99",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: "#8B8F99",
  },
  detailValue: {
    fontSize: 12,
    color: "#111111",
  },
});
