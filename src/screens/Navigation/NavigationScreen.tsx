import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";

export function NavigationScreen() {
  return (
    <ScreenLayout title="Navigation">
      <View style={styles.mapArea}>
        <Text style={styles.mapLabel}>Route preview</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Machine 3344</Text>
        <Text style={styles.subtitle}>123 Main Street, City</Text>
        <View style={styles.row}>
          <PrimaryButton label="Waze" variant="ghost" />
          <PrimaryButton label="Google Maps" variant="ghost" />
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  mapArea: {
    height: 260,
    borderRadius: 24,
    backgroundColor: "#E9EBF1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  mapLabel: {
    fontSize: 12,
    color: "#8B8F99",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#8B8F99",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});
