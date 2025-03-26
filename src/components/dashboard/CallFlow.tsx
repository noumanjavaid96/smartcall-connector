
import React from 'react';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CallFlowProps {
  className?: string;
}

const CallFlow = ({ className }: CallFlowProps) => {
  const steps = [
    { id: 1, name: "Greeting", description: "Professional introduction" },
    { id: 2, name: "Engagement", description: "Capture attention" },
    { id: 3, name: "Property", description: "Present key features" },
    { id: 4, name: "Meeting", description: "Schedule appointment" },
    { id: 5, name: "Follow-up", description: "Confirm and close" },
  ];

  return (
    <div className={cn("glass-card p-6", className)}>
      <h3 className="text-lg font-medium mb-6">Call Flow</h3>
      
      <div className="flex flex-col space-y-6">
        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-border"></div>
          {steps.map((step, index) => (
            <div key={step.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 bg-primary rounded-full h-12 w-12 flex items-center justify-center text-primary-foreground z-10">
                  {step.id}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-base font-medium">{step.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="text-muted-foreground h-5 w-5 mt-4" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-2 mr-3">
              <CheckCircle className="text-green-500 h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Success Rate</p>
              <p className="text-lg font-semibold">68%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-2 mr-3">
              <XCircle className="text-red-500 h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Drop-off Rate</p>
              <p className="text-lg font-semibold">32%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallFlow;
