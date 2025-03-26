
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  className 
}: StatCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 animate-scale-in hover-scale", 
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {trend && (
              <span className={cn(
                "ml-2 text-xs font-medium",
                trend.positive ? "text-green-500" : "text-red-500"
              )}>
                {trend.positive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {icon && <div className="p-2 rounded-full bg-secondary">{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;
