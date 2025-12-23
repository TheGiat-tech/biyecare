import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "ghost";
}

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={[styles.button, variant === "ghost" && styles.ghostButton]}
      onPress={onPress}
    >
      <Text style={[styles.label, variant === "ghost" && styles.ghostLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F05A78",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  ghostButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F05A78",
  },
  label: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  ghostLabel: {
    color: "#F05A78",
  },
});
