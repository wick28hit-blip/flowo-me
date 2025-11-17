import React, { useState } from 'react';
import type { Screen, Property, MaintenanceTask, User, NavigationPayload } from '../types';
import { Category } from '../types';
import { BellIcon, PlusIcon, BarChartIcon, CategoryIcons, SignOutIcon, UserIcon } from '../components/icons';
import { MaintenancePieChart } from '../components/charts/MaintenanceCharts';
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
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isPrimary ? 'bg-black text-white' : 'bg-gray-200/80 text-black'}`}>
      {icon}
    </div>
    <span className="text-xs font-medium text-gray-700">{label}</span>
  </button>
);

const TaskItem: React.FC<{ task: MaintenanceTask; propertyName: string }> = ({ task, propertyName }) => {
    const Icon = CategoryIcons[task.category];
    const daysRemaining = Math.ceil((new Date(task.nextDue).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-black" />
                </div>
                <div>
                    <p className="font-semibold">{task.name}</p>
                    <p className="text-xs text-gray-500">{propertyName}</p>
                </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">{daysRemaining > 1 ? `${daysRemaining} days` : daysRemaining === 1 ? 'Tomorrow' : 'Today'}</p>
              <p className="text-xs text-gray-500">Due</p>
            </div>
        </div>
     );
};


const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, properties, tasks, user, onSignOut, onToggleTaskReminder }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const PropertyCard: React.FC<{property: Property, isFirst: boolean}> = ({ property, isFirst }) => (
    <div className={`flex-shrink-0 w-[220px] h-32 rounded-2xl p-4 text-white flex flex-col justify-end relative overflow-hidden`}>
        <div className={`absolute inset-0 ${isFirst ? 'bg-black' : 'bg-zinc-800'}`}></div>
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full"></div>
        <div className="absolute -bottom-12 -right-2 w-28 h-28 bg-white/5 rounded-full"></div>
        <div className="relative z-10">
            <div className="font-semibold text-lg">{property.name}</div>
            <div className="text-xs text-gray-300">{property.address}</div>
        </div>
    </div>
  );
  
  const GlassCard: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`bg-white/50 backdrop-blur-lg border border-white/20 rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
  
  const nextTask = [...tasks].sort((a,b) => new Date(a.nextDue).getTime() - new Date(b.nextDue).getTime())[0];
  const recentTasks = [...tasks].sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1])).slice(0, 3);
  const userName = user.displayName?.split(' ')[0] || 'User';
  
  const NextDueTaskCard = () => {
    if (!nextTask) {
        return (
            <div className="bg-gray-800 rounded-2xl p-5 flex flex-col justify-center items-center h-40 text-white">
                <p className="font-semibold">No upcoming tasks!</p>
                <p className="text-gray-400 text-sm">Add a task to get started.</p>
            </div>
        )
    }
    
    const daysRemaining = Math.ceil((new Date(nextTask.nextDue).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    const Icon = CategoryIcons[nextTask.category];

    return (
        <div className="bg-black rounded-2xl p-5 flex flex-col justify-between h-40 text-white shadow-lg">
            <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <ToggleSwitch 
                  isOn={!!nextTask.reminderEnabled} 
                  onToggle={() => onToggleTaskReminder(nextTask.id)}
                  aria-label={`Enable reminder for ${nextTask.name}`}
                />
            </div>
            <div>
                <h3 className="font-bold text-lg">{nextTask.name}</h3>
                <p className="text-gray-400 text-sm">
                    {daysRemaining > 1 ? `Due in ${daysRemaining} days` : daysRemaining === 1 ? 'Due tomorrow' : 'Due today'}
                </p>
            </div>
        </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hello {userName},</h1>
          <p className="text-gray-500">Welcome back!</p>
        </div>
        <div className="flex items-center space-x-4">
          <BellIcon className="w-6 h-6 text-gray-700" />
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
          <button onClick={() => onNavigate('addProperty')} className="flex items-center space-x-1 text-sm font-medium">
            <PlusIcon className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6">
           {properties.length > 0 ? (
            properties.map((prop, index) => <PropertyCard key={prop.id} property={prop} isFirst={index === 0} />)
          ) : (
            <div className="w-full h-32 flex flex-col items-center justify-center bg-gray-100 rounded-2xl text-center p-4">
                <p className="font-semibold text-gray-700">No properties yet.</p>
                <p className="text-sm text-gray-500">Click "Add" to get started.</p>
            </div>
          )}
        </div>
      </section>

      <NextDueTaskCard />

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
      
       <section>
        <h2 className="font-semibold mb-2">Recent Tasks</h2>
        <div className="divide-y divide-gray-200 bg-white/80 rounded-2xl p-4">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => {
                const propertyName = properties.find(p => p.id === task.propertyId)?.name || 'N/A';
                return <TaskItem key={task.id} task={task} propertyName={propertyName} />;
              })
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No recent tasks. Add one using a quick action!</p>
            )}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
