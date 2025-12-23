import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export function RedeemSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "RedeemSuccess">>();
  const orderId = route.params?.orderId;

  return (
    <ScreenLayout title="Redeemed">
      <View style={styles.card}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>✓</Text>
        </View>
        <Text style={styles.title}>Redeemed successfully</Text>
        {orderId ? (
          <Text style={styles.subtitle}>Order ID: {orderId}</Text>
        ) : (
          <Text style={styles.subtitle}>Your pack is ready.</Text>
        )}
        <PrimaryButton
          label="Back to Map"
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "Main" as never }] })
          }
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F05A78",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 12,
    color: "#8B8F99",
    textAlign: "center",
    marginBottom: 16,
  },
});
