export type Screen = 'home' | 'details' | 'add' | 'splash' | 'login' | 'addProperty' | 'profile' | 'taskDetails';

export enum Category {
  PLUMBER = 'Plumber',
  ELECTRICIAN = 'Electrician',
  KEY_MAKER = 'Key Maker',
  PROPERTY_INSPECTION = 'Property Inspection',
  WATER_FILTER = 'Water Filter Upgrade/Change',
  FRIDGE_REPAIR = 'Fridge Repair',
  WASHING_MACHINE_REPAIR = 'Washing Machine Repair',
  CARPENTER = 'Carpenter',
  DEEP_CLEANING = 'Full House Deep Cleaning',
  PEST_CONTROL = 'Pest Control',
}

export interface MaintenanceTask {
  id: string;
  name: string;
  category: Category;
  lastCompleted: string; // ISO date string
  nextDue: string; // ISO date string
  propertyId: string;
  reminderDateTime?: string; // ISO datetime string
  notificationsEnabled?: boolean;
  reminderEnabled?: boolean;
  completionPercentage: number;
  lastBilledAmount?: number;
}

export interface Property {
  id: string;
  name: string;
  address: string;
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface NavigationPayload {
  property?: Property;
  category?: Category;
  taskId?: string;
}