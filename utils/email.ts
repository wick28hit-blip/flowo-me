import type { MaintenanceTask } from '../types';

/**
 * Simulates sending a reminder email for a maintenance task.
 * In a real application, this would call a backend service to send the email.
 * @param task The task for which to send a reminder.
 */
export const sendReminderEmail = (task: MaintenanceTask): void => {
  console.log(`Simulating email send for task: ${task.name}`);
  alert(`Reminder enabled!\n\nAn email notification has been sent for the task: "${task.name}".`);
};
