import React, { useState, useCallback, useEffect } from 'react';
import { onAuthStateChanged, signOut, type User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebaseConfig';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';

import type { Screen, Property, MaintenanceTask, User } from './types';
import { mockProperties, mockTasks } from './constants';
import { scheduleNotification } from './utils/notifications';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(mockProperties[0]);
  const [tasks, setTasks] = useState<MaintenanceTask[]>(mockTasks);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isSplashActive, setIsSplashActive] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    const timer = setTimeout(() => {
        setIsSplashActive(false);
    }, 2500); // Splash screen duration

    return () => {
        unsubscribe();
        clearTimeout(timer);
    };
  }, []);

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

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  const renderScreen = (currentUser: User) => {
    switch (screen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} properties={mockProperties} tasks={tasks} user={currentUser} onSignOut={handleSignOut} />;
      case 'details':
        return <DetailsScreen onNavigate={handleNavigate} property={selectedProperty} tasks={tasks.filter(t => t.propertyId === selectedProperty?.id)} user={currentUser} />;
      case 'add':
        return <AddTaskScreen onNavigate={handleNavigate} onAddTask={handleAddTask} properties={mockProperties} user={currentUser} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} properties={mockProperties} tasks={tasks} user={currentUser} onSignOut={handleSignOut} />;
    }
  };

  const renderContent = () => {
    if (isSplashActive || user === undefined) {
      return <SplashScreen />;
    }
    if (user === null) {
      return <LoginScreen />;
    }
    return renderScreen(user);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-2">
      <div className="w-full max-w-sm h-[800px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
