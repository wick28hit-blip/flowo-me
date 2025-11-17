import React from 'react';
import type { Screen, Property, MaintenanceTask, User } from '../types';
import { Category } from '../types';
import { ChevronLeftIcon, BellIcon, CategoryIcons } from '../components/icons';
import { MaintenanceBarChart } from '../components/charts/MaintenanceCharts';

interface DetailsScreenProps {
  onNavigate: (screen: Screen) => void;
  property: Property | null;
  tasks: MaintenanceTask[];
  user: User;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ onNavigate, property, tasks, user }) => {
  
  const GlassCard: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`bg-white/50 backdrop-blur-lg border border-white/20 rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
  
  const CategoryItem: React.FC<{ category: Category, amount: number }> = ({ category, amount }) => {
    const Icon = CategoryIcons[category];
    return (
      <GlassCard className="flex-1 min-w-[120px]">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-black rounded-lg">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold">{category}</p>
            <p className="text-xs text-gray-600">{amount} tasks</p>
          </div>
        </div>
      </GlassCard>
    );
  };
  
  const TransactionItem: React.FC<{task: MaintenanceTask}> = ({task}) => {
     const Icon = CategoryIcons[task.category];
     return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-black" />
                </div>
                <div>
                    <p className="font-semibold">{task.name}</p>
                    <p className="text-xs text-gray-500">{new Date(task.lastCompleted).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="font-semibold text-sm">Completed</p>
        </div>
     );
  };


  return (
    <div className="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto">
      <header className="flex justify-between items-center">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Details</h1>
        <div className="flex items-center space-x-4">
          <BellIcon className="w-6 h-6 text-gray-700" />
          <img src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt="User" className="w-9 h-9 rounded-full" />
        </div>
      </header>
      
      <GlassCard>
        <div className="flex justify-between items-start mb-2">
          <div>
              <p className="text-gray-500 text-sm">Tasks this month</p>
              <p className="text-2xl font-bold">{tasks.length}</p>
          </div>
          <select className="text-xs bg-transparent border-none focus:ring-0">
              <option>Weekly</option>
              <option>Monthly</option>
          </select>
        </div>
        <MaintenanceBarChart tasks={tasks}/>
      </GlassCard>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Category</h2>
          <a href="#" className="text-sm text-gray-500">See all</a>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2 -mx-6 px-6">
          {Object.values(Category).map(cat => (
            <CategoryItem key={cat} category={cat} amount={tasks.filter(t => t.category === cat).length} />
          ))}
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">Recent Activity</h2>
          <a href="#" className="text-sm text-gray-500">See all</a>
        </div>
        <div className="divide-y divide-gray-200">
            {tasks.slice(0,3).map(task => <TransactionItem key={task.id} task={task} />)}
        </div>
      </section>
    </div>
  );
};

export default DetailsScreen;