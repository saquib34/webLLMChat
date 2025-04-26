
// src/components/UI/Card.jsx
const Card = ({ children, className = '', ...props }) => {
    return (
      <div 
        className={`bg-white dark:bg-gray-800 overflow-hidden shadow-md rounded-lg ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className = '', ...props }) => {
    return (
      <div 
        className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children, className = '', ...props }) => {
    return (
      <div 
        className={`px-6 py-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export const CardFooter = ({ children, className = '', ...props }) => {
    return (
      <div 
        className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export default Object.assign(Card, {
    Header: CardHeader,
    Content: CardContent,
    Footer: CardFooter,
  });