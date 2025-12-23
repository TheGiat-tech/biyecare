import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { packs } from "../../data/packs";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { SectionCard } from "../../components/SectionCard";
import { useOrdersState } from "../../state/OrdersState";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export function CheckoutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Checkout">>();
  const { createOrder } = useOrdersState();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const pack = useMemo(
    () => packs.find((item) => item.id === route.params.packId),
    [route.params.packId]
  );

  const handleConfirm = () => {
    const isSuccess = Math.random() < 0.9;
    if (!pack) {
      setErrorMessage("Pack not found. Please try again.");
      return;
    }
    if (!isSuccess) {
      setErrorMessage("Checkout failed. Please try again.");
      return;
    }

    const order = createOrder(pack.id);
    navigation.replace("OrderQr", { orderId: order.id });
  };

  return (
    <ScreenLayout title="Checkout" subtitle="Pickup only at vending machines.">
      <SectionCard>
        <Text style={styles.sectionTitle}>Your pack</Text>
        {pack ? (
          <View style={styles.packSummary}>
            <View style={styles.packRow}>
              <Text style={styles.packName}>{pack.name}</Text>
              <Text style={styles.packPrice}>${pack.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.packDescription}>{pack.description}</Text>
          </View>
        ) : (
          <Text style={styles.packDescription}>Pack not found.</Text>
        )}
        <View style={styles.noticeBox}>
          <Text style={styles.noticeTitle}>Pickup instructions</Text>
          <Text style={styles.noticeBody}>
            After checkout, you will receive a QR token to scan at a machine for
            pickup.
          </Text>
        </View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <PrimaryButton label="Confirm purchase" onPress={handleConfirm} />
      </SectionCard>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 12,
  },
  packSummary: {
    marginBottom: 16,
  },
  packRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  packName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
  },
  packPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F05A78",
  },
  packDescription: {
    marginTop: 6,
    fontSize: 12,
    color: "#8B8F99",
  },
  noticeBox: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E3E8",
    padding: 12,
    marginBottom: 16,
  },
  noticeTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111111",
  },
  noticeBody: {
    marginTop: 6,
    fontSize: 11,
    color: "#8B8F99",
  },
  errorText: {
    fontSize: 11,
    color: "#D6455D",
    marginBottom: 12,
  },
});
