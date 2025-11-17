import React, { useState } from 'react';
import type { Screen, Property, MaintenanceTask, User, NavigationPayload } from '../types';
import { Category } from '../types';
import { BellIcon, PlusIcon, BarChartIcon, CategoryIcons, SignOutIcon } from '../components/icons';
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


const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, properties, tasks, user, onSignOut, onToggleTaskReminder }) => {
  const [showSignOut, setShowSignOut] = useState(false);
  
  const PropertyCard: React.FC<{property: Property, isFirst: boolean}> = ({ property, isFirst }) => (
    <div className={`flex-shrink-0 w-[220px] h-32 rounded-2xl p-4 text-white flex flex-col justify-between relative overflow-hidden ${isFirst ? 'bg-black' : 'bg-zinc-800'}`}>
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full"></div>
        <div className="absolute -bottom-12 -right-2 w-28 h-28 bg-white/5 rounded-full"></div>
        <div className="flex justify-between items-center">
            <span className="font-semibold">{property.name}</span>
            <span className="text-xs font-mono bg-white/20 px-2 py-1 rounded">PRO</span>
        </div>
        <div>
            <div className="text-lg font-mono tracking-widest">**** **** **** 1234</div>
            <div className="text-xs text-gray-300">{property.address}</div>
        </div>
    </div>
  );
  
  const GlassCard: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`bg-white/50 backdrop-blur-lg border border-white/20 rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
  
  const nextTask = tasks.sort((a,b) => new Date(a.nextDue).getTime() - new Date(b.nextDue).getTime())[0];
  const userName = user.displayName?.split(' ')[0] || 'User';
  
  const NextDueTaskCard = () => {
    if (!nextTask) {
        return (
            <div className="bg-gray-800 rounded-2xl p-5 flex flex-col justify-center items-center h-40 text-white">
                <p className="font-semibold">No upcoming tasks!</p>
                <p className="text-gray-400 text-sm">All caught up.</p>
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
            <button onClick={() => setShowSignOut(!showSignOut)}>
                <img src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt="User" className="w-9 h-9 rounded-full" />
            </button>
            {showSignOut && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-10">
                    <button onClick={onSignOut} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
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
          {properties.map((prop, index) => <PropertyCard key={prop.id} property={prop} isFirst={index === 0} />)}
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
      
      <GlassCard className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <MaintenancePieChart tasks={tasks} />
            <div>
              <h3 className="font-bold">Maintenance Stats</h3>
              <p className="text-xs text-gray-500">Overview of all tasks</p>
            </div>
        </div>
        <button onClick={() => onNavigate('details', { property: properties[0] })}>
            <BarChartIcon className="w-8 h-8"/>
        </button>
      </GlassCard>
    </div>
  );
};

export default HomeScreen;
