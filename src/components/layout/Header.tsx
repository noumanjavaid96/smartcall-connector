
import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-background border-b border-border sticky top-0 z-40 animate-fade-in shadow-subtle">
      <div className="flex items-center">
        <h1 className="text-2xl font-display font-semibold text-foreground">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            WhytCall
          </span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary animate-ping-slow"></span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-medium">
            A
          </div>
          <span className="font-medium text-sm hidden sm:inline-block">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
