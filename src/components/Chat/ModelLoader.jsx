// src/components/Chat/ModelLoader.jsx
import { useState, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';

const ModelLoader = () => {
  const { 
    availableModels, 
    currentModel, 
    changeModel, 
    modelProgress, 
    isModelLoaded,
    getModelLoadingProgress
  } = useChat();
  const [expanded, setExpanded] = useState(false);

  // For animation effects
  const [activeModelDetails, setActiveModelDetails] = useState({
    name: '',
    progress: 0,
    status: ''
  });

  useEffect(() => {
    // Update active model details for animation
    if (currentModel) {
      const model = availableModels.find(m => m.id === currentModel);
      const progress = getModelLoadingProgress(currentModel);
      
      if (model) {
        setActiveModelDetails({
          name: model.name,
          progress: progress.progress,
          status: progress.status
        });
      }
    }
  }, [currentModel, modelProgress, availableModels, getModelLoadingProgress]);

  const handleModelChange = (modelId) => {
    if (isModelLoaded(modelId)) {
      changeModel(modelId);
    }
    setExpanded(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Model Selection</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {activeModelDetails.name 
              ? `Currently using: ${activeModelDetails.name}` 
              : 'Loading models...'}
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          aria-expanded={expanded}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Current model loading progress */}
      {modelProgress.currentlyLoading && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Loading: {availableModels.find(m => m.id === modelProgress.currentlyLoading)?.name}</span>
            <span>{modelProgress.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${modelProgress.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{modelProgress.status}</p>
        </div>
      )}
      
      {/* Model selection dropdown */}
      {expanded && (
        <div className="mt-4 space-y-3">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Models</h4>
            
            {availableModels.map((model) => {
              const progressInfo = getModelLoadingProgress(model.id);
              const isActive = currentModel === model.id;
              const isLoaded = progressInfo.progress === 100;
              
              return (
                <div 
                  key={model.id}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => isLoaded && handleModelChange(model.id)}
                >
                  <div className="flex justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white flex items-center">
                        {model.name}
                        {isActive && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Active
                          </span>
                        )}
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{model.description}</p>
                    </div>
                    <div className="flex items-center">
                      {progressInfo.progress < 100 ? (
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 relative">
                            <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{progressInfo.progress}%</span>
                        </div>
                      ) : (
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  {progressInfo.progress < 100 && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-in-out" 
                        style={{ width: `${progressInfo.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelLoader;