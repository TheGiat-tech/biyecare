import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { ScreenLayout } from "../../components/ScreenLayout";
import { SectionCard } from "../../components/SectionCard";
import { useOrdersState } from "../../state/OrdersState";
import { packs } from "../../data/packs";
import type { RootStackParamList } from "../../navigation/AppNavigator";

const formatTime = (ms: number) => {
  if (ms <= 0) {
    return "Expired";
  }
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function OrderQrScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "OrderQr">>();
  const { orders, refreshExpiredOrders } = useOrdersState();
  const [now, setNow] = useState(Date.now());

  const order = useMemo(
    () => orders.find((item) => item.id === route.params.orderId),
    [orders, route.params.orderId]
  );

  const pack = useMemo(
    () => packs.find((item) => item.id === order?.packId),
    [order?.packId]
  );

  useEffect(() => {
    refreshExpiredOrders();
    const interval = setInterval(() => {
      setNow(Date.now());
      refreshExpiredOrders();
    }, 1000);
    return () => clearInterval(interval);
  }, [refreshExpiredOrders]);

  const remainingMs = order
    ? new Date(order.expiresAt).getTime() - now
    : 0;

  return (
    <ScreenLayout title="QR Token" subtitle="Scan at a machine to redeem.">
      <SectionCard>
        {order ? (
          <View style={styles.content}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.statusValue}>{order.status.toUpperCase()}</Text>
            <Text style={styles.countdownLabel}>Expires in</Text>
            <Text style={styles.countdownValue}>{formatTime(remainingMs)}</Text>
            {pack ? (
              <Text style={styles.packText}>Pack: {pack.name}</Text>
            ) : null}
            <View style={styles.qrBox}>
              <Text style={styles.qrTitle}>QR Payload</Text>
              <Text style={styles.qrPayload}>{order.qrPayload}</Text>
              <Text style={styles.qrNote}>TODO: Render as QR later.</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.errorText}>Order not found.</Text>
        )}
      </SectionCard>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 8,
  },
  statusLabel: {
    fontSize: 12,
    color: "#8B8F99",
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  countdownLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#8B8F99",
  },
  countdownValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F05A78",
  },
  packText: {
    fontSize: 12,
    color: "#111111",
  },
  qrBox: {
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E3E8",
    padding: 12,
  },
  qrTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111111",
  },
  qrPayload: {
    marginTop: 6,
    fontSize: 12,
    color: "#1A1A1A",
  },
  qrNote: {
    marginTop: 8,
    fontSize: 11,
    color: "#8B8F99",
  },
  errorText: {
    fontSize: 12,
    color: "#D6455D",
  },
});
