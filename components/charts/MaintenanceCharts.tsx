
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Category, MaintenanceTask } from '../../types';

const PIE_COLORS = ['#000000', '#4A4A4A', '#808080', '#A9A9A9', '#D3D3D3'];

interface MaintenancePieChartProps {
  tasks: MaintenanceTask[];
}

export const MaintenancePieChart: React.FC<MaintenancePieChartProps> = ({ tasks }) => {
  const data = Object.values(Category).map(category => ({
    name: category,
    value: tasks.filter(task => task.category === category).length,
  })).filter(item => item.value > 0);

  const totalTasks = tasks.length;
  const percentage = totalTasks > 0 ? Math.round((data[0]?.value / totalTasks) * 100) : 0;

  return (
    <div className="relative w-24 h-24">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={35}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{percentage}%</span>
        <span className="text-xs text-gray-500">Tasks</span>
      </div>
    </div>
  );
};

interface MaintenanceBarChartProps {
  tasks: MaintenanceTask[];
}

export const MaintenanceBarChart: React.FC<MaintenanceBarChartProps> = ({ tasks }) => {
  const data = [
    { name: 'Mon', tasks: 3 },
    { name: 'Tue', tasks: 5 },
    { name: 'Wed', tasks: 2 },
    { name: 'Thu', tasks: 6 },
    { name: 'Fri', tasks: 4 },
    { name: 'Sat', tasks: 1 },
    { name: 'Sun', tasks: 3 },
  ];

  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
        <Tooltip cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }} contentStyle={{ backgroundColor: 'black', border: 'none', borderRadius: '8px' }}/>
        <Bar dataKey="tasks" fill="#000000" radius={[4, 4, 4, 4]} barSize={12}/>
      </BarChart>
    </ResponsiveContainer>
  );
};
