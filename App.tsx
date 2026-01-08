import "react-native-gesture-handler";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { AppStateProvider } from "./src/state/AppState";
import { HealthStateProvider } from "./src/state/HealthState";
import { OrdersStateProvider } from "./src/state/OrdersState";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppStateProvider>
        <OrdersStateProvider>
          <HealthStateProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </HealthStateProvider>
        </OrdersStateProvider>
      </AppStateProvider>
    </GestureHandlerRootView>
  );
}
