import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isScrolled: boolean;
  activeSection: string;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Navbar = ({ isScrolled, activeSection, darkMode, setDarkMode }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className={`fixed w-full py-4 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white shadow-md text-gray-800 dark:bg-gray-900 dark:text-white" 
        : "bg-transparent text-gray-800 dark:text-white"
    }`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <motion.h1 
          className={`text-3xl font-bold ${
            isScrolled 
              ? "text-indigo-600 dark:text-indigo-400" 
              : darkMode ? "text-white" : "text-indigo-900"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          CareSync
        </motion.h1>
        
        <ul className="hidden md:flex space-x-8">
          {["home", "services", "features", "about", "testimonials"].map((section) => (
            <li key={section}>
              <Link
                to={section}
                spy={true}
                smooth={true}
                duration={500}
                className={`cursor-pointer font-medium text-base transition-all duration-300 relative ${
                  activeSection === section 
                    ? isScrolled 
                      ? "text-indigo-600 dark:text-indigo-400" 
                      : darkMode 
                        ? "text-white font-bold" 
                        : "text-indigo-900 font-bold"
                    : isScrolled 
                      ? "text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400" 
                      : darkMode 
                        ? "text-gray-200 hover:text-white" 
                        : "text-gray-700 hover:text-indigo-900"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {activeSection === section && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 dark:bg-indigo-400"
                    layoutId="activeSection"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center space-x-4">
          {/* Theme toggle button */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              isScrolled 
                ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white" 
                : "bg-white/20 backdrop-blur-sm text-gray-800 dark:text-white"
            } shadow-md`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </motion.button>
          
          <motion.button
            onClick={handleLogin}
            className={`hidden md:block px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              isScrolled 
                ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600" 
                : darkMode 
                  ? "bg-white text-indigo-600 hover:bg-gray-100" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className={`p-2 rounded-md ${
            isScrolled 
              ? "text-gray-800 dark:text-white" 
              : darkMode ? "text-white" : "text-gray-800"
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 