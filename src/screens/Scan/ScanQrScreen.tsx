import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";

export function ScanQrScreen() {
  return (
    <ScreenLayout title="Scan">
      <View style={styles.scanner}>
        <View style={styles.corner} />
        <View style={[styles.corner, styles.cornerTopRight]} />
        <View style={[styles.corner, styles.cornerBottomLeft]} />
        <View style={[styles.corner, styles.cornerBottomRight]} />
        <Text style={styles.scanLabel}>Align QR inside the frame</Text>
      </View>
      <Text style={styles.helper}>Scan the QR code on the machine.</Text>
      <PrimaryButton label="Scan" />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scanner: {
    height: 280,
    borderRadius: 24,
    backgroundColor: "#F1F2F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
  },
  scanLabel: {
    fontSize: 12,
    color: "#8B8F99",
    marginTop: 16,
  },
  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: "#F05A78",
    top: 24,
    left: 24,
  },
  cornerTopRight: {
    left: undefined,
    right: 24,
    borderLeftWidth: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBottomLeft: {
    top: undefined,
    bottom: 24,
    borderTopWidth: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
  cornerBottomRight: {
    top: undefined,
    bottom: 24,
    left: undefined,
    right: 24,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  helper: {
    fontSize: 12,
    color: "#8B8F99",
    textAlign: "center",
    marginBottom: 12,
  },
});
