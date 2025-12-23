import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { SectionCard } from "../../components/SectionCard";

export function PurchaseDetailsScreen() {
  return (
    <ScreenLayout title="Purchase Details">
      <SectionCard>
        <Text style={styles.title}>Machine 3344</Text>
        <Text style={styles.subtitle}>Product: Compact kit</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>$3.99</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Service fee</Text>
          <Text style={styles.value}>$0.00</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>$3.99</Text>
        </View>
        <PrimaryButton label="Confirm Purchase" />
      </SectionCard>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  subtitle: {
    fontSize: 12,
    color: "#8B8F99",
    marginTop: 4,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "#8B8F99",
  },
  value: {
    fontSize: 12,
    color: "#111111",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E3E8",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F05A78",
  },
});
