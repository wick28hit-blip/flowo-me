
export type Screen = 'home' | 'details' | 'add';

export enum Category {
  FILTERS = 'Filters',
  PLUMBING = 'Plumbing',
  ELECTRICAL = 'Electrical',
  HVAC = 'HVAC',
  APPLIANCES = 'Appliances',
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
}

export interface Property {
  id: string;
  name: string;
  address: string;
}
