// src/pages/Chat.jsx
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import ChatInterface from '../components/Chat/ChatInterface';

const Chat = () => {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    // Set page title
    document.title = 'Chat - WebLLM Chat';
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null; // The router should handle redirecting if not signed in
  }

  return (
    <div className="h-[calc(100vh-16rem)]">
      <ChatInterface />
    </div>
  );
};

export default Chat;
