import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface InsightCardProps {
  title: string;
  children: React.ReactNode;
}

export function InsightCard({ title, children }: InsightCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EDEEF2",
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    color: "#111111",
    fontWeight: "600",
    marginBottom: 6,
  },
});
