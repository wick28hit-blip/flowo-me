
import type { MaintenanceTask } from '../types';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
};

export const scheduleNotification = (task: MaintenanceTask): void => {
  if (!task.notificationsEnabled || !task.reminderDateTime) {
    return;
  }

  const reminderTime = new Date(task.reminderDateTime).getTime();
  const now = new Date().getTime();
  const delay = reminderTime - now;

  if (delay > 0) {
    console.log(`Scheduling notification for "${task.name}" in ${delay / 1000} seconds.`);
    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('Home Maintenance Reminder', {
          body: `It's time for your task: ${task.name}`,
          icon: '/vite.svg',
        });
      }
    }, delay);
  } else {
    console.warn(`Could not schedule notification for "${task.name}" as the reminder time is in the past.`);
  }
};
