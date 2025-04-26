// src/utils/helpers.js
/**
 * Utility helper functions
 */

/**
 * Format a date object or timestamp into a readable string
 * @param {Date|number|string} date - The date to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    };
    
    try {
      return dateObj.toLocaleDateString(undefined, defaultOptions);
    } catch (error) {
      console.error('Error formatting date:', error);
      return String(date);
    }
  };
  
  /**
   * Truncate a string to a specific length and add ellipsis
   * @param {string} str - The string to truncate
   * @param {number} length - Maximum length
   * @returns {string} - Truncated string
   */
  export const truncateString = (str, length = 50) => {
    if (typeof str !== 'string') return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  };
  
  /**
   * Generate a unique ID
   * @returns {string} - A unique ID
   */
  export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };
  
  /**
   * Debounce a function to prevent excessive calls
   * @param {Function} func - The function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  export const debounce = (func, wait = 300) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };
  
  /**
   * Parse and validate WebLLM model options
   * @param {Object} options - Model options
   * @returns {Object} - Validated options
   */
  export const validateModelOptions = (options) => {
    const defaults = {
      temperature: 0.7,
      maxTokens: 1024,
      topP: 0.95,
    };
    
    return {
      ...defaults,
      ...options,
      // Ensure values are within acceptable ranges
      temperature: Math.max(0, Math.min(options.temperature ?? defaults.temperature, 1)),
      maxTokens: Math.max(1, Math.min(options.maxTokens ?? defaults.maxTokens, 4096)),
      topP: Math.max(0, Math.min(options.topP ?? defaults.topP, 1)),
    };
  };