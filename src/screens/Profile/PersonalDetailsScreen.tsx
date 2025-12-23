import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { TextField } from "../../components/TextField";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export function PersonalDetailsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenLayout title="Profile">
      <View style={styles.avatarRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <View>
          <Text style={styles.name}>Jane Doe</Text>
          <Text style={styles.email}>jane@email.com</Text>
        </View>
      </View>
      <View style={styles.card}>
        <TextField label="Full name" placeholder="Jane Doe" />
        <TextField label="Phone" placeholder="+1 555 000 000" />
        <TextField label="Email" placeholder="jane@email.com" />
        <PrimaryButton label="Save" />
        <PrimaryButton
          label="Privacy & Data"
          variant="ghost"
          onPress={() => navigation.navigate("PrivacyData")}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F05A78",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  email: {
    fontSize: 12,
    color: "#8B8F99",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    gap: 12,
  },
});
