
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/dashboard/StatCard';
import CallFlow from '@/components/dashboard/CallFlow';
import Campaigns from '@/components/dashboard/Campaigns';
import { Phone, Calendar, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const handleViewAllCampaigns = () => {
    navigate('/campaigns');
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Calls Made" 
              value={158} 
              icon={<Phone className="text-primary" />}
              trend={{ value: 12.5, positive: true }}
            />
            <StatCard 
              title="Meetings Scheduled" 
              value={42} 
              icon={<Calendar className="text-primary" />}
              trend={{ value: 8.3, positive: true }}
            />
            <StatCard 
              title="Conversion Rate" 
              value="25%" 
              icon={<PieChart className="text-primary" />}
              trend={{ value: 5.2, positive: false }}
            />
          </div>

          <div className="flex justify-between items-center mt-8 mb-2">
            <h3 className="text-xl font-semibold">Active Campaigns</h3>
            <button 
              onClick={handleViewAllCampaigns}
              className="text-sm text-primary hover:underline"
            >
              View all campaigns
            </button>
          </div>
          <Campaigns />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CallFlow />
            <div className="glass-card p-6">
              <h3 className="text-lg font-medium mb-4">Recent Campaigns</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Dubai Marina Properties</p>
                    <p className="text-sm text-muted-foreground">12 Calls, 3 Meetings</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Toronto Condos</p>
                    <p className="text-sm text-muted-foreground">8 Calls, 2 Meetings</p>
                  </div>
                  <span className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded-full">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
