import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface LogoutButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'text';
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  className = '', 
  variant = 'primary' 
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get user info for personalized message
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const userName = user?.name || 'User';
  
  const handleLogout = () => {
    setIsLoading(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      // Clear all authentication data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      
      // Redirect to login page
      navigate('/login');
    }, 500);
  };
  
  // Define button styles based on variant
  let buttonStyle = '';
  
  switch (variant) {
    case 'primary':
      buttonStyle = 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm';
      break;
    case 'secondary':
      buttonStyle = 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-sm';
      break;
    case 'text':
      buttonStyle = 'text-red-600 hover:text-red-800 hover:underline';
      break;
    default:
      buttonStyle = 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm';
  }
  
  return (
    <motion.button
      className={`flex items-center justify-center transition-colors duration-200 ${buttonStyle} ${className}`}
      onClick={handleLogout}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
      )}
      {isLoading ? 'Logging out...' : 'Logout'}
    </motion.button>
  );
};

export default LogoutButton; 