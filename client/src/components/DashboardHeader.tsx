import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

interface DashboardHeaderProps {
  title: string;
  role: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, role }) => {
  const [userName, setUserName] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  useEffect(() => {
    // Get user info from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setUserName(userData.name || 'User');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUserName('User');
      }
    }
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <span className="ml-4 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
              {role}
            </span>
          </div>
          
          <div className="flex items-center">
            {/* Desktop view */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-gray-700">
                Welcome, <span className="font-semibold">{userName}</span>
              </div>
              <LogoutButton variant="primary" />
            </div>
            
            {/* Mobile view */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Welcome, <span className="font-semibold">{userName}</span>
                  </div>
                  <div className="px-4 py-2">
                    <LogoutButton variant="text" className="w-full justify-start" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 