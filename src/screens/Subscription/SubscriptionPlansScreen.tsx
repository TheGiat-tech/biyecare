import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { SectionCard } from "../../components/SectionCard";
import { useAppState } from "../../state/AppState";

export function SubscriptionPlansScreen() {
  const navigation = useNavigation();
  const { setSubscribed } = useAppState();

  return (
    <ScreenLayout title="Subscription">
      <SectionCard>
        <Text style={styles.planTitle}>Currently free</Text>
        <Text style={styles.planSubtitle}>
          Subscriptions may be introduced in the future.
        </Text>
        <View style={styles.freeNotice}>
          <Text style={styles.freeNoticeTitle}>No payment required today.</Text>
          <Text style={styles.freeNoticeBody}>
            Continue to browse nearby machines and purchase packs for pickup.
          </Text>
        </View>
        <PrimaryButton
          label="Continue"
          onPress={async () => {
            await setSubscribed(true);
            navigation.navigate("Main" as never);
          }}
        />
      </SectionCard>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  planTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  planSubtitle: {
    marginTop: 6,
    fontSize: 12,
    color: "#8B8F99",
    marginBottom: 16,
  },
  freeNotice: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E3E8",
    padding: 12,
    marginBottom: 16,
  },
  freeNoticeTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111111",
  },
  freeNoticeBody: {
    marginTop: 6,
    fontSize: 11,
    color: "#8B8F99",
  },
});
