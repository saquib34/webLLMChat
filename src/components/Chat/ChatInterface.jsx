// src/components/Chat/ChatInterface.jsx
import { useState, useRef, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useChat } from '../../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import ModelLoader from './ModelLoader';
import { PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/outline';

const ChatInterface = () => {
  const { user } = useUser();
  const { 
    messages, 
    sendMessageStream, 
    isLoading, 
    clearChat,
    currentModel,
    availableModels,
    modelProgress,
    isModelLoaded
  } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [loadingFirstModel, setLoadingFirstModel] = useState(true);

  // Check if any model is available for use
  useEffect(() => {
    console.log("Model loading state:", { 
        currentModel, 
        isModelLoaded: isModelLoaded(currentModel),
        loadingFirstModel, 
        modelProgress 
      });
    if (currentModel && isModelLoaded(currentModel)) {
      setLoadingFirstModel(false);
    } else if (!modelProgress.currentlyLoading) {
      // No more models loading but none are available
      setLoadingFirstModel(false);
    }
  }, [currentModel, isModelLoaded, modelProgress]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !loadingFirstModel) {
      sendMessageStream(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Model loader component */}
      <ModelLoader />
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        {loadingFirstModel ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
            <div className="w-16 h-16 mb-4 relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-xl font-medium mb-2">Loading AI Model</h3>
            <p className="max-w-md">
              {modelProgress.currentlyLoading ? (
                <>
                  <span className="block font-medium">
                    {modelProgress.progress}% - {modelProgress.status}
                  </span>
                  <span className="block mt-2">
                    We're loading the smallest model first so you can start chatting quickly.
                    More capable models will load in the background.
                  </span>
                </>
              ) : (
                "Preparing your AI assistant..."
              )}
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
            <div className="w-24 h-24 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Start a new conversation</h3>
            <p className="max-w-md">
              Ask anything and get intelligent responses. You're currently using the{' '}
              <span className="font-medium">{currentModel ? availableModels.find(m => m.id === currentModel)?.name : 'default'}</span> model.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input form */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 rounded-lg mt-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <button
            type="button"
            onClick={clearChat}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
            title="Clear chat"
            disabled={isLoading || messages.length === 0 || loadingFirstModel}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={loadingFirstModel ? "Loading AI model..." : "Type your message..."}
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || loadingFirstModel}
          />
          
          <button
            type="submit"
            className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!input.trim() || isLoading || loadingFirstModel}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
        
        {isLoading && (
          <div className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            <div className="flex justify-center items-center space-x-2">
              <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating response...</span>
            </div>
          </div>
        )}
        
        {loadingFirstModel && (
          <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
            The first model is being loaded so you can start chatting. Larger models will continue loading in the background.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;