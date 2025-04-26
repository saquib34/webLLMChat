// src/components/UI/Button.jsx
import { forwardRef } from 'react';

const variantStyles = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white',
  secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
  outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizeStyles = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3',
};

export const Button = forwardRef(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    disabled = false, 
    className = '', 
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
          transition-colors duration-200
          ${variantStyles[variant] || variantStyles.primary}
          ${sizeStyles[size] || sizeStyles.md}
          ${fullWidth ? 'w-full' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;