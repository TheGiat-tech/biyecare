import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";

export function PurchaseDetailsAltOneScreen() {
  return (
    <ScreenLayout title="Purchase Details">
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Processing</Text>
        </View>
        <Text style={styles.title}>Your purchase is in progress</Text>
        <Text style={styles.subtitle}>
          Please wait while we confirm your payment.
        </Text>
        <PrimaryButton label="Back to Purchase" variant="ghost" />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#FDE7EC",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  badgeText: {
    color: "#F05A78",
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 12,
    color: "#8B8F99",
    textAlign: "center",
    marginBottom: 16,
  },
});
