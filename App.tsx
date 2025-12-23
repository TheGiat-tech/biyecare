import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { AppStateProvider } from "./src/state/AppState";

export default function App() {
  return (
    <AppStateProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppStateProvider>
  );
}
