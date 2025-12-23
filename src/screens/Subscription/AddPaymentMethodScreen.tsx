import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { TextField } from "../../components/TextField";

export function AddPaymentMethodScreen() {
  return (
    <ScreenLayout title="Payment Method">
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Add a card</Text>
        <Text style={styles.sectionSubtitle}>
          Your card will be charged after confirmation.
        </Text>
        <TextField label="Card number" placeholder="1234 5678 9012 3456" />
        <View style={styles.row}>
          <View style={styles.half}>
            <TextField label="Expiry" placeholder="MM/YY" />
          </View>
          <View style={styles.half}>
            <TextField label="CVV" placeholder="•••" />
          </View>
        </View>
        <TextField label="Cardholder name" placeholder="Jane Doe" />
        <PrimaryButton label="Continue" />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  sectionSubtitle: {
    marginTop: 6,
    fontSize: 12,
    color: "#8B8F99",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  half: {
    flex: 1,
  },
});
