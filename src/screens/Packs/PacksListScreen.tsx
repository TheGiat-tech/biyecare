import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { packs } from "../../data/packs";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenLayout } from "../../components/ScreenLayout";
import { SectionCard } from "../../components/SectionCard";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export function PacksListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenLayout
      title="Packs"
      subtitle="Purchase packs for pickup at a nearby machine."
    >
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {packs.map((pack) => (
          <SectionCard key={pack.id}>
            <View style={styles.cardHeader}>
              <Text style={styles.packName}>{pack.name}</Text>
              <Text style={styles.packPrice}>${pack.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.packDescription}>{pack.description}</Text>
            <PrimaryButton
              label="Buy"
              onPress={() => navigation.navigate("Checkout", { packId: pack.id })}
            />
          </SectionCard>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 16,
    paddingBottom: 24,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  packName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  packPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F05A78",
  },
  packDescription: {
    fontSize: 12,
    color: "#8B8F99",
    marginBottom: 12,
  },
});
