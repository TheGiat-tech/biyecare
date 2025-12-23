import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { TextField } from "../../components/TextField";
import { useAppState } from "../../state/AppState";

export function SignUpScreen() {
  const navigation = useNavigation();
  const { signIn } = useAppState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    signIn({ name, email });
    navigation.reset({
      index: 0,
      routes: [{ name: "SubscriptionPlans" as never }],
    });
  };

  return (
    <ScreenLayout title="Create Account">
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Join BiYé</Text>
        <Text style={styles.sectionSubtitle}>
          Create your account to start your subscription.
        </Text>
        <TextField
          label="Full name"
          placeholder="Jane Doe"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
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
        <PrimaryButton label="Create Account" onPress={handleSignUp} />
      </View>
      <Pressable onPress={() => navigation.navigate("SignIn" as never)}>
        <Text style={styles.footerText}>Already have an account? Sign in</Text>
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
    marginBottom: 12,
  },
  footerText: {
    marginTop: 16,
    fontSize: 12,
    color: "#8B8F99",
    textAlign: "center",
  },
});
