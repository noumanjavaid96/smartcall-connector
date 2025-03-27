
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Campaigns from '@/components/dashboard/Campaigns';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

const CampaignsPage = () => {
  const handleCreateCampaign = () => {
    toast.success("New campaign creation started", {
      description: "You can now fill in the campaign details.",
    });
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Campaigns</h2>
            <Button onClick={handleCreateCampaign} className="gap-1">
              <PlusCircle size={16} />
              New Campaign
            </Button>
          </div>
          <Campaigns />
        </main>
      </div>
    </div>
  );
};

export default CampaignsPage;
