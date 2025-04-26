// src/hooks/useWebLLM.js
import { useState, useEffect } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';

export function useWebLLM(modelId) {
  const [engine, setEngine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ status: '', percent: 0 });

  const initialize = async (modelIdentifier) => {
    try {
      setLoading(true);
      setError(null);
      setProgress({ status: 'Initializing...', percent: 0 });

      // Create progress callback
      const initProgressCallback = (progress) => {
        setProgress({
          status: progress.text || 'Loading model...',
          percent: Math.round(progress.progress * 100)
        });
      };

      // Create and initialize the engine
      const mlcEngine = await CreateMLCEngine(
        modelIdentifier,
        { initProgressCallback }
      );

      setEngine(mlcEngine);
      setLoading(false);
      return mlcEngine;
    } catch (err) {
      console.error('Failed to initialize WebLLM:', err);
      setError(err.message || 'Failed to load the model');
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    if (modelId) {
      initialize(modelId);
    }
    
    return () => {
      // Cleanup if needed
    };
  }, [modelId]);

  const chat = async (messages, options = {}) => {
    if (!engine) {
      throw new Error('Engine not initialized');
    }

    try {
      // Use the OpenAI-compatible interface
      return await engine.chat.completions.create({
        messages,
        ...options
      });
    } catch (err) {
      throw new Error(`Chat error: ${err.message}`);
    }
  };

  const streamChat = async (messages, options = {}) => {
    if (!engine) {
      throw new Error('Engine not initialized');
    }

    try {
      // Use the OpenAI-compatible streaming interface
      return await engine.chat.completions.create({
        messages,
        stream: true,
        stream_options: { include_usage: true },
        ...options
      });
    } catch (err) {
      throw new Error(`Streaming chat error: ${err.message}`);
    }
  };

  const getAvailableModels = () => {
    // These models are from the documentation as examples
    return [
      { id: 'Llama-3.1-8B-Instruct-q4f32_1-MLC', name: 'Llama 3.1 8B', description: 'Meta\'s latest language model optimized for chat' },
      { id: 'Phi-3-mini-4k-instruct-q4f32_1-MLC', name: 'Phi-3 Mini', description: 'Microsoft\'s compact and efficient model' },
      { id: 'Gemma-1.1-2B-it-q4f32_1-MLC', name: 'Gemma 2B', description: 'Google\'s lightweight instruction-tuned model' },
      { id: 'Mistral-7B-Instruct-v0.3-q4f32_1-MLC', name: 'Mistral 7B', description: 'High performance open-source model' },
    ];
  };

  return {
    engine,
    loading,
    error,
    progress,
    chat,
    streamChat,
    initialize,
    getAvailableModels,
  };
}