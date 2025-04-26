// src/pages/Settings.jsx
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Switch } from '@headlessui/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Settings = () => {
  const { user, isLoaded } = useUser();
  const [autoDownload, setAutoDownload] = useLocalStorage('autoDownload', false);
  const [messageHistory, setMessageHistory] = useLocalStorage('messageHistory', true);
  const [notifications, setNotifications] = useLocalStorage('notifications', true);
  const [isSaving, setIsSaving] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
      
      <div className="space-y-6">
        <Card>
          <Card.Header>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Account Information
            </h2>
          </Card.Header>
          <Card.Content>
            {user && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="h-20 w-20 rounded-full"
                  />
                  <div className="ml-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm">
                    Manage Account
                  </Button>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Header>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Chat Settings
            </h2>
          </Card.Header>
          <Card.Content>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Auto-download model
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automatically download models when switching
                  </p>
                </div>
                <Switch
                  checked={autoDownload}
                  onChange={setAutoDownload}
                  className={`${
                    autoDownload ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      autoDownload ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Save message history
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Store conversations locally on your device
                  </p>
                </div>
                <Switch
                  checked={messageHistory}
                  onChange={setMessageHistory}
                  className={`${
                    messageHistory ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      messageHistory ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Browser notifications
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications when responses are ready
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onChange={setNotifications}
                  className={`${
                    notifications ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <div className="flex justify-end">
              <Button 
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card.Footer>
        </Card>
        
        <Card>
          <Card.Header>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Data & Privacy
            </h2>
          </Card.Header>
          <Card.Content>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              WebLLM Chat runs entirely in your browser. Your conversations are processed locally and never sent to a server.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                Clear All Data
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This will delete all saved models, conversations, and settings from your device.
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Settings;