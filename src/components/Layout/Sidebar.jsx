// src/components/Layout/Sidebar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../contexts/ChatContext';
import { useUser, useClerk } from '@clerk/clerk-react';
import { PlusIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const navigate = useNavigate();
  const { clearChat } = useChat();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [conversations] = useState([
    // This would normally be populated from your backend
    // For demo purposes, we're using static data
  ]);

  const handleNewChat = () => {
    clearChat();
    navigate('/chat');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <aside className="w-64 hidden lg:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="h-full flex flex-col">
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            New Chat
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {conversations.length > 0 ? (
              conversations.map((conversation) => (
                <a
                  key={conversation.id}
                  href="#"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ChatBubbleLeftRightIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                  <span className="truncate">{conversation.title}</span>
                </a>
              ))
            ) : (
              <div className="px-2 py-6 text-center">
                <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No conversations</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Start a new chat to begin a conversation.
                </p>
              </div>
            )}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            {user && (
              <div className="flex-shrink-0">
                <img className="h-8 w-8 rounded-full" src={user.profileImageUrl} alt="" />
              </div>
            )}
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
          
          <div className="mt-3 space-y-1">
            <button
              onClick={() => navigate('/settings')}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              Settings
            </button>
            <button
              onClick={handleSignOut}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;