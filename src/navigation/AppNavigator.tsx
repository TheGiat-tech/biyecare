import React from "react";
import { useAppState } from "../state/AppState";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../screens/Splash/SplashScreen";
import { SignInScreen } from "../screens/Auth/SignInScreen";
import { SignUpScreen } from "../screens/Auth/SignUpScreen";
import { SubscriptionPlansScreen } from "../screens/Subscription/SubscriptionPlansScreen";
import { AddPaymentMethodScreen } from "../screens/Subscription/AddPaymentMethodScreen";
import { PurchaseDetailsScreen } from "../screens/Purchase/PurchaseDetailsScreen";
import { PurchaseDetailsAltOneScreen } from "../screens/Purchase/PurchaseDetailsAltOneScreen";
import { PurchaseDetailsAltTwoScreen } from "../screens/Purchase/PurchaseDetailsAltTwoScreen";
import { PurchaseCompletedScreen } from "../screens/Purchase/PurchaseCompletedScreen";
import { PurchaseCompletedAltScreen } from "../screens/Purchase/PurchaseCompletedAltScreen";
import { PurchaseCompletedSuccessScreen } from "../screens/Purchase/PurchaseCompletedSuccessScreen";
import { NavigationScreen } from "../screens/Navigation/NavigationScreen";
import { UntitledScreen } from "../screens/Misc/UntitledScreen";
import { MapScreen } from "../screens/MapMachines/MapScreen";
import { MachineDetailsScreen } from "../screens/MapMachines/MachineDetailsScreen";
import { ScanQrScreen } from "../screens/Scan/ScanQrScreen";
import { PersonalDetailsScreen } from "../screens/Profile/PersonalDetailsScreen";
import { CycleTrackingScreen } from "../screens/Cycle/CycleTrackingScreen";
import { PacksListScreen } from "../screens/Packs/PacksListScreen";
import { CheckoutScreen } from "../screens/Packs/CheckoutScreen";
import { OrderQrScreen } from "../screens/Packs/OrderQrScreen";
import { MainTabs } from "./MainTabs";
import type { Machine } from "../data/machines";

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SubscriptionPlans: undefined;
  AddPaymentMethod: undefined;
  PurchaseDetails: undefined;
  PurchaseDetailsAltOne: undefined;
  PurchaseDetailsAltTwo: undefined;
  PurchaseCompleted: undefined;
  PurchaseCompletedAlt: undefined;
  PurchaseCompletedSuccess: undefined;
  Map: undefined;
  ScanQr: undefined;
  PersonalDetails: undefined;
  CycleTracking: undefined;
  MachineDetails: { machine: Machine };
  Navigation: { machine: Machine };
  Untitled: undefined;
  Main: undefined;
  PacksList: undefined;
  Checkout: { packId: string };
  OrderQr: { orderId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { isAuthenticated, isSubscribed, isHydrated } = useAppState();
  const initialRouteName = !isHydrated
    ? "Splash"
    : !isAuthenticated
      ? "SignIn"
      : !isSubscribed
        ? "SubscriptionPlans"
        : "Main";
  const navigatorKey = !isHydrated
    ? "splash"
    : !isAuthenticated
      ? "auth"
      : !isSubscribed
        ? "subscription"
        : "app";

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
      key={navigatorKey}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SubscriptionPlans" component={SubscriptionPlansScreen} />
      <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
      <Stack.Screen name="PurchaseDetails" component={PurchaseDetailsScreen} />
      <Stack.Screen name="PurchaseDetailsAltOne" component={PurchaseDetailsAltOneScreen} />
      <Stack.Screen name="PurchaseDetailsAltTwo" component={PurchaseDetailsAltTwoScreen} />
      <Stack.Screen name="PurchaseCompleted" component={PurchaseCompletedScreen} />
      <Stack.Screen name="PurchaseCompletedAlt" component={PurchaseCompletedAltScreen} />
      <Stack.Screen name="PurchaseCompletedSuccess" component={PurchaseCompletedSuccessScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="ScanQr" component={ScanQrScreen} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
      <Stack.Screen name="CycleTracking" component={CycleTrackingScreen} />
      <Stack.Screen name="MachineDetails" component={MachineDetailsScreen} />
      <Stack.Screen name="Navigation" component={NavigationScreen} />
      <Stack.Screen name="Untitled" component={UntitledScreen} />
      <Stack.Screen name="PacksList" component={PacksListScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderQr" component={OrderQrScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  );
}
