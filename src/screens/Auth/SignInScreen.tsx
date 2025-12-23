import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { TextField } from "../../components/TextField";

export function SignInScreen() {
  return (
    <ScreenLayout title="Sign In">
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Welcome back</Text>
        <Text style={styles.sectionSubtitle}>
          Sign in to continue your BiYé care journey.
        </Text>
        <View style={styles.socialRow}>
          <PrimaryButton label="Apple" variant="ghost" />
          <PrimaryButton label="Google" variant="ghost" />
        </View>
        <Text style={styles.orText}>or sign in with email</Text>
        <TextField label="Email" placeholder="name@email.com" />
        <TextField label="Password" placeholder="••••••••" />
        <Text style={styles.forgot}>Forgot password?</Text>
        <PrimaryButton label="Sign In" />
      </View>
      <Text style={styles.footerText}>Don't have an account? Sign up</Text>
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
  },
  socialRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  orText: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 12,
    color: "#8B8F99",
    textAlign: "center",
  },
  forgot: {
    marginTop: 4,
    fontSize: 12,
    color: "#F05A78",
    textAlign: "right",
  },
  footerText: {
    marginTop: 16,
    fontSize: 12,
    color: "#8B8F99",
    textAlign: "center",
  },
});
