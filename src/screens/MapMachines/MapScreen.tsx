import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenLayout } from "../../components/ScreenLayout";
import { SectionCard } from "../../components/SectionCard";
import { machines } from "../../data/machines";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export function MapScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenLayout title="Nearby Machines">
      <View style={styles.mapArea}>
        <Text style={styles.mapLabel}>Map preview</Text>
        <View style={styles.pinList}>
          {machines.map((machine) => (
            <View key={machine.id} style={styles.pinRow}>
              <View
                style={[
                  styles.pinDot,
                  machine.status === "offline" && styles.pinDotOffline,
                ]}
              />
              <Text style={styles.pinText}>#{machine.id}</Text>
            </View>
          ))}
        </View>
      </View>
      <SectionCard>
        <Text style={styles.sheetTitle}>Select a machine</Text>
        <Text style={styles.sheetSubtitle}>Tap a machine pin below</Text>
        <View style={styles.machineList}>
          {machines.map((machine) => (
            <Pressable
              key={machine.id}
              onPress={() => navigation.navigate("MachineDetails", { machine })}
              style={styles.machineRow}
            >
              <View style={styles.machineInfo}>
                <Text style={styles.machineTitle}>
                  {machine.name ? `${machine.name} • ` : ""}#{machine.id}
                </Text>
                <Text style={styles.machineSubtitle}>{machine.address}</Text>
              </View>
              <Text
                style={[
                  styles.machineStatus,
                  machine.status === "offline" && styles.machineStatusOffline,
                ]}
              >
                {machine.status === "offline" ? "Offline" : "Available"}
              </Text>
            </Pressable>
          ))}
        </View>
      </SectionCard>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  mapArea: {
    height: 260,
    borderRadius: 24,
    backgroundColor: "#E9EBF1",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  mapLabel: {
    fontSize: 12,
    color: "#8B8F99",
    marginBottom: 12,
  },
  pinList: {
    width: "100%",
    gap: 8,
  },
  pinRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F05A78",
  },
  pinDotOffline: {
    backgroundColor: "#B0B3BC",
  },
  pinText: {
    fontSize: 12,
    color: "#111111",
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  sheetSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#8B8F99",
    marginBottom: 12,
  },
  machineList: {
    gap: 12,
  },
  machineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F2F5",
  },
  machineInfo: {
    flex: 1,
    marginRight: 12,
  },
  machineTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
  },
  machineSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#8B8F99",
  },
  machineStatus: {
    fontSize: 12,
    color: "#1A1A1A",
  },
  machineStatusOffline: {
    color: "#B0B3BC",
  },
});
