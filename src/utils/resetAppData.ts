import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants/storageKeys";

type ResetAppDataOptions = {
  resetHealthState: () => void;
  resetOrdersState: () => void;
};

export async function resetAllLocalData({
  resetHealthState,
  resetOrdersState,
}: ResetAppDataOptions) {
  resetHealthState();
  resetOrdersState();
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.HEALTH,
      STORAGE_KEYS.ORDERS,
    ]);
  } catch (error) {
    // Ignore local storage cleanup errors.
  }
}
