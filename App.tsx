
import React, { useState, useCallback } from 'react';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import type { Screen, Property, MaintenanceTask } from './types';
import { mockProperties, mockTasks } from './constants';
import { scheduleNotification } from './utils/notifications';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(mockProperties[0]);
  const [tasks, setTasks] = useState<MaintenanceTask[]>(mockTasks);

  const handleNavigate = useCallback((newScreen: Screen, property?: Property) => {
    setScreen(newScreen);
    if (property) {
      setSelectedProperty(property);
    }
  }, []);
  
  const handleAddTask = (task: MaintenanceTask) => {
    if (task.notificationsEnabled && task.reminderDateTime) {
        scheduleNotification(task);
    }
    setTasks(prevTasks => [...prevTasks, task]);
    setScreen('home');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} properties={mockProperties} tasks={tasks} />;
      case 'details':
        return <DetailsScreen onNavigate={handleNavigate} property={selectedProperty} tasks={tasks.filter(t => t.propertyId === selectedProperty?.id)} />;
      case 'add':
        return <AddTaskScreen onNavigate={handleNavigate} onAddTask={handleAddTask} properties={mockProperties} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} properties={mockProperties} tasks={tasks} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-2">
      <div className="w-full max-w-sm h-[800px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
