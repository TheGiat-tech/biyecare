import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { TextField } from "../../components/TextField";

export function SignUpScreen() {
  return (
    <ScreenLayout title="Create Account">
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Join BiYé</Text>
        <Text style={styles.sectionSubtitle}>
          Create your account to start your subscription.
        </Text>
        <TextField label="Full name" placeholder="Jane Doe" />
        <TextField label="Email" placeholder="name@email.com" />
        <TextField label="Password" placeholder="••••••••" />
        <PrimaryButton label="Create Account" />
      </View>
      <Text style={styles.footerText}>Already have an account? Sign in</Text>
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
    marginTop: 4,
    fontSize: 12,
    color: "#8B8F99",
    marginBottom: 12,
  },
  footerText: {
    marginTop: 16,
    fontSize: 12,
    color: "#8B8F99",
    textAlign: "center",
  },
});
