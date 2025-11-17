import React, { useState } from 'react';
import type { Screen, Property, MaintenanceTask, User, NavigationPayload } from '../types';
import { Category } from '../types';
import { ChevronLeftIcon, BellIcon, PlusIcon, CalendarIcon } from '../components/icons';
import { requestNotificationPermission } from '../utils/notifications';
import { ToggleSwitch } from '../components/ToggleSwitch';

interface AddTaskScreenProps {
  onNavigate: (screen: Screen, payload?: NavigationPayload) => void;
  onAddTask: (task: MaintenanceTask) => void;
  properties: Property[];
  user: User;
  preselectedCategory?: Category | null;
}

const UserAvatar: React.FC<{ user: User }> = ({ user }) => {
  const initial = user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U';
  if (user.photoURL) {
    return <img src={user.photoURL} alt="User" className="w-9 h-9 rounded-full" />;
  }
  return (
    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
      {initial}
    </div>
  );
};

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ onNavigate, onAddTask, properties, user, preselectedCategory }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0]?.id || '');
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState<Category>(preselectedCategory || Category.FILTERS);
  const [lastCompletedDate, setLastCompletedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [lastBilledAmount, setLastBilledAmount] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderDateTime, setReminderDateTime] = useState('');

  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) { // Toggling ON
      const permissionGranted = await requestNotificationPermission();
      if (permissionGranted) {
        setNotificationsEnabled(true);
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
    if (!taskName || !selectedPropertyId || !dueDate || !lastCompletedDate) {
        alert("Please fill out all required task details.");
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
        lastCompleted: lastCompletedDate,
        nextDue: dueDate,
        propertyId: selectedPropertyId,
        notificationsEnabled: notificationsEnabled,
        reminderDateTime: notificationsEnabled ? reminderDateTime : undefined,
        completionPercentage: 0,
        lastBilledAmount: lastBilledAmount ? parseFloat(lastBilledAmount) : undefined,
    };
    onAddTask(newTask);
  };
  
  const PropertyCard: React.FC<{property: Property, isSelected: boolean, onClick: () => void}> = ({ property, isSelected, onClick }) => (
    <button onClick={onClick} className={`flex-shrink-0 w-48 h-28 rounded-2xl p-4 text-[#CCD0CF] flex flex-col justify-end relative overflow-hidden transition-all duration-300 ring-2 ${isSelected ? 'ring-white' : 'ring-transparent'}`}>
        <div className={`absolute inset-0 bg-[#06141B]`}></div>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 rounded-full"></div>
        <div className="absolute -bottom-12 -right-2 w-24 h-24 bg-white/5 rounded-full"></div>
        <div className="relative z-10 text-left">
            <div className="font-semibold">{property.name}</div>
            <div className="text-xs text-[#9BA8AB] truncate">{property.address}</div>
        </div>
    </button>
  );

  return (
    <div className="flex-1 flex flex-col bg-[#11212D] text-white">
      <header className="flex justify-between items-center p-6 flex-shrink-0">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Add New Task</h1>
        <div className="flex items-center space-x-4">
          <BellIcon className="w-6 h-6" />
          <UserAvatar user={user} />
        </div>
      </header>

      <div className="flex-1 flex flex-col bg-[#F0F2F5] text-[#253745] rounded-t-3xl overflow-hidden min-h-0">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <section>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold">Select your property</h2>
                <button onClick={() => onNavigate('addProperty')} className="flex items-center space-x-1 text-sm font-medium text-[#4A5C6A]">
                  <PlusIcon className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6">
                {properties.length > 0 ? (
                  properties.map((prop) => 
                    <PropertyCard 
                      key={prop.id} 
                      property={prop} 
                      isSelected={selectedPropertyId === prop.id}
                      onClick={() => setSelectedPropertyId(prop.id)}
                    />
                  )
                ) : (
                  <div className="w-full h-28 flex flex-col items-center justify-center bg-gray-200 rounded-2xl text-center text-gray-500 p-4">
                      <p className="font-semibold">No properties found.</p>
                      <p className="text-sm">Please add a property first.</p>
                  </div>
                )}
              </div>
            </section>

            <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
              <div>
                <label htmlFor="taskName" className="text-sm font-semibold text-gray-500 mb-1 block">Task Name</label>
                <input type="text" id="taskName" value={taskName} onChange={e => setTaskName(e.target.value)} placeholder="e.g. Change AC Filter" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-[#06141B] focus:border-[#06141B] focus:bg-white"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="text-sm font-semibold text-gray-500 mb-1 block">Category</label>
                  <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-[#06141B] focus:border-[#06141B] focus:bg-white">
                    {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="lastCompletedDate" className="text-sm font-semibold text-gray-500 mb-1 block">Last Completed</label>
                  <div className="relative">
                    <input type="date" id="lastCompletedDate" value={lastCompletedDate} onChange={e => setLastCompletedDate(e.target.value)} className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-[#06141B] focus:border-[#06141B] focus:bg-white pr-10"/>
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"/>
                  </div>
                </div>
                <div>
                  <label htmlFor="dueDate" className="text-sm font-semibold text-gray-500 mb-1 block">Next Due Date</label>
                    <div className="relative">
                      <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="dd/mm/yyyy" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-[#06141B] focus:border-[#06141B] focus:bg-white pr-10"/>
                      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"/>
                    </div>
                </div>
                <div>
                  <label htmlFor="lastBilledAmount" className="text-sm font-semibold text-gray-500 mb-1 block">Last Billed ($)</label>
                  <input type="number" id="lastBilledAmount" value={lastBilledAmount} onChange={e => setLastBilledAmount(e.target.value)} placeholder="e.g. 75.50" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-[#06141B] focus:border-[#06141B] focus:bg-white"/>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between pt-2">
                    <label htmlFor="notifications" className="text-sm font-semibold text-gray-500">Set Reminder</label>
                    <ToggleSwitch 
                        isOn={notificationsEnabled} 
                        onToggle={handleToggleNotifications}
                        aria-label="Set Reminder"
                    />
                </div>
                {notificationsEnabled && (
                <div>
                    <label htmlFor="reminderDateTime" className="text-sm font-semibold text-gray-500 mb-1 block">Reminder Date & Time</label>
                    <div className="relative">
                      <input 
                        type="datetime-local" 
                        id="reminderDateTime" 
                        value={reminderDateTime} 
                        onChange={e => setReminderDateTime(e.target.value)} 
                        className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-[#06141B] focus:border-[#06141B] focus:bg-white pr-10"
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"/>
                    </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-[#F0F2F5] border-t border-gray-200">
          <button 
              onClick={handleSubmit} 
              disabled={properties.length === 0 || !selectedPropertyId}
              className="w-full bg-[#06141B] text-white py-4 rounded-2xl font-bold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform duration-200 active:scale-95">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskScreen;