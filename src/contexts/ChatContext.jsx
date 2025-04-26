// src/contexts/ChatContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useModelManager } from '../hooks/useModelManager';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const { isSignedIn } = useAuth();
  const {
    availableModels,
    activeModel,
    isLoading,
    loadingProgress,
    loadingStatus,
    currentlyLoadingModel,
    switchModel,
    isModelLoaded,
    getModelLoadingProgress,
    chat,
    streamChat
  } = useModelManager();

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Send a message and get a regular (non-streaming) response
  const sendMessage = async (content) => {
    if (!content.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      setError(null);
      
      // Create a temporary loading message
      const tempId = (Date.now() + 1).toString();
      const loadingMessage = {
        id: tempId,
        role: 'assistant',
        content: '...',
        isLoading: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, loadingMessage]);
      
      // Format messages for the API
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));
      
      formattedMessages.push({ role: 'user', content });
      
      // Send the message to the model
      const response = await chat(formattedMessages, {
        temperature: 0.7,
        max_tokens: 1024,
      });
      
      // Update the temporary message with the actual response
      const assistantMessage = {
        id: tempId,
        role: 'assistant',
        content: response.choices[0].message.content,
        isLoading: false,
        timestamp: new Date(),
        usage: response.usage,
      };
      
      setMessages(prev => 
        prev.map(msg => msg.id === tempId ? assistantMessage : msg)
      );
      
      return assistantMessage;
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to get a response. Please try again.');
      
      // Update the temporary message to show the error
      setMessages(prev => 
        prev.map(msg => 
          msg.isLoading ? { 
            ...msg, 
            content: 'Sorry, an error occurred while generating a response.', 
            isLoading: false,
            isError: true 
          } : msg
        )
      );
      
      return null;
    }
  };

  // Send a message and get a streaming response
  const sendMessageStream = async (content) => {
    if (!content.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      setError(null);
      
      // Create a temporary message for streaming
      const tempId = (Date.now() + 1).toString();
      const tempAssistantMessage = {
        id: tempId,
        role: 'assistant',
        content: '',
        isStreaming: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, tempAssistantMessage]);
      
      // Format messages for the API
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));
      
      formattedMessages.push({ role: 'user', content });
      
      // Use streaming API
      const stream = await streamChat(formattedMessages, {
        temperature: 0.7,
        max_tokens: 1024,
      });
      
      let fullContent = '';
      let usage = null;
      
      // Process the streaming response
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta.content || '';
        fullContent += content;
        
        if (chunk.usage) {
          usage = chunk.usage;
        }
        
        // Update the temporary message with the accumulated content
        setMessages(prev => 
          prev.map(msg => 
            msg.id === tempId 
              ? { ...msg, content: fullContent } 
              : msg
          )
        );
      }
      
      // Final update to mark streaming as complete
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempId 
            ? { 
                ...msg, 
                content: fullContent, 
                isStreaming: false,
                usage
              } 
            : msg
        )
      );
      
      return tempId;
    } catch (err) {
      console.error('Error streaming message:', err);
      setError('Failed to get a streaming response. Please try again.');
      
      // Update the temporary message to show the error
      setMessages(prev => 
        prev.map(msg => 
          msg.isStreaming ? { 
            ...msg, 
            content: 'Sorry, an error occurred while generating a response.', 
            isStreaming: false,
            isError: true 
          } : msg
        )
      );
      
      return null;
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const value = {
    messages,
    isLoading,
    error,
    currentModel: activeModel,
    availableModels,
    modelProgress: {
      currentlyLoading: currentlyLoadingModel,
      progress: loadingProgress,
      status: loadingStatus
    },
    isModelLoaded,
    getModelLoadingProgress,
    sendMessage,
    sendMessageStream,
    clearChat,
    changeModel: switchModel,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};