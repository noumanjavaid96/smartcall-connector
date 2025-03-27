
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, User, Building, Check, X } from 'lucide-react';
import { toast } from "sonner";

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([
    { id: '1', title: 'Client Introduction', prospect: 'John Smith', company: 'ABC Corp', date: '2025-04-02', time: '09:30 AM', status: 'Scheduled' },
    { id: '2', title: 'Property Showcase', prospect: 'Sarah Johnson', company: 'XYZ Industries', date: '2025-04-03', time: '11:00 AM', status: 'Scheduled' },
    { id: '3', title: 'Contract Discussion', prospect: 'Robert Lee', company: 'Global Ventures', date: '2025-04-05', time: '02:00 PM', status: 'Confirmed' },
    { id: '4', title: 'Follow-up Meeting', prospect: 'Emily Chen', company: 'Tech Solutions', date: '2025-04-08', time: '10:15 AM', status: 'Pending' },
  ]);

  const handleCreateMeeting = () => {
    toast.success("New meeting creation started", {
      description: "You can now schedule your meeting.",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Dismissed")
      }
    });
  };

  const handleMeetingClick = (meetingId: string) => {
    console.log(`Meeting clicked: ${meetingId}`);
    toast.info(`Viewing meeting #${meetingId}`, {
      description: "Loading meeting details...",
    });
  };

  const handleStatusChange = (meetingId: string, newStatus: string) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId ? {...meeting, status: newStatus} : meeting
    ));
    toast.success(`Meeting status updated to ${newStatus}`, {
      description: "The change has been saved successfully."
    });
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Meetings</h2>
            <Button onClick={handleCreateMeeting} className="gap-1">
              <PlusCircle size={16} />
              New Meeting
            </Button>
          </div>
          
          <div className="glass-card p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-sm">
                    <th className="text-left font-medium p-2">Title</th>
                    <th className="text-left font-medium p-2">Prospect</th>
                    <th className="text-left font-medium p-2">Company</th>
                    <th className="text-left font-medium p-2">Date & Time</th>
                    <th className="text-left font-medium p-2">Status</th>
                    <th className="text-left font-medium p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings.map((meeting) => (
                    <tr
                      key={meeting.id}
                      className="border-b border-border hover:bg-secondary/30 cursor-pointer transition-colors"
                      onClick={() => handleMeetingClick(meeting.id)}
                    >
                      <td className="p-2 flex items-center gap-2">
                        <Calendar className="text-primary h-4 w-4" />
                        {meeting.title}
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <User className="text-muted-foreground h-4 w-4" />
                          {meeting.prospect}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Building className="text-muted-foreground h-4 w-4" />
                          {meeting.company}
                        </div>
                      </td>
                      <td className="p-2">{meeting.date} <span className="text-muted-foreground">{meeting.time}</span></td>
                      <td className="p-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          meeting.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                          meeting.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {meeting.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-green-600" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(meeting.id, 'Confirmed');
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-600" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(meeting.id, 'Cancelled');
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MeetingsPage;
