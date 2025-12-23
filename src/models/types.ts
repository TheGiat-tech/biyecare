export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  pricePerMonth: number;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "other";
  label: string;
  lastFour?: string;
}

export interface MachineLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
}

export interface PurchaseDetails {
  id: string;
  machineId: string;
  productName: string;
  total: number;
  purchasedAt: string;
}

export type TrackingMode = "cycle" | "pregnancy";

export type ReminderType = "periodPrediction" | "pregnancyWeekly";

export interface ReminderSettings {
  enabled: Record<ReminderType, boolean>;
  timeOfDay: { hour: number; minute: number };
  periodDaysBefore: number;
}

export interface CycleEntry {
  id: string;
  startDate: string;
  endDate?: string;
  notes?: string;
}

export type BleedingType = "none" | "spotting" | "light" | "period";

export type DischargeType =
  | "none"
  | "watery"
  | "creamy"
  | "sticky"
  | "eggwhite";

export interface SymptomEntry {
  date: string;
  mood?: string;
  painLevel?: number;
  flow?: "light" | "medium" | "heavy";
  bleedingType?: BleedingType;
  dischargeType?: DischargeType;
  notes?: string;
}

export interface PregnancyProfile {
  method: "lmp" | "dueDate";
  lmpDate?: string;
  dueDate?: string;
}

export type Pack = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type OrderStatus = "pending" | "redeemed" | "expired";

export type Order = {
  id: string;
  packId: string;
  createdAt: string;
  expiresAt: string;
  status: OrderStatus;
  qrPayload: string;
};
