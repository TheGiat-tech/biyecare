import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SUBSCRIPTION_KEY = "biyecare.isSubscribed";

export type AppUser = {
  name?: string;
  email?: string;
};

type AppStateValue = {
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isHydrated: boolean;
  user: AppUser | null;
  signIn: (user?: AppUser) => void;
  signOut: () => void;
  setSubscribed: (value: boolean) => Promise<void>;
  updateUser: (user: AppUser) => void;
};

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const stored = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
        if (stored !== null) {
          setIsSubscribed(stored === "true");
        }
      } catch (error) {
        setIsSubscribed(false);
      } finally {
        setIsHydrated(true);
      }
    };

    loadSubscription();
  }, []);

  const signIn = useCallback((nextUser?: AppUser) => {
    setIsAuthenticated(true);
    if (nextUser) {
      setUser(nextUser);
    }
  }, []);

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const setSubscribed = useCallback(async (value: boolean) => {
    setIsSubscribed(value);
    try {
      await AsyncStorage.setItem(SUBSCRIPTION_KEY, value ? "true" : "false");
    } catch (error) {
      // Ignore persistence errors for local mock state.
    }
  }, []);

  const updateUser = useCallback((nextUser: AppUser) => {
    setUser((prevUser) => ({ ...prevUser, ...nextUser }));
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isSubscribed,
      isHydrated,
      user,
      signIn,
      signOut,
      setSubscribed,
      updateUser,
    }),
    [
      isAuthenticated,
      isHydrated,
      isSubscribed,
      setSubscribed,
      signIn,
      signOut,
      updateUser,
      user,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
