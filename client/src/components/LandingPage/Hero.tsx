import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaArrowRight, FaRegHospital } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  hospitals: string[];
  darkMode: boolean;
}

const Hero = ({ hospitals, darkMode }: HeroProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center text-gray-900 dark:text-white overflow-hidden pt-20"
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.div 
                className="inline-block px-4 py-1 rounded-full bg-indigo-500 bg-opacity-20 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Next-Gen Healthcare Management
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500">
                  Revolutionizing
                </span>
                <span className="block text-gray-900 dark:text-white mt-2">
                  Patient Care
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
                Streamline hospital operations, enhance patient experience, and optimize resource management with our intelligent healthcare platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleLogin}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started <FaArrowRight className="ml-2" />
              </motion.button>
              
              <Link
                to="features"
                smooth={true}
                duration={800}
                className="px-8 py-4 rounded-full border-2 border-indigo-600 border-opacity-30 dark:border-white dark:border-opacity-30 text-indigo-700 dark:text-white font-bold text-lg hover:bg-indigo-600 hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                Explore Features
              </Link>
            </div>
            
            <div className="pt-8 flex items-center space-x-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900 bg-gradient-to-br from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 opacity-75"></div>
                ))}
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Trusted by <span className="text-indigo-600 dark:text-indigo-400 font-bold">500+</span> hospitals</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Interactive 3D Dashboard Visualization */}
            <DashboardVisualization />
          </motion.div>
        </div>
      </div>
      
      {/* Hospital Ticker */}
      <HospitalTicker hospitals={hospitals} />
    </section>
  );
};

// Dashboard Visualization Component
const DashboardVisualization = () => {
  return (
    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-indigo-100 dark:border-indigo-500/20 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 aspect-[16/10]">
      {/* Content from the original dashboard visualization */}
      {/* This is a simplified version - you can add all the animations and elements from the original */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Central hospital icon */}
        <motion.div 
          className="relative z-10 w-32 h-32 bg-white dark:bg-indigo-800 rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            y: [0, -10, 0],
            rotateZ: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaRegHospital className="w-16 h-16 text-indigo-600 dark:text-indigo-300" />
        </motion.div>
      </div>
      
      {/* Digital overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/90 to-transparent h-1/3 backdrop-blur-sm flex items-end">
        <div className="w-full p-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              <div className="text-sm text-indigo-200 uppercase tracking-wider font-medium">System Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hospital Ticker Component
const HospitalTicker = ({ hospitals }: { hospitals: string[] }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 backdrop-blur-md bg-gradient-to-r from-indigo-600/80 to-purple-600/80 border-t border-white/10 z-10">
      <div className="h-full flex items-center overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-indigo-600/90 to-transparent z-10 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
            <FaRegHospital className="text-white w-4 h-4" />
          </div>
        </div>
        
        <motion.div
          className="flex items-center space-x-6 pl-16"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ 
            duration: 80, 
            repeat: Infinity, 
            ease: "linear"
          }}
        >
          {hospitals.map((hospital, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium text-white whitespace-nowrap">{hospital}</span>
            </div>
          ))}
        </motion.div>
        
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-purple-600/90 to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default Hero; 