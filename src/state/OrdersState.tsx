import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Order } from "../models/types";
import { STORAGE_KEYS } from "../constants/storageKeys";

type OrdersStateValue = {
  orders: Order[];
  createOrder: (packId: string) => Order;
  refreshExpiredOrders: () => void;
  markRedeemed: (orderId: string) => void;
  resetOrdersState: () => void;
};

const OrdersStateContext = createContext<OrdersStateValue | undefined>(undefined);

const buildOrderId = () =>
  `order_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

export function OrdersStateProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.ORDERS);
        if (stored) {
          const parsed = JSON.parse(stored) as Order[];
          setOrders(parsed);
        }
      } catch (error) {
        setOrders([]);
      } finally {
        setHasLoaded(true);
      }
    };

    loadOrders();
  }, []);

  useEffect(() => {
    const persistOrders = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.ORDERS,
          JSON.stringify(orders)
        );
      } catch (error) {
        // Ignore persistence errors for local mock state.
      }
    };

    persistOrders();
  }, [orders]);

  const refreshExpiredOrders = useCallback(() => {
    const now = Date.now();
    setOrders((prev) =>
      prev.map((order) => {
        if (
          order.status === "pending" &&
          new Date(order.expiresAt).getTime() <= now
        ) {
          return { ...order, status: "expired" };
        }
        return order;
      })
    );
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      refreshExpiredOrders();
    }
  }, [hasLoaded, refreshExpiredOrders]);

  const createOrder = useCallback((packId: string) => {
    const now = Date.now();
    const id = buildOrderId();
    const order: Order = {
      id,
      packId,
      createdAt: new Date(now).toISOString(),
      expiresAt: new Date(now + 15 * 60 * 1000).toISOString(),
      status: "pending",
      qrPayload: `BIYE:ORDER:${id}`,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const markRedeemed = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "redeemed" } : order
      )
    );
  }, []);

  const resetOrdersState = useCallback(() => {
    setOrders([]);
  }, []);

  const value = useMemo(
    () => ({
      orders,
      createOrder,
      refreshExpiredOrders,
      markRedeemed,
      resetOrdersState,
    }),
    [createOrder, markRedeemed, orders, refreshExpiredOrders, resetOrdersState]
  );

  return (
    <OrdersStateContext.Provider value={value}>
      {children}
    </OrdersStateContext.Provider>
  );
}

export function useOrdersState() {
  const context = useContext(OrdersStateContext);
  if (!context) {
    throw new Error("useOrdersState must be used within an OrdersStateProvider");
  }
  return context;
}
