import React from 'react';
import type { Screen, Property, MaintenanceTask, User, NavigationPayload } from '../types';
import { ChevronLeftIcon, CategoryIcons } from '../components/icons';

interface DetailsScreenProps {
  onNavigate: (screen: Screen, payload?: NavigationPayload) => void;
  property: Property | null;
  tasks: MaintenanceTask[];
  user: User;
}

const TaskListItem: React.FC<{
    task: MaintenanceTask;
    onClick: () => void;
}> = ({task, onClick}) => {
    const Icon = CategoryIcons[task.category];
    const daysRemaining = Math.ceil((new Date(task.nextDue).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    
    let dueText: string;
    let dueTextColor = 'text-[#4A5C6A]';

    if (daysRemaining < 0) {
        dueText = `${Math.abs(daysRemaining)} days`;
        dueTextColor = 'text-red-500 font-semibold';
    } else if (daysRemaining === 0) {
        dueText = 'Today';
        dueTextColor = 'text-amber-500 font-semibold';
    } else {
        dueText = `${daysRemaining} days`;
    }

    let dueLabel = daysRemaining < 0 ? 'Overdue' : 'Due';

    return (
        <button onClick={onClick} className="w-full bg-white rounded-xl p-3 flex items-center space-x-4 shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06141B]">
            <div className="w-12 h-12 bg-[#CCD0CF] rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-[#253745]" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#06141B] truncate">{task.name}</p>
                <p className="text-sm text-[#4A5C6A]">{task.category}</p>
            </div>
            <div className="text-right">
                <p className={`font-semibold text-sm ${dueTextColor}`}>{dueText}</p>
                <p className="text-xs text-gray-500">{dueLabel}</p>
            </div>
        </button>
    );
};


const DetailsScreen: React.FC<DetailsScreenProps> = ({ onNavigate, property, tasks, user }) => {
  if (!property) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4 text-[#253745]">
        <p>Property not found.</p>
        <button onClick={() => onNavigate('home')} className="font-semibold text-[#06141B]">
          Go back to Home
        </button>
      </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => new Date(a.nextDue).getTime() - new Date(b.nextDue).getTime());

  return (
    <div className="flex-1 flex flex-col bg-[#F0F2F5]">
      <header className="flex justify-between items-center p-6 sticky top-0 bg-[#F0F2F5] z-10 border-b border-gray-200">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2 text-[#253745]">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-[#06141B] truncate px-2">{property.name}</h1>
        <img src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt="User" className="w-9 h-9 rounded-full" />
      </header>
      
      <main className="flex-1 p-6 overflow-y-auto">
        {sortedTasks.length > 0 ? (
          <div className="space-y-3">
            {sortedTasks.map(task => 
              <TaskListItem key={task.id} task={task} onClick={() => onNavigate('taskDetails', { taskId: task.id })} />
            )}
          </div>
        ) : (
          <div className="text-center py-16 text-sm text-[#9BA8AB]">
            <p className="font-semibold text-base text-[#4A5C6A]">No tasks here!</p>
            <p className="mt-1">All clear for {property.name}.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DetailsScreen;