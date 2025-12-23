import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";

export function PurchaseCompletedScreen() {
  return (
    <ScreenLayout title="Purchase Completed">
      <View style={styles.card}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>✓</Text>
        </View>
        <Text style={styles.title}>Payment confirmed</Text>
        <Text style={styles.subtitle}>
          Your product is ready. Scan the QR code to receive it.
        </Text>
        <PrimaryButton label="Scan QR" />
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
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F05A78",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 12,
    color: "#8B8F99",
    textAlign: "center",
    marginBottom: 16,
  },
});
