
// src/components/Chat/ModelSelector.jsx
import { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';

const ModelSelector = () => {
  const { availableModels, currentModel, changeModel, isLoading } = useChat();
  const [isOpen, setIsOpen] = useState(false);

  const handleModelChange = (modelId) => {
    if (modelId !== currentModel) {
      changeModel(modelId);
    }
    setIsOpen(false);
  };

  // Find current model info
  const current = availableModels.find(model => model.id === currentModel);

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Current model:</span>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          >
            <span>{current?.name || 'Select model'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading model...</span>
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
          <div className="py-1">
            {availableModels.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelChange(model.id)}
                className={`w-full text-left px-4 py-3 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  model.id === currentModel ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <span className="font-medium text-gray-900 dark:text-white">{model.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{model.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;