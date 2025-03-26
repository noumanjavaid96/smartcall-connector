
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

// Sample data for the chart
const data = [
  { name: 'Mon', meetings: 4, calls: 12 },
  { name: 'Tue', meetings: 6, calls: 15 },
  { name: 'Wed', meetings: 8, calls: 18 },
  { name: 'Thu', meetings: 7, calls: 16 },
  { name: 'Fri', meetings: 9, calls: 20 },
  { name: 'Sat', meetings: 5, calls: 14 },
  { name: 'Sun', meetings: 3, calls: 10 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-lg border border-border shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-blue-500">
          <span className="font-medium">Calls:</span> {payload[0].value}
        </p>
        <p className="text-xs text-emerald-500">
          <span className="font-medium">Meetings:</span> {payload[1].value}
        </p>
      </div>
    );
  }

  return null;
};

interface AnalyticsChartProps {
  className?: string;
}

const AnalyticsChart = ({ className }: AnalyticsChartProps) => {
  const [timeframe, setTimeframe] = useState('weekly');
  
  return (
    <div className={cn("glass-card p-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg font-medium">Performance Analytics</h3>
        <div className="flex space-x-1 mt-2 sm:mt-0">
          {['daily', 'weekly', 'monthly'].map((option) => (
            <button
              key={option}
              onClick={() => setTimeframe(option)}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-all",
                timeframe === option 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary hover:bg-secondary/80"
              )}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(16, 185, 129)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="calls" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1}
              fill="url(#colorCalls)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="meetings" 
              stroke="rgb(16, 185, 129)" 
              fillOpacity={1}
              fill="url(#colorMeetings)"
              strokeWidth={2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
          <span className="text-xs">Total Calls</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
          <span className="text-xs">Meetings Scheduled</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
