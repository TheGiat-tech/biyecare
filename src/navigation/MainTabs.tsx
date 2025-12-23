import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MapScreen } from "../screens/MapMachines/MapScreen";
import { ScanQrScreen } from "../screens/Scan/ScanQrScreen";
import { PersonalDetailsScreen } from "../screens/Profile/PersonalDetailsScreen";
import { CycleTrackingScreen } from "../screens/Cycle/CycleTrackingScreen";

export type MainTabParamList = {
  Map: undefined;
  Scan: undefined;
  Profile: undefined;
  Cycle: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F05A78",
        tabBarInactiveTintColor: "#B0B3BC",
      }}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Scan" component={ScanQrScreen} />
      <Tab.Screen name="Profile" component={PersonalDetailsScreen} />
      <Tab.Screen name="Cycle" component={CycleTrackingScreen} />
    </Tab.Navigator>
  );
}
