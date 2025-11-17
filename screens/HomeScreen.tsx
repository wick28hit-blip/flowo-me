import React, { useState } from 'react';
import type { Screen, Property, MaintenanceTask, User, NavigationPayload } from '../types';
import { Category } from '../types';
import { BellIcon, PlusIcon, CategoryIcons, SignOutIcon, UserIcon } from '../components/icons';
import { ToggleSwitch } from '../components/ToggleSwitch';

interface HomeScreenProps {
  onNavigate: (screen: Screen, payload?: NavigationPayload) => void;
  properties: Property[];
  tasks: MaintenanceTask[];
  user: User;
  onSignOut: () => void;
  onToggleTaskReminder: (taskId: string) => void;
}

const QuickActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isPrimary?: boolean;
}> = ({ icon, label, onClick, isPrimary = false }) => (
  <button onClick={onClick} className="flex flex-col items-center space-y-2 group" aria-label={label}>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isPrimary ? 'bg-[#253745] text-white' : 'bg-[#CCD0CF] text-black'}`}>
      {icon}
    </div>
    <span className="text-xs font-medium text-[#4A5C6A]">{label}</span>
  </button>
);

const TaskGridCard: React.FC<{ 
  task: MaintenanceTask; 
  onToggleTaskReminder: (taskId: string) => void;
}> = ({ task, onToggleTaskReminder }) => {
    const Icon = CategoryIcons[task.category];
    const daysRemaining = Math.ceil((new Date(task.nextDue).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    
    let dueText: string;
    let dueTextColor = 'text-[#9BA8AB]';

    if (daysRemaining < 0) {
        dueText = 'Overdue';
        dueTextColor = 'text-red-400 font-semibold';
    } else if (daysRemaining === 0) {
        dueText = 'Due Today';
        dueTextColor = 'text-amber-400 font-semibold';
    } else if (daysRemaining === 1) {
        dueText = 'Due in 1 day';
    } else {
        dueText = `Due in ${daysRemaining} days`;
    }

    return (
        <div className="bg-[#06141B] rounded-2xl p-4 flex flex-col justify-between text-white shadow-lg h-40">
            {/* Top Row */}
            <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <ToggleSwitch 
                  isOn={!!task.reminderEnabled} 
                  onToggle={() => onToggleTaskReminder(task.id)}
                  aria-label={`Enable reminder for ${task.name}`}
                />
            </div>
            {/* Bottom Row */}
            <div>
                <p className="font-bold text-white leading-tight">{task.name}</p>
                <p className={`text-sm ${dueTextColor}`}>{dueText}</p>
            </div>
        </div>
    );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, properties, tasks, user, onSignOut, onToggleTaskReminder }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.nextDue).getTime() - new Date(b.nextDue).getTime());
  const userName = user.displayName?.split(' ')[0] || 'User';

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto text-[#253745]">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hello {userName},</h1>
          <p className="text-[#9BA8AB]">Welcome back!</p>
        </div>
        <div className="flex items-center space-x-4">
          <BellIcon className="w-6 h-6 text-[#4A5C6A]" />
          <div className="relative">
            <button onClick={() => setShowUserMenu(!showUserMenu)}>
                <img src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt="User" className="w-9 h-9 rounded-full" />
            </button>
            {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 overflow-hidden">
                    <button onClick={() => { onNavigate('profile'); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                    </button>
                    <button onClick={onSignOut} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 border-t">
                        <SignOutIcon className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            )}
           </div>
        </div>
      </header>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Your Properties</h2>
          <button onClick={() => onNavigate('addProperty')} className="flex items-center space-x-1 text-sm font-medium text-[#4A5C6A]">
            <PlusIcon className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6">
           {properties.length > 0 ? (
            properties.map((prop, index) => (
              <button 
                  key={prop.id}
                  onClick={() => onNavigate('details', { property: prop })}
                  className={`flex-shrink-0 w-[220px] h-32 rounded-2xl p-4 text-[#CCD0CF] flex flex-col justify-end relative overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F0F2F5] focus:ring-white`}
              >
                  <div className={`absolute inset-0 ${index === 0 ? 'bg-[#06141B]' : 'bg-[#253745]'}`}></div>
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full"></div>
                  <div className="absolute -bottom-12 -right-2 w-28 h-28 bg-white/5 rounded-full"></div>
                  <div className="relative z-10">
                      <div className="font-semibold text-lg">{prop.name}</div>
                      <div className="text-xs text-[#9BA8AB]">{prop.address}</div>
                  </div>
              </button>
            ))
          ) : (
            <div className="w-full h-32 flex flex-col items-center justify-center bg-[#CCD0CF]/50 rounded-2xl text-center p-4">
                <p className="font-semibold text-[#253745]">No properties yet.</p>
                <p className="text-sm text-[#4A5C6A]">Click "Add" to get started.</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex justify-around items-start text-center">
            <QuickActionButton 
              icon={<PlusIcon className="w-6 h-6" />} 
              label="Add Task" 
              onClick={() => onNavigate('add')} 
              isPrimary 
            />
            <QuickActionButton 
              icon={<CategoryIcons.Plumbing className="w-6 h-6" />} 
              label="Plumbing"
              onClick={() => onNavigate('add', { category: Category.PLUMBING })}
            />
            <QuickActionButton 
              icon={<CategoryIcons.Electrical className="w-6 h-6" />} 
              label="Electrical"
              onClick={() => onNavigate('add', { category: Category.ELECTRICAL })}
            />
            <QuickActionButton 
              icon={<CategoryIcons.HVAC className="w-6 h-6" />} 
              label="HVAC"
              onClick={() => onNavigate('add', { category: Category.HVAC })}
            />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="font-semibold">Task</h2>
        <hr className="border-t border-black my-0" />
        
        {tasks.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
              {sortedTasks.map(task => (
                <button key={task.id} onClick={() => onNavigate('taskDetails', { taskId: task.id })} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F0F2F5] focus:ring-black rounded-2xl">
                    <TaskGridCard task={task} onToggleTaskReminder={onToggleTaskReminder} />
                </button>
              ))}
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-[#9BA8AB]">
            <p>No tasks found.</p>
            <p className="text-xs mt-1">Add one using the "Quick Actions" above.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeScreen;