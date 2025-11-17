import type { Property, MaintenanceTask } from './types';
import { Category } from './types';

export const mockProperties: Property[] = [
  { id: 'p1', name: 'Main Residence', address: '123 Maple St' },
  { id: 'p2', name: 'Beach House', address: '456 Ocean Ave' },
  { id: 'p3', name: 'City Apartment', address: '789 Central Blvd' },
];

export const mockTasks: MaintenanceTask[] = [
  { id: 't1', propertyId: 'p1', name: 'Change water filter', category: Category.FILTERS, lastCompleted: '2024-06-01', nextDue: '2024-09-01' },
  { id: 't2', propertyId: 'p1', name: 'Clean HVAC filter', category: Category.HVAC, lastCompleted: '2024-07-15', nextDue: '2024-10-15' },
  { id: 't3', propertyId: 'p2', name: 'Inspect plumbing', category: Category.PLUMBING, lastCompleted: '2024-01-10', nextDue: '2025-01-10' },
  { id: 't4', propertyId: 'p1', name: 'Test smoke detectors', category: Category.ELECTRICAL, lastCompleted: '2024-07-01', nextDue: '2025-01-01' },
  { id: 't5', propertyId: 'p3', name: 'Service refrigerator', category: Category.APPLIANCES, lastCompleted: '2023-12-20', nextDue: '2024-12-20' },
];
