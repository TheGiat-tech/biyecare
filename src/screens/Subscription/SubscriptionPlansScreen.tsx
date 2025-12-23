import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { SectionCard } from "../../components/SectionCard";

export function SubscriptionPlansScreen() {
  return (
    <ScreenLayout title="Subscription">
      <SectionCard>
        <Text style={styles.planTitle}>Choose your plan</Text>
        <Text style={styles.planSubtitle}>Unlimited access to BiYé care.</Text>
        <View style={styles.planRow}>
          <View style={styles.planColumn}>
            <Text style={styles.planLabel}>Monthly</Text>
            <Text style={styles.planPrice}>$3.99</Text>
            <Text style={styles.planNote}>Billed monthly</Text>
          </View>
          <View style={[styles.planColumn, styles.planHighlight]}>
            <Text style={[styles.planLabel, styles.planHighlightText]}>Annual</Text>
            <Text style={[styles.planPrice, styles.planHighlightText]}>$37.99</Text>
            <Text style={[styles.planNote, styles.planHighlightText]}>Save 20%</Text>
          </View>
        </View>
        <PrimaryButton label="Continue" />
      </SectionCard>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  planTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  planSubtitle: {
    marginTop: 6,
    fontSize: 12,
    color: "#8B8F99",
    marginBottom: 16,
  },
  planRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  planColumn: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E3E8",
    padding: 12,
  },
  planHighlight: {
    backgroundColor: "#F05A78",
    borderColor: "#F05A78",
  },
  planLabel: {
    fontSize: 12,
    color: "#8B8F99",
  },
  planPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111111",
    marginTop: 4,
  },
  planNote: {
    fontSize: 11,
    color: "#8B8F99",
  },
  planHighlightText: {
    color: "#FFFFFF",
  },
});
