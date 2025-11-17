import React from 'react';
import type { Screen, MaintenanceTask, Property, NavigationPayload } from '../types';
import { ChevronLeftIcon, CategoryIcons } from '../components/icons';
import { ProgressRing } from '../components/charts/ProgressRing';

interface TaskDetailsScreenProps {
  onNavigate: (screen: Screen, payload?: NavigationPayload) => void;
  task: MaintenanceTask;
  property: Property;
  previousScreen: Screen;
  onUpdateTask: (task: MaintenanceTask) => void;
}

const TaskDetailsScreen: React.FC<TaskDetailsScreenProps> = ({
  onNavigate,
  task,
  property,
  previousScreen,
  onUpdateTask,
}) => {
  const Icon = CategoryIcons[task.category];
  const daysRemaining = Math.ceil((new Date(task.nextDue).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  
  let dueText: string;
  let dueTextColor = 'text-[#253745]';

  if (daysRemaining < 0) {
      dueText = `Overdue by ${Math.abs(daysRemaining)} day(s)`;
      dueTextColor = 'text-red-500';
  } else if (daysRemaining === 0) {
      dueText = 'Due Today';
      dueTextColor = 'text-amber-500';
  } else {
      dueText = `Due in ${daysRemaining} day(s)`;
  }
  
  const handleCompletionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercentage = parseInt(e.target.value, 10);
    onUpdateTask({ ...task, completionPercentage: newPercentage });
  };

  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined || amount === null) {
      return 'N/A';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="flex-1 flex flex-col bg-[#11212D]">
      <header className="flex items-center p-6 sticky top-0 bg-[#F0F2F5] z-10">
        <button onClick={() => onNavigate(previousScreen, {property})} className="p-2 -ml-2 text-[#253745]">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-[#06141B] mx-auto truncate px-2">{task.name}</h1>
        <div className="w-6" />
      </header>

      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        <section className="flex flex-col items-center justify-center bg-[#F0F2F5] rounded-2xl p-6 shadow-sm">
          <ProgressRing percentage={task.completionPercentage} />
          <div className="w-full mt-6">
            <input
              type="range"
              min="0"
              max="100"
              value={task.completionPercentage}
              onChange={handleCompletionChange}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: '#253745' }}
            />
          </div>
        </section>

        <section className="bg-[#F0F2F5] rounded-2xl p-4 shadow-sm">
          <ul className="divide-y divide-gray-300">
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-500">Status</span>
              <span className={`font-semibold ${dueTextColor}`}>{dueText}</span>
            </li>
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-500">Property</span>
              <span className="font-semibold text-[#253745]">{property.name}</span>
            </li>
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-500">Category</span>
              <div className="flex items-center space-x-2 font-semibold text-[#253745]">
                <Icon className="w-5 h-5" />
                <span>{task.category}</span>
              </div>
            </li>
             <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-500">Next Due</span>
              <span className="font-semibold text-[#253745]">{formatDate(task.nextDue)}</span>
            </li>
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-500">Last Completed</span>
              <span className="font-semibold text-[#253745]">{formatDate(task.lastCompleted)}</span>
            </li>
             <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-500">Last Billed Amount</span>
              <span className="font-semibold text-[#253745]">{formatCurrency(task.lastBilledAmount)}</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default TaskDetailsScreen;