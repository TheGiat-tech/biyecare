import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { TextField } from "../../components/TextField";
import { useOrdersState } from "../../state/OrdersState";
import { parseOrderToken } from "../../utils/qr";

export function ScanQrScreen() {
  const navigation = useNavigation();
  const { orders, markRedeemed, refreshExpiredOrders } = useOrdersState();
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");

  const handleRedeem = () => {
    refreshExpiredOrders();
    const parsed = parseOrderToken(payload);
    if (!parsed) {
      setError("Order not found");
      return;
    }
    const order = orders.find((item) => item.id === parsed.orderId);
    if (!order) {
      setError("Order not found");
      return;
    }
    const now = Date.now();
    if (order.status === "redeemed") {
      setError("Already redeemed");
      return;
    }
    if (
      order.status === "expired" ||
      (order.status === "pending" &&
        new Date(order.expiresAt).getTime() <= now)
    ) {
      setError("Expired");
      return;
    }
    markRedeemed(order.id);
    setError("");
    navigation.navigate("RedeemSuccess" as never, { orderId: order.id } as never);
  };

  // TODO: Integrate device camera + QR scanning when backend is available.
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
      <TextField
        label="Paste QR payload"
        placeholder="BIYE:ORDER:..."
        value={payload}
        onChangeText={(value) => {
          setPayload(value);
          if (error) {
            setError("");
          }
        }}
        autoCapitalize="none"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton label="Redeem" onPress={handleRedeem} />
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
  error: {
    fontSize: 12,
    color: "#D6455D",
    marginBottom: 12,
  },
});
