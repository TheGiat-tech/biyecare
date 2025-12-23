import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function ScreenLayout({ title, subtitle, children }: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#666666",
  },
  content: {
    flex: 1,
    marginTop: 24,
  },
});
