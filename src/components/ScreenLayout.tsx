import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

interface ScreenLayoutProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: "light" | "dark";
}

export function ScreenLayout({
  title,
  subtitle,
  children,
  variant = "light",
}: ScreenLayoutProps) {
  return (
    <SafeAreaView
      style={[styles.safeArea, variant === "dark" && styles.safeAreaDark]}
    >
      <View style={styles.container}>
        {title ? (
          <Text style={[styles.title, variant === "dark" && styles.titleDark]}>
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text
            style={[styles.subtitle, variant === "dark" && styles.subtitleDark]}
          >
            {subtitle}
          </Text>
        ) : null}
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F6F8",
  },
  safeAreaDark: {
    backgroundColor: "#2F3239",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111111",
  },
  titleDark: {
    color: "#FFFFFF",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#666666",
  },
  subtitleDark: {
    color: "#D7D9DF",
  },
  content: {
    flex: 1,
    marginTop: 24,
  },
});
