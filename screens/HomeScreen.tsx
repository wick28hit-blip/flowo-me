
import React from 'react';
import type { Screen, Property, MaintenanceTask } from '../types';
import { Category } from '../types';
import { BellIcon, PlusIcon, BarChartIcon, CategoryIcons } from '../components/icons';
import { MaintenancePieChart } from '../components/charts/MaintenanceCharts';
import { userRecipients } from '../constants';

interface HomeScreenProps {
  onNavigate: (screen: Screen, property?: Property) => void;
  properties: Property[];
  tasks: MaintenanceTask[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, properties, tasks }) => {
  
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
  
  const CategoryItem: React.FC<{category: Category, onClick: () => void}> = ({ category, onClick }) => {
    const Icon = CategoryIcons[category];
    return (
      <div className="flex flex-col items-center space-y-2" onClick={onClick}>
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-white"/>
        </div>
        <span className="text-xs">{category}</span>
      </div>
    );
  };
  
  const nextTask = tasks.sort((a,b) => new Date(a.nextDue).getTime() - new Date(b.nextDue).getTime())[0];
  const daysRemaining = nextTask ? Math.ceil((new Date(nextTask.nextDue).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : 0;
  const progress = nextTask ? Math.max(0, 100 - (daysRemaining / 30) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hello Mufidul,</h1>
          <p className="text-gray-500">Welcome back!</p>
        </div>
        <div className="flex items-center space-x-4">
          <BellIcon className="w-6 h-6 text-gray-700" />
          <img src="https://i.pravatar.cc/150?img=5" alt="User" className="w-9 h-9 rounded-full" />
        </div>
      </header>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Your Properties</h2>
          <button className="flex items-center space-x-1 text-sm font-medium">
            <PlusIcon className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6">
          {properties.map((prop, index) => <PropertyCard key={prop.id} property={prop} isFirst={index === 0} />)}
        </div>
      </section>

      <GlassCard>
          <h3 className="font-semibold text-sm mb-2">Next Due Task</h3>
          <p className="text-gray-600 text-xs mb-1">{nextTask?.name || 'No tasks due'}</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div className="bg-black h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Due in {daysRemaining} days</span>
            <span className="text-xs font-semibold">{Math.round(progress)}%</span>
          </div>
      </GlassCard>

      <section>
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex justify-between items-center">
            <button onClick={() => onNavigate('add')} className="flex flex-col items-center justify-center w-14 h-14 bg-gray-200/80 rounded-full">
                <PlusIcon className="w-6 h-6" />
            </button>
            {userRecipients.map(user => (
                <button key={user.name} className="flex flex-col items-center">
                    <img src={user.img} alt={user.name} className="w-14 h-14 rounded-full border-2 border-white" />
                </button>
            ))}
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
        <button onClick={() => onNavigate('details', properties[0])}>
            <BarChartIcon className="w-8 h-8"/>
        </button>
      </GlassCard>
    </div>
  );
};

export default HomeScreen;
