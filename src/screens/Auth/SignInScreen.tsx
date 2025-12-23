import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { TextField } from "../../components/TextField";
import { useAppState } from "../../state/AppState";

export function SignInScreen() {
  const navigation = useNavigation();
  const { signIn } = useAppState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signIn({ email });
    navigation.reset({
      index: 0,
      routes: [{ name: "SubscriptionPlans" as never }],
    });
  };

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
        <TextField
          label="Email"
          placeholder="name@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Text style={styles.forgot}>Forgot password?</Text>
        <PrimaryButton label="Sign In" onPress={handleSignIn} />
      </View>
      <Pressable onPress={() => navigation.navigate("SignUp" as never)}>
        <Text style={styles.footerText}>Don't have an account? Sign up</Text>
      </Pressable>
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
