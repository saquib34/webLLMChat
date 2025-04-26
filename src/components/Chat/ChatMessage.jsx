// src/components/Chat/ChatMessage.jsx
import { useUser } from '@clerk/clerk-react';

const ChatMessage = ({ message }) => {
  const { user } = useUser();
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-3/4 sm:max-w-2/3 p-4 rounded-lg ${
        isUser 
          ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200' 
          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
      }`}>
        <div className="flex items-center space-x-2 mb-2">
          {isUser ? (
            <>
              <span className="font-medium text-gray-900 dark:text-white">You</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </>
          ) : (
            <>
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 p-1 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium text-gray-900 dark:text-white">AI Assistant</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </>
          )}
        </div>
        
        {/* Message content */}
        <div className="whitespace-pre-wrap break-words">
          {message.isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          ) : message.isStreaming ? (
            <>
              {message.content}
              <span className="inline-block h-4 w-0.5 ml-1 bg-gray-500 animate-pulse"></span>
            </>
          ) : message.isError ? (
            <div className="text-red-500 dark:text-red-400">{message.content}</div>
          ) : (
            message.content
          )}
        </div>
        
        {/* Usage statistics - only show for assistant messages that have completed */}
        {!isUser && message.usage && !message.isLoading && !message.isStreaming && (
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-2">
              <span>Tokens: {message.usage.total_tokens}</span>
              <span>•</span>
              <span>Prompt: {message.usage.prompt_tokens}</span>
              <span>•</span>
              <span>Completion: {message.usage.completion_tokens}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;