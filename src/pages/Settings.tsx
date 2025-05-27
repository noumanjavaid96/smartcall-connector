
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Eye, EyeOff, Save } from 'lucide-react';

const SettingsPage = () => {
  const [vapiSettings, setVapiSettings] = useState({
    apiKey: localStorage.getItem('vapi-api-key') || '',
    baseUrl: 'https://api.vapi.ai/api',
    enableCallRecording: localStorage.getItem('vapi-call-recording') === 'true',
    enableTranscription: localStorage.getItem('vapi-transcription') === 'true',
  });
  
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSaveVapiSettings = () => {
    if (!vapiSettings.apiKey.trim()) {
      toast.error('API Key is required', {
        description: 'Please enter your VApi API key to continue.'
      });
      return;
    }

    // Store settings in localStorage
    localStorage.setItem('vapi-api-key', vapiSettings.apiKey);
    localStorage.setItem('vapi-call-recording', vapiSettings.enableCallRecording.toString());
    localStorage.setItem('vapi-transcription', vapiSettings.enableTranscription.toString());

    toast.success('VApi settings saved successfully', {
      description: 'Your VApi configuration has been saved and is ready to use.'
    });
    
    console.log('VApi settings saved:', {
      ...vapiSettings,
      apiKey: '***hidden***'
    });
  };

  const handleTestConnection = async () => {
    if (!vapiSettings.apiKey.trim()) {
      toast.error('API Key required', {
        description: 'Please enter your VApi API key first.'
      });
      return;
    }

    try {
      const response = await fetch(`${vapiSettings.baseUrl}/account`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${vapiSettings.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('VApi connection successful', {
          description: 'Successfully connected to VApi services.'
        });
      } else {
        toast.error('VApi connection failed', {
          description: 'Please check your API key and try again.'
        });
      }
    } catch (error) {
      console.error('VApi connection test failed:', error);
      toast.error('Connection test failed', {
        description: 'Unable to connect to VApi services.'
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <h2 className="text-3xl font-bold">Settings</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>VApi Configuration</CardTitle>
              <CardDescription>
                Configure your VApi settings for voice calling functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">VApi API Key</Label>
                <div className="relative">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={vapiSettings.apiKey}
                    onChange={(e) => setVapiSettings({...vapiSettings, apiKey: e.target.value})}
                    placeholder="Enter your VApi API key"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="base-url">Base URL</Label>
                <Input
                  id="base-url"
                  value={vapiSettings.baseUrl}
                  onChange={(e) => setVapiSettings({...vapiSettings, baseUrl: e.target.value})}
                  placeholder="https://api.vapi.ai/api"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="call-recording"
                    checked={vapiSettings.enableCallRecording}
                    onCheckedChange={(checked) => setVapiSettings({...vapiSettings, enableCallRecording: checked})}
                  />
                  <Label htmlFor="call-recording">Enable Call Recording</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="transcription"
                    checked={vapiSettings.enableTranscription}
                    onCheckedChange={(checked) => setVapiSettings({...vapiSettings, enableTranscription: checked})}
                  />
                  <Label htmlFor="transcription">Enable Call Transcription</Label>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleSaveVapiSettings} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Settings
                </Button>
                <Button variant="outline" onClick={handleTestConnection}>
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
