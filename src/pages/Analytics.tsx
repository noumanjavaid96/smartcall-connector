
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <h2 className="text-3xl font-bold">Analytics</h2>
          <div className="glass-card p-6">
            <p>Analytics dashboard coming soon.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
