// src/hooks/useModelManager.js
import { useState, useEffect, useRef } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';

/**
 * Hook to manage multiple models with smart loading strategy:
 * 1. Load smallest model first for quick startup
 * 2. Load larger models in the background
 * 3. Allow switching between models once loaded
 */
export function useModelManager() {
  // Define available models in order of size (smallest to largest)
  // Update your model definitions with the exact IDs from the configuration file
const modelDefinitions = [
    { 
      id: 'SmolLM2-360M-Instruct-q4f16_1-MLC', 
      name: 'SmolLM2 360M (Fastest)', 
      description: 'Ultra-compact model for simple tasks, fastest loading',
      size: 'tiny',
      loaded: false,
      
    },
    { 
      id: 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC', 
      name: 'Qwen2.5 0.5B', 
      description: 'Small but capable model with good performance',
      size: 'small',
      loaded: false
    },
    // { 
    //   id: 'gemma-2-2b-it-q4f16_1-MLC', 
    //   name: 'Gemma 2B', 
    //   description: 'Google\'s lightweight instruction-tuned model',
    //   size: 'medium',
    //   loaded: false
    // },
    // { 
    //   id: 'Phi-3-mini-4k-instruct-q4f16_1-MLC', 
    //   name: 'Phi-3 Mini', 
    //   description: 'Microsoft\'s compact but capable model',
    //   size: 'medium',
    //   loaded: false
    // }
  ];
  // State to track model loading and availability
  const [availableModels, setAvailableModels] = useState(modelDefinitions);
  const [activeModel, setActiveModel] = useState(null);
  const [activeEngine, setActiveEngine] = useState(null);
  const [globalLoadingState, setGlobalLoadingState] = useState({
    isLoading: false,
    currentModel: null,
    progress: 0,
    status: ''
  });
  
  // Keep references to all loaded engines
  const engineRefs = useRef({});
  const loadQueue = useRef([]);
  const isLoadingRef = useRef(false);

  // Initialize loading on component mount
  useEffect(() => {
    startSmartLoading();
    
    return () => {
      // Cleanup engines on unmount
      Object.values(engineRefs.current).forEach(engine => {
        // Cleanup if needed
      });
    };
  }, []);

  const startSmartLoading = async () => {
    // Start with the smallest model (first in the list)
    const smallestModel = availableModels[0];
    
    // Queue up all models for loading, starting with the smallest
    loadQueue.current = [...availableModels.map(model => model.id)];
    
    // Start the loading process
    processLoadQueue();
  };

  const processLoadQueue = async () => {
    if (isLoadingRef.current || loadQueue.current.length === 0) return;
    
    isLoadingRef.current = true;
    const modelId = loadQueue.current[0];
    
    try {
      setGlobalLoadingState({
        isLoading: true,
        currentModel: modelId,
        progress: 0,
        status: 'Starting load...'
      });

      // Create progress callback
      const initProgressCallback = (progress) => {
        setGlobalLoadingState(prevState => ({
          ...prevState,
          progress: Math.round(progress.progress * 100),
          status: progress.text || 'Loading model...'
        }));
      };

      // Load the model
      const engine = await CreateMLCEngine(
        modelId,
        { initProgressCallback }
      );
      
      // Store the loaded engine
      engineRefs.current[modelId] = engine;
      
      // Update available models to show this one is loaded
      setAvailableModels(prev => 
        prev.map(model => 
          model.id === modelId ? { ...model, loaded: true } : model
        )
      );
      
      // If this is the first model, make it active
      if (!activeEngine) {
        setActiveModel(modelId);
        setActiveEngine(engine);
      }
      
      // Remove from queue
      loadQueue.current.shift();
      
      // Reset loading state
      isLoadingRef.current = false;
      
      // If there are more models in the queue, continue loading
      if (loadQueue.current.length > 0) {
        // Start the next model load after a short delay
        setTimeout(() => {
          processLoadQueue();
        }, 500);
      } else {
        setGlobalLoadingState(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    } catch (error) {
      console.error(`Failed to load model ${modelId}:`, error);
      
      // Remove the failed model from the queue
      loadQueue.current.shift();
      
      // Update the model to show it failed loading
      setAvailableModels(prev => 
        prev.map(model => 
          model.id === modelId ? { ...model, loaded: false, error: error.message } : model
        )
      );
      
      // Reset loading state
      isLoadingRef.current = false;
      
      // Continue with other models
      if (loadQueue.current.length > 0) {
        setTimeout(() => {
          processLoadQueue();
        }, 500);
      } else {
        setGlobalLoadingState(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    }
  };

  // Function to switch to another loaded model
  const switchModel = (modelId) => {
    if (!engineRefs.current[modelId]) {
      console.error(`Model ${modelId} is not loaded yet`);
      return false;
    }
    
    setActiveModel(modelId);
    setActiveEngine(engineRefs.current[modelId]);
    return true;
  };

  // Function to check if a specific model is available
  const isModelLoaded = (modelId) => {
    return !!engineRefs.current[modelId];
  };

  // Function to get model loading progress
  const getModelLoadingProgress = (modelId) => {
    if (globalLoadingState.currentModel === modelId) {
      return {
        inProgress: globalLoadingState.isLoading,
        progress: globalLoadingState.progress,
        status: globalLoadingState.status
      };
    }
    
    const model = availableModels.find(m => m.id === modelId);
    
    if (model?.loaded) {
      return { inProgress: false, progress: 100, status: 'Loaded' };
    }
    
    if (loadQueue.current.includes(modelId)) {
      return { inProgress: false, progress: 0, status: 'Queued' };
    }
    
    return { inProgress: false, progress: 0, status: 'Not loaded' };
  };

  // Chat function to use the active engine
  const chat = async (messages, options = {}) => {
    if (!activeEngine) {
      throw new Error('No model is active');
    }

    try {
      return await activeEngine.chat.completions.create({
        messages,
        ...options
      });
    } catch (err) {
      throw new Error(`Chat error: ${err.message}`);
    }
  };

  // Streaming chat function
  const streamChat = async (messages, options = {}) => {
    if (!activeEngine) {
      throw new Error('No model is active');
    }

    try {
      return await activeEngine.chat.completions.create({
        messages,
        stream: true,
        stream_options: { include_usage: true },
        ...options
      });
    } catch (err) {
      throw new Error(`Streaming chat error: ${err.message}`);
    }
  };

  return {
    availableModels,
    activeModel,
    activeEngine,
    isLoading: globalLoadingState.isLoading,
    loadingProgress: globalLoadingState.progress,
    loadingStatus: globalLoadingState.status,
    currentlyLoadingModel: globalLoadingState.currentModel,
    switchModel,
    isModelLoaded,
    getModelLoadingProgress,
    chat,
    streamChat
  };
}