
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Calendar, Phone, Users, Clock, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  location: string;
  calls: number;
  meetings: number;
  startDate: string;
  endDate?: string;
}

const campaigns: Campaign[] = [
  { 
    id: '1', 
    name: 'Dubai Marina Properties', 
    status: 'active', 
    location: 'Dubai',
    calls: 12, 
    meetings: 3, 
    startDate: '2023-11-15',
    endDate: '2024-01-15' 
  },
  { 
    id: '2', 
    name: 'Toronto Condos', 
    status: 'completed', 
    location: 'Toronto',
    calls: 8, 
    meetings: 2, 
    startDate: '2023-10-01',
    endDate: '2023-10-30' 
  },
  { 
    id: '3', 
    name: 'Downtown Dubai Apartments', 
    status: 'active', 
    location: 'Dubai',
    calls: 20, 
    meetings: 5, 
    startDate: '2023-12-01' 
  },
  { 
    id: '4', 
    name: 'Vancouver Waterfront', 
    status: 'paused', 
    location: 'Vancouver',
    calls: 15, 
    meetings: 4, 
    startDate: '2023-11-20' 
  },
];

const Campaigns = () => {
  const navigate = useNavigate();

  const handleNewCampaign = () => {
    toast.success("New campaign creation started", {
      description: "You can now fill in the campaign details.",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Dismissed")
      }
    });
    // In a real app, this would navigate to a form or open a modal
    console.log("Creating new campaign");
  };

  const handleCampaignClick = (campaignId: string) => {
    console.log(`Campaign clicked: ${campaignId}`);
    toast.info(`Viewing campaign #${campaignId}`, {
      description: "Loading campaign details...",
    });
    // In a real app, this would navigate to a detailed view
  };

  const handleStatusChange = (campaignId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    toast.success(`Campaign status updated to ${newStatus}`, {
      description: `Campaign #${campaignId} status has been changed.`,
    });
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Active Campaigns</h3>
        <Button size="sm" className="gap-1" onClick={handleNewCampaign}>
          <PlusCircle size={16} />
          New Campaign
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Calls</TableHead>
              <TableHead className="text-right">Meetings</TableHead>
              <TableHead>Timeline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow 
                key={campaign.id} 
                className="hover-scale cursor-pointer" 
                onClick={() => handleCampaignClick(campaign.id)}
              >
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      campaign.status === 'active' ? 'default' : 
                      campaign.status === 'paused' ? 'secondary' : 'outline'
                    }
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(campaign.id, campaign.status);
                    }}
                  >
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{campaign.location}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Phone size={14} className="text-muted-foreground" />
                    {campaign.calls}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Users size={14} className="text-muted-foreground" />
                    {campaign.meetings}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar size={14} className="text-muted-foreground" />
                    <span>
                      {new Date(campaign.startDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                      {campaign.endDate ? ` - ${new Date(campaign.endDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}` : ''}
                    </span>
                    {!campaign.endDate && campaign.status === 'active' && (
                      <div className="flex items-center ml-2 text-xs text-primary">
                        <Clock size={12} className="mr-1" />
                        Ongoing
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Campaigns;
