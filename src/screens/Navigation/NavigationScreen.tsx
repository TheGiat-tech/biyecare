import React from "react";
import { Alert, Linking, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export function NavigationScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Navigation">>();
  const { machine } = route.params;

  const openNavigation = async (provider: "waze" | "google") => {
    const destination = `${machine.lat},${machine.lng}`;
    const wazeAppUrl = `waze://?ll=${destination}&navigate=yes`;
    const wazeWebUrl = `https://waze.com/ul?ll=${destination}&navigate=yes`;
    const googleAppUrl = `comgooglemaps://?daddr=${destination}&directionsmode=driving`;
    const googleWebUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

    const appUrl = provider === "waze" ? wazeAppUrl : googleAppUrl;
    const webUrl = provider === "waze" ? wazeWebUrl : googleWebUrl;

    try {
      const supported = await Linking.canOpenURL(appUrl);
      const targetUrl = supported ? appUrl : webUrl;

      // TODO: Confirm deep link formats once navigation provider specs are finalized.
      await Linking.openURL(targetUrl);
    } catch (error) {
      Alert.alert("Navigation unavailable", "Please try again later.");
    }
  };

  return (
    <ScreenLayout title="Navigation">
      <View style={styles.mapArea}>
        <Text style={styles.mapLabel}>Route preview</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Machine #{machine.id}</Text>
        <Text style={styles.subtitle}>{machine.address}</Text>
        <View style={styles.row}>
          <PrimaryButton
            label="Waze"
            variant="ghost"
            onPress={() => openNavigation("waze")}
          />
          <PrimaryButton
            label="Google Maps"
            variant="ghost"
            onPress={() => openNavigation("google")}
          />
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  mapArea: {
    height: 260,
    borderRadius: 24,
    backgroundColor: "#E9EBF1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  mapLabel: {
    fontSize: 12,
    color: "#8B8F99",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#8B8F99",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});
