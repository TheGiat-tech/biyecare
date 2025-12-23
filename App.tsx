import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { AppStateProvider } from "./src/state/AppState";
import { OrdersStateProvider } from "./src/state/OrdersState";

export default function App() {
  return (
    <AppStateProvider>
      <OrdersStateProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </OrdersStateProvider>
    </AppStateProvider>
  );
}
