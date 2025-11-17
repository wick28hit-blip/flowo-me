import React, { useState } from 'react';
import type { Screen, Property, MaintenanceTask, User } from '../types';
import { Category } from '../types';
import { ChevronLeftIcon, BellIcon, PlusIcon } from '../components/icons';
import { requestNotificationPermission } from '../utils/notifications';

interface AddTaskScreenProps {
  onNavigate: (screen: Screen, property?: Property) => void;
  onAddTask: (task: MaintenanceTask) => void;
  properties: Property[];
  user: User;
}

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ onNavigate, onAddTask, properties, user }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0]?.id || '');
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState<Category>(Category.FILTERS);
  const [dueDate, setDueDate] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderDateTime, setReminderDateTime] = useState('');

  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) { // Toggling ON
      const permissionGranted = await requestNotificationPermission();
      if (permissionGranted) {
        setNotificationsEnabled(true);
        // Set a default reminder time, e.g., next due date at 9 AM
        const defaultReminder = new Date(dueDate || new Date());
        defaultReminder.setHours(9, 0, 0, 0);
        setReminderDateTime(defaultReminder.toISOString().slice(0, 16));
      } else {
        alert("Notifications are blocked. Please enable them in your browser settings to use reminders.");
      }
    } else { // Toggling OFF
      setNotificationsEnabled(false);
      setReminderDateTime('');
    }
  };

  const handleSubmit = () => {
    if (!taskName || !selectedPropertyId || !dueDate) {
        alert("Please fill out all task details.");
        return;
    }
    if (notificationsEnabled && !reminderDateTime) {
        alert("Please set a reminder date and time.");
        return;
    }
    const newTask: MaintenanceTask = {
        id: `t-${Date.now()}`,
        name: taskName,
        category: category,
        lastCompleted: new Date().toISOString().split('T')[0],
        nextDue: dueDate,
        propertyId: selectedPropertyId,
        notificationsEnabled: notificationsEnabled,
        reminderDateTime: notificationsEnabled ? reminderDateTime : undefined,
    };
    onAddTask(newTask);
  };
  
  const PropertyCard: React.FC<{property: Property, isSelected: boolean, onClick: () => void}> = ({ property, isSelected, onClick }) => (
    <button onClick={onClick} className={`flex-shrink-0 w-[220px] h-32 rounded-2xl p-4 text-white flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${isSelected ? 'bg-black' : 'bg-zinc-800'}`}>
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full"></div>
        <div className="absolute -bottom-12 -right-2 w-28 h-28 bg-white/5 rounded-full"></div>
        <div className="flex justify-between items-center">
            <span className="font-semibold">{property.name}</span>
        </div>
        <div>
            <div className="text-lg font-mono tracking-widest">**** **** **** 1234</div>
            <div className="text-xs text-gray-300">{property.address}</div>
        </div>
    </button>
  );

  return (
    <div className="flex-1 flex flex-col bg-black text-white">
      <header className="flex justify-between items-center p-6">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Add New Task</h1>
        <div className="flex items-center space-x-4">
          <BellIcon className="w-6 h-6" />
          <img src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt="User" className="w-9 h-9 rounded-full" />
        </div>
      </header>

      <div className="flex-1 bg-gray-100 text-black rounded-t-3xl p-6 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Select your property</h2>
              <button onClick={() => onNavigate('addProperty')} className="flex items-center space-x-1 text-sm font-medium">
                <PlusIcon className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6">
              {properties.map((prop) => 
                <PropertyCard 
                  key={prop.id} 
                  property={prop} 
                  isSelected={selectedPropertyId === prop.id}
                  onClick={() => setSelectedPropertyId(prop.id)}
                />
              )}
            </div>
          </section>

          <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
            <div>
              <label htmlFor="taskName" className="text-sm font-medium text-gray-700">Task Name</label>
              <input type="text" id="taskName" value={taskName} onChange={e => setTaskName(e.target.value)} placeholder="e.g. Change AC Filter" className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
                <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black">
                  {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="dueDate" className="text-sm font-medium text-gray-700">Next Due Date</label>
                <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black"/>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                  <label htmlFor="notifications" className="text-sm font-medium text-gray-700">Set Reminder</label>
                  <button
                      role="switch"
                      aria-checked={notificationsEnabled}
                      onClick={handleToggleNotifications}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${notificationsEnabled ? 'bg-black' : 'bg-gray-300'}`}
                      id="notifications"
                  >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
              </div>
              {notificationsEnabled && (
              <div>
                  <label htmlFor="reminderDateTime" className="text-sm font-medium text-gray-700">Reminder Date & Time</label>
                  <input 
                  type="datetime-local" 
                  id="reminderDateTime" 
                  value={reminderDateTime} 
                  onChange={e => setReminderDateTime(e.target.value)} 
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black"
                  />
              </div>
              )}
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg mt-6">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTaskScreen;