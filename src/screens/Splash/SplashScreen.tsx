import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenLayout } from "../../components/ScreenLayout";

export function SplashScreen() {
  return (
    <ScreenLayout variant="dark">
      <View style={styles.container}>
        <View style={styles.logo}>
          <View style={styles.logoInner} />
        </View>
        <Text style={styles.brandText}>AppName</Text>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F05A78",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logoInner: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#2F3239",
  },
  brandText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#F05A78",
  },
});
