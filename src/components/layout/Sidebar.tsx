
import React, { useState } from 'react';
import { Home, Phone, Calendar, PieChart, Settings, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const MenuItem = ({ 
  icon: Icon, 
  label, 
  to,
  active = false, 
  collapsed = false 
}: { 
  icon: React.ElementType; 
  label: string; 
  to: string;
  active?: boolean; 
  collapsed?: boolean 
}) => {
  return (
    <li>
      <Link 
        to={to}
        className={cn(
          "flex items-center px-3 py-3 rounded-xl transition-all group",
          active ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
        )}
      >
        <Icon className={cn("h-5 w-5", active ? "" : "text-muted-foreground group-hover:text-foreground")} />
        {!collapsed && (
          <span className={cn("ml-3 text-sm font-medium transition-opacity duration-300", collapsed ? "opacity-0" : "opacity-100")}>
            {label}
          </span>
        )}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div 
      className={cn(
        "h-screen sticky top-0 flex flex-col bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex-1 flex flex-col py-5 px-3 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-8 px-2">
          {!collapsed && <h2 className="text-lg font-semibold">AI Call Center</h2>}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="p-1 rounded-full hover:bg-secondary transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
        
        <nav>
          <ul className="space-y-1">
            <MenuItem icon={Home} label="Dashboard" to="/" active collapsed={collapsed} />
            <MenuItem icon={Phone} label="Campaigns" to="/campaigns" collapsed={collapsed} />
            <MenuItem icon={Calendar} label="Meetings" to="/meetings" collapsed={collapsed} />
            <MenuItem icon={PieChart} label="Analytics" to="/analytics" collapsed={collapsed} />
            <MenuItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed} />
          </ul>
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
        <div className={cn("glass-card p-3 flex items-center transition-all", collapsed ? "justify-center" : "")}>
          {collapsed ? (
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
              P
            </div>
          ) : (
            <>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
                P
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium">Premium Plan</p>
                <p className="text-xs text-muted-foreground">5 days left</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
