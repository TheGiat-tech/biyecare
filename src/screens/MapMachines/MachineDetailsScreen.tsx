import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export function MachineDetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "MachineDetails">>();
  const { machine } = route.params;

  return (
    <ScreenLayout title="Machine Details">
      <View style={styles.mapArea}>
        <Text style={styles.mapLabel}>Machine location preview</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.title}>Machine #{machine.id}</Text>
        {machine.name ? (
          <Text style={styles.subtitle}>{machine.name}</Text>
        ) : null}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address</Text>
          <Text style={styles.detailValue}>{machine.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status</Text>
          <Text style={styles.detailValue}>
            {machine.status === "offline" ? "Offline" : "Available"}
          </Text>
        </View>
        <PrimaryButton
          label="Navigate"
          onPress={() => navigation.navigate("Navigation", { machine })}
        />
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
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  subtitle: {
    marginTop: -4,
    fontSize: 12,
    color: "#8B8F99",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: "#8B8F99",
  },
  detailValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 12,
    color: "#111111",
  },
});
