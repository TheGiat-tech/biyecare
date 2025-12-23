import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";

export function PurchaseCompletedSuccessScreen() {
  return (
    <ScreenLayout title="Success">
      <View style={styles.card}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>✓</Text>
        </View>
        <Text style={styles.title}>Purchase completed successfully</Text>
        <Text style={styles.subtitle}>
          Thank you! Your subscription and product are ready.
        </Text>
        <PrimaryButton label="Go to Home" />
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
