import React, { useState, useCallback, useEffect } from 'react';
import { onAuthStateChanged, signOut, type User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebaseConfig';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import AddPropertyScreen from './screens/AddPropertyScreen';
import ProfileScreen from './screens/ProfileScreen';


import type { Screen, Property, MaintenanceTask, User, Category, NavigationPayload } from './types';
import { scheduleNotification } from './utils/notifications';
import { sendReminderEmail } from './utils/email';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isSplashActive, setIsSplashActive] = useState(true);
  const [preselectedCategory, setPreselectedCategory] = useState<Category | null>(null);

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

  const handleNavigate = useCallback((newScreen: Screen, payload?: NavigationPayload) => {
    setScreen(newScreen);
    if (payload?.property) {
      setSelectedPropertyId(payload.property.id);
    }
    
    if (newScreen === 'add' && payload?.category) {
        setPreselectedCategory(payload.category);
    } else {
        setPreselectedCategory(null);
    }
  }, []);
  
  const handleAddTask = (task: MaintenanceTask) => {
    if (task.notificationsEnabled && task.reminderDateTime) {
        scheduleNotification(task);
    }
    setTasks(prevTasks => [...prevTasks, task]);
    setScreen('home');
  };
  
  const handleAddProperty = (property: Property) => {
    setProperties(prevProperties => {
        const newProperties = [...prevProperties, property];
        if (newProperties.length === 1) {
            setSelectedPropertyId(property.id);
        }
        return newProperties;
    });
    setScreen('home');
  };

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);
  
  const handleUpdateUser = (updatedUserInfo: Partial<User>) => {
    setUser(prevUser => {
        if (!prevUser) return null;
        return { ...prevUser, ...updatedUserInfo };
    });
  };
  
  const handleToggleTaskReminder = (taskId: string) => {
    setTasks(prevTasks => {
      let taskToUpdate: MaintenanceTask | undefined;
      const newTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          taskToUpdate = { ...task, reminderEnabled: !task.reminderEnabled };
          return taskToUpdate;
        }
        return task;
      });

      // If reminder was just enabled, send email
      if (taskToUpdate && taskToUpdate.reminderEnabled) {
        sendReminderEmail(taskToUpdate);
      }

      return newTasks;
    });
  };

  const renderScreen = (currentUser: User) => {
    const selectedProperty = properties.find(p => p.id === selectedPropertyId) || properties[0] || null;

    switch (screen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} properties={properties} tasks={tasks} user={currentUser} onSignOut={handleSignOut} onToggleTaskReminder={handleToggleTaskReminder} />;
      case 'details':
        return <DetailsScreen onNavigate={handleNavigate} property={selectedProperty} tasks={tasks.filter(t => t.propertyId === selectedProperty?.id)} user={currentUser} />;
      case 'add':
        return <AddTaskScreen onNavigate={handleNavigate} onAddTask={handleAddTask} properties={properties} user={currentUser} preselectedCategory={preselectedCategory} />;
      case 'addProperty':
        return <AddPropertyScreen onNavigate={handleNavigate} onAddProperty={handleAddProperty} user={currentUser} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} user={currentUser} onUpdateUser={handleUpdateUser} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} properties={properties} tasks={tasks} user={currentUser} onSignOut={handleSignOut} onToggleTaskReminder={handleToggleTaskReminder} />;
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
    <div className="min-h-screen bg-[#11212D] font-sans flex items-center justify-center p-2">
      <div className="w-full max-w-sm h-[800px] max-h-[90vh] bg-[#F0F2F5] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;