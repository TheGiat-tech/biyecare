import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface TextFieldProps {
  label: string;
  placeholder: string;
}

export function TextField({ label, placeholder }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#B0B3BC"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#7A7D87",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E3E8",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333333",
  },
});
