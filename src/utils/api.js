// src/utils/api.js
/**
 * Utility functions for API interactions
 * Note: In this app, we're using WebLLM for local processing, 
 * but these utilities could be used if we need to interact with external APIs
 */

/**
 * Generic API request function with error handling
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - Response data
 */
export const apiRequest = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };
  
  /**
   * Fetch available models from a hypothetical catalog API
   * @returns {Promise<Array>} - List of available models
   */
  export const fetchAvailableModels = async () => {
    // In a real app, this might fetch from an actual API
    // For this demo, we're using hardcoded models in ChatContext
    return Promise.resolve([
      { id: 'vicuna-7b-v1.5-16k', name: 'Vicuna 7B', description: 'Fast, compact model for general tasks' },
      { id: 'llama-2-7b-chat', name: 'Llama 2 7B', description: 'Meta\'s language model optimized for chat' },
      { id: 'codellama-7b-instruct', name: 'CodeLlama 7B', description: 'Specialized for code generation' },
    ]);
  };