import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";

export function UntitledScreen() {
  const navigation = useNavigation();

  return (
    <ScreenLayout title="Notification">
      <View style={styles.card}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>✓</Text>
        </View>
        <Text style={styles.title}>Machine ready</Text>
        <Text style={styles.subtitle}>Your product is ready to collect.</Text>
        <PrimaryButton
          label="Go to App"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Main" as never }],
            })
          }
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
