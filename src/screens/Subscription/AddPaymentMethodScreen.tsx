import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { TextField } from "../../components/TextField";
import { mockPayment } from "../../services/mockPayment";
import { useAppState } from "../../state/AppState";

export function AddPaymentMethodScreen() {
  const navigation = useNavigation();
  const { setSubscribed } = useAppState();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholder, setCardholder] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const normalizedCard = cardNumber.replace(/\s+/g, "");
    if (!cardholder || !expiry || !cvv || normalizedCard.length < 12) {
      setErrorMessage("Please complete all fields with valid card details.");
      return;
    }
    if (cvv.length < 3) {
      setErrorMessage("Please enter a valid CVV.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    const result = await mockPayment();
    setIsSubmitting(false);

    if (result.success) {
      await setSubscribed(true);
      navigation.reset({
        index: 0,
        routes: [{ name: "PurchaseCompletedSuccess" as never }],
      });
      return;
    }

    setErrorMessage(result.message ?? "Payment failed. Please try again.");
  };

  return (
    <ScreenLayout title="Payment Method">
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Add a card</Text>
        <Text style={styles.sectionSubtitle}>
          Your card will be charged after confirmation.
        </Text>
        <TextField
          label="Card number"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="number-pad"
        />
        <View style={styles.row}>
          <View style={styles.half}>
            <TextField
              label="Expiry"
              placeholder="MM/YY"
              value={expiry}
              onChangeText={setExpiry}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.half}>
            <TextField
              label="CVV"
              placeholder="•••"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="number-pad"
              secureTextEntry
            />
          </View>
        </View>
        <TextField
          label="Cardholder name"
          placeholder="Jane Doe"
          value={cardholder}
          onChangeText={setCardholder}
          autoCapitalize="words"
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <PrimaryButton
          label={isSubmitting ? "Processing..." : "Continue"}
          onPress={handleSubmit}
        />
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
  errorText: {
    color: "#E5484D",
    fontSize: 12,
    marginBottom: 12,
  },
});
