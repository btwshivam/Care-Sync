import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence} from "framer-motion";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { 
  FaBed, FaClipboardCheck, FaQuoteLeft, 
  FaUserMd, FaRegHospital, FaArrowRight, FaChartLine,
  FaUserCog, FaHeartbeat, FaStethoscope, FaCalendarAlt,
  FaShieldAlt, FaLaptopMedical, FaMobileAlt,
  FaUserNurse, FaAmbulance, FaFileMedical
} from "react-icons/fa";
import { Link } from "react-scroll";
import { useState, useEffect} from "react";

const Landing = () => {
  const hospitals = [
    "AIIMS Delhi",
    "Apollo Hospitals",
    "Fortis Healthcare",
    "Manipal Hospitals",
    "Max Healthcare",
    "Medanta Medicity",
    "Narayana Health",
    "Tata Memorial Hospital",
    "Kokilaben Hospital",
    "Artemis Hospital",
    "Lilavati Hospital Mumbai",
    "Christian Medical College Vellore",
    "Hinduja Hospital Mumbai",
    "KIMS Hyderabad",
    "Ruby Hall Clinic Pune",
    "Jaslok Hospital Mumbai",
    "Sankara Nethralaya Chennai",
    "Sir Ganga Ram Hospital Delhi",
    "Wockhardt Hospitals",
    "Bombay Hospital"
  ];
  
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Theme toggle state
  const [darkMode, setDarkMode] = useState(true);
  
  // Notification state for demo
  const [showNotification, setShowNotification] = useState(false);
  
  // Trigger notification in demo
  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 3000);
    
    return () => clearTimeout(notificationTimer);
  }, []);
  
  // Handle scroll events for navbar styling and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
      
      // Determine active section based on scroll position
      const sections = ["home", "services", "features", "about", "testimonials"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`relative overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Navbar - Enhanced with animation and active states */}
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
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 p-3 rounded-full bg-indigo-600 text-white shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Notification popup */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed top-24 right-8 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-700 w-64"
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
          >
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-3">
                <FaBed className="text-blue-600 dark:text-blue-400 w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">New bed available</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">ICU Ward, Room 305</p>
              </div>
              <button 
                className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                onClick={() => setShowNotification(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-300 transition-colors duration-500">
        {/* Hero Section - Completely redesigned */}
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
                {/* Interactive 3D Dashboard Visualization - Made larger */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-indigo-100 dark:border-indigo-500/20 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 aspect-[16/10]">
                  {/* Animated pulse rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Enhanced background elements */}
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
                    
                    {/* Animated pulse rings */}
                    <div className="absolute w-48 h-48">
                      {[1, 2, 3].map((i) => (
              <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full border-2 border-indigo-400 dark:border-indigo-300"
                          initial={{ opacity: 0.7, scale: 0.8 }}
                          animate={{ 
                            opacity: 0,
                            scale: 2.5,
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3,
                            delay: i * 0.8,
                            ease: "easeOut"
                          }}
                        />
                      ))}
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
                    
                    {/* Orbiting elements */}
                    {[
                      { icon: <FaUserMd className="w-full h-full" />, color: "bg-blue-500 dark:bg-blue-400", size: "w-16 h-16", delay: 0 },
                      { icon: <FaBed className="w-full h-full" />, color: "bg-green-500 dark:bg-green-400", size: "w-14 h-14", delay: 2 },
                      { icon: <FaStethoscope className="w-full h-full" />, color: "bg-purple-500 dark:bg-purple-400", size: "w-12 h-12", delay: 4 },
                      { icon: <FaHeartbeat className="w-full h-full" />, color: "bg-red-500 dark:bg-red-400", size: "w-13 h-13", delay: 6 },
                      { icon: <FaClipboardCheck className="w-full h-full" />, color: "bg-yellow-500 dark:bg-yellow-400", size: "w-15 h-15", delay: 8 }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className={`absolute ${item.size} rounded-full ${item.color} text-white flex items-center justify-center shadow-lg p-3`}
                        initial={{ 
                          x: 0, 
                          y: 0,
                          scale: 0
                        }}
                        animate={{ 
                          x: Math.cos(i * (Math.PI * 2) / 5) * 160,
                          y: Math.sin(i * (Math.PI * 2) / 5) * 160,
                          scale: 1,
                          rotate: [0, 360]
                        }}
                        transition={{
                          type: "spring",
                          damping: 10,
                          stiffness: 20,
                          delay: item.delay * 0.1,
                          rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }
                        }}
                      >
                        {item.icon}
                      </motion.div>
                    ))}
                    
                    {/* New data metrics floating around */}
                    {[
                      { label: "Wait Time", value: "-35%", color: "bg-green-500", icon: <FaChartLine className="w-4 h-4" /> },
                      { label: "Efficiency", value: "+42%", color: "bg-blue-500", icon: <FaUserCog className="w-4 h-4" /> },
                      { label: "Satisfaction", value: "95%", color: "bg-purple-500", icon: <FaHeartbeat className="w-4 h-4" /> }
                    ].map((metric, i) => (
                      <motion.div
                        key={i}
                        className="absolute bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20 shadow-lg flex items-center space-x-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          x: Math.cos((i * Math.PI * 2) / 3 + Math.PI/6) * 200,
                          y: Math.sin((i * Math.PI * 2) / 3 + Math.PI/6) * 120,
                        }}
                        transition={{
                          delay: 0.5 + i * 0.2,
                          duration: 0.5
                        }}
                      >
                        <div className={`${metric.color} rounded-full p-1.5 text-white`}>
                          {metric.icon}
                        </div>
                        <div className="text-white">
                          <div className="text-xs font-medium opacity-80">{metric.label}</div>
                          <div className="text-sm font-bold">{metric.value}</div>
                        </div>
              </motion.div>
                    ))}
            </div>
                  
                  {/* Floating data points - More data points */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full opacity-70"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    />
                  ))}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full z-0">
                    <defs>
                      <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
                        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.2)" />
                        <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
                      </linearGradient>
                      <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.1)" />
                        <stop offset="50%" stopColor="rgba(79, 70, 229, 0.2)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <motion.path
                      d="M 100,100 C 150,50 200,150 250,100 S 350,50 400,100"
                      stroke="url(#lineGradient1)"
                      strokeWidth="3"
                      filter="url(#glow)"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.path
                      d="M 50,200 C 100,150 200,250 250,200 S 350,150 450,200"
                      stroke="url(#lineGradient2)"
                      strokeWidth="3"
                      filter="url(#glow)"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                    />
                    <motion.path
                      d="M 50,150 C 150,50 250,250 350,150"
                      stroke="url(#lineGradient1)"
                      strokeWidth="3"
                      filter="url(#glow)"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 2 }}
                    />
                    <motion.path
                      d="M 200,50 C 300,150 400,100 500,200"
                      stroke="url(#lineGradient2)"
                      strokeWidth="3"
                      filter="url(#glow)"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 3 }}
                    />
                    <motion.path
                      d="M 100,300 C 200,200 300,350 400,250"
                      stroke="url(#lineGradient1)"
                      strokeWidth="3"
                      filter="url(#glow)"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 5.5, repeat: Infinity, repeatType: "reverse", delay: 2.5 }}
                    />
                  </svg>
                  
                  {/* Digital overlay - Enhanced and modernized */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/90 to-transparent h-1/3 backdrop-blur-sm flex items-end">
                    <div className="w-full p-6">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                          <div className="text-sm text-indigo-200 uppercase tracking-wider font-medium">System Online</div>
          </div>
                        <div className="flex space-x-2">
                          {["CPU", "Memory", "Network"].map((metric, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <div className="text-xs text-indigo-300/80 mb-1">{metric}</div>
                              <motion.div 
                                className="h-1.5 w-16 bg-indigo-200/20 rounded-full overflow-hidden"
                              >
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-blue-400 to-indigo-400"
                                  initial={{ width: "20%" }}
                                  animate={{ width: ["30%", "80%", "50%"] }}
                                  transition={{ duration: 8, repeat: Infinity, delay: i * 0.5 }}
                                />
                              </motion.div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="bg-white/5 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                          <div className="text-xs text-indigo-200/80 mb-1">Patient Flow</div>
                          <div className="flex items-baseline">
                            <span className="text-green-400 font-bold mr-1">+12%</span>
                            <span className="text-xs text-indigo-300/70">vs last week</span>
              </div>
              </div>
                        <div className="bg-white/5 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                          <div className="text-xs text-indigo-200/80 mb-1">Resource Usage</div>
                          <div className="flex items-baseline">
                            <span className="text-blue-400 font-bold mr-1">68%</span>
                            <span className="text-xs text-indigo-300/70">optimal</span>
              </div>
              </div>
                        <div className="bg-white/5 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                          <div className="text-xs text-indigo-200/80 mb-1">AI Predictions</div>
                          <div className="flex items-baseline">
                            <span className="text-purple-400 font-bold mr-1">94%</span>
                            <span className="text-xs text-indigo-300/70">accuracy</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3 text-xs text-indigo-300/90 font-medium">
                        {["Processing Data", "AI Optimizing", "Real-time Updates", "Syncing"].map((status, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-1.5 animate-pulse"></div>
                            {status}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Modern Minimal Hospital Ticker */}
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
        </section>

        {/* Services Section - Redesigned with cards and icons */}
        <section id="services" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-100/50 to-transparent dark:from-indigo-900/50 dark:to-transparent"></div>
          <div className="container mx-auto px-6 relative z-10">
            <Fade triggerOnce>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
                <p className="text-xl text-gray-700 dark:text-indigo-300 max-w-2xl mx-auto">
                  Comprehensive solutions designed to transform healthcare delivery and patient experience
              </p>
            </div>
          </Fade>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <FaStethoscope className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
                  title: "OPD Management",
                  description: "Streamline outpatient department operations with intelligent queuing and scheduling"
                },
                {
                  icon: <FaBed className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
                  title: "Bed Management",
                  description: "Real-time tracking and allocation of hospital beds across all departments"
                },
                {
                  icon: <FaRegHospital className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
                  title: "Hospital Recommendation",
                  description: "AI-powered suggestions for optimal hospital selection based on patient needs"
                },
                {
                  icon: <FaClipboardCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
                  title: "Inventory Management",
                  description: "Efficient tracking and management of medical supplies and equipment"
                }
              ].map((service, index) => (
                <Fade key={index} direction="up" cascade triggerOnce delay={index * 100}>
                  <motion.div 
                    className="bg-white dark:bg-indigo-900/30 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-md"
                    whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.1)" }}
                  >
                    <div className="p-4 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl inline-block mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                    <p className="text-gray-700 dark:text-indigo-200">{service.description}</p>
                  </motion.div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features Section - Enhanced with animations and better visuals */}
        <section id="features" className="py-24 relative bg-gray-50 dark:bg-indigo-950">
            <div className="container mx-auto px-6">
            <Fade triggerOnce>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Features</h2>
                <p className="text-xl text-gray-700 dark:text-indigo-300 max-w-2xl mx-auto">
                  Innovative solutions that transform healthcare delivery and patient experience
                </p>
              </div>
            </Fade>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {[
                {
                  icon: <FaHeartbeat className="w-12 h-12 text-pink-500" />,
                  title: "Smart Queuing Models",
                  description: "AI-powered queuing systems that reduce wait times by up to 40% and optimize patient flow throughout the hospital.",
                  color: "from-pink-500 to-red-500"
                },
                {
                  icon: <FaBed className="w-12 h-12 text-blue-500" />,
                  title: "Real-time Bed Availability",
                  description: "Live tracking of bed status across all departments, enabling instant allocation and reducing admission delays.",
                  color: "from-blue-500 to-indigo-500"
                },
                {
                  icon: <FaCalendarAlt className="w-12 h-12 text-green-500" />,
                  title: "Seamless Patient Admissions",
                  description: "Streamlined admission workflows that integrate with existing hospital systems for a frictionless patient experience.",
                  color: "from-green-500 to-emerald-500"
                }
              ].map((feature, index) => (
                <Slide key={index} direction={index % 2 === 0 ? "left" : "right"} triggerOnce delay={index * 100}>
                  <motion.div 
                    className="bg-white dark:bg-indigo-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-100 dark:border-indigo-500/20 h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      y: -10, 
                      boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
                      borderColor: "rgba(99, 102, 241, 0.5)"
                    }}
                  >
                    <div className={`h-2 w-full bg-gradient-to-r ${feature.color}`}></div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="p-4 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl inline-block mb-6">
                        {feature.icon}
                </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-700 dark:text-indigo-200 flex-1">{feature.description}</p>
                      
                      <motion.button 
                        className="mt-6 text-indigo-600 dark:text-indigo-400 font-medium flex items-center group"
                        whileHover={{ x: 5 }}
                      >
                        Learn more 
                        <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </motion.button>
                </div>
                  </motion.div>
                </Slide>
              ))}
              </div>
            
            {/* Stats section */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "95%", label: "Patient Satisfaction" },
                { value: "40%", label: "Reduced Wait Times" },
                { value: "500+", label: "Hospitals" },
                { value: "24/7", label: "Support" }
              ].map((stat, index) => (
                <Fade key={index} direction="up" triggerOnce delay={index * 100}>
                  <div className="text-center p-6 bg-white dark:bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                    <p className="text-gray-700 dark:text-indigo-300">{stat.label}</p>
            </div>
          </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features Section - New section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-indigo-950 dark:to-gray-900"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <Zoom triggerOnce>
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-6">
                  Advanced Capabilities
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Intelligent Healthcare Solutions</h2>
                <p className="text-xl text-gray-700 dark:text-indigo-300 max-w-2xl mx-auto">
                  Our advanced AI algorithms optimize hospital operations and enhance patient care
              </p>
            </div>
            </Zoom>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaLaptopMedical className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
                  title: "AI-Powered Predictions",
                  description: "Forecast patient volumes and resource needs with 94% accuracy using advanced machine learning algorithms."
                },
                {
                  icon: <FaShieldAlt className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
                  title: "Secure Patient Data",
                  description: "End-to-end encryption and compliance with healthcare regulations to protect sensitive patient information."
                },
                {
                  icon: <FaMobileAlt className="w-10 h-10 text-green-600 dark:text-green-400" />,
                  title: "Mobile Accessibility",
                  description: "Access critical information on-the-go with our responsive mobile application for healthcare professionals."
                },
                {
                  icon: <FaUserNurse className="w-10 h-10 text-red-600 dark:text-red-400" />,
                  title: "Staff Optimization",
                  description: "Intelligent scheduling and workload distribution to maximize staff efficiency and minimize burnout."
                },
                {
                  icon: <FaAmbulance className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />,
                  title: "Emergency Response",
                  description: "Rapid resource allocation and coordination during emergencies to save critical time and lives."
                },
                {
                  icon: <FaFileMedical className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
                  title: "Integrated Records",
                  description: "Seamless integration with existing EMR/EHR systems for comprehensive patient history and treatment plans."
                }
              ].map((feature, index) => (
                <Fade key={index} direction="up" triggerOnce delay={index * 100}>
                  <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.1)" }}
                  >
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl inline-block mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </motion.div>
                </Fade>
              ))}
              </div>

            <div className="mt-16 text-center">
              <motion.button
                className="px-8 py-4 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 inline-flex items-center"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                Explore All Features <FaArrowRight className="ml-2" />
              </motion.button>
              </div>
          </div>
        </section>

        {/* About Us Section - Redesigned with more visual elements */}
        <section id="about" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Fade direction="left" triggerOnce>
                <div>
                  <div className="inline-block px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-sm font-medium mb-6">
                    Our Mission
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Transforming Healthcare Through Innovation</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    At CareSync, we're dedicated to revolutionizing healthcare management through cutting-edge technology. Our platform streamlines hospital operations, enhances patient experiences, and optimizes resource allocation.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Founded by healthcare professionals and technology experts, we understand the unique challenges hospitals face and build solutions that make a real difference.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mt-10">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-4">
                        <FaUserMd className="text-purple-600 dark:text-purple-400 w-6 h-6" />
              </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Expert Team</h3>
                        <p className="text-gray-600 dark:text-gray-400">Healthcare professionals and tech experts</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-4">
                        <FaHeartbeat className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Patient-Centered</h3>
                        <p className="text-gray-600 dark:text-gray-400">Designed with patients in mind</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
              
              <Fade direction="right" triggerOnce>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl transform rotate-3 opacity-20 blur-lg"></div>
                  <img 
                    src="/photo.jpg" 
                    alt="Healthcare Team" 
                    className="relative z-10 rounded-2xl shadow-2xl border border-indigo-100 dark:border-purple-500/20 w-full h-auto object-cover"
                  />
                  
                  {/* Floating badge */}
                  <motion.div 
                    className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                        <FaRegHospital className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
              </div>
                      <div>
                        <p className="text-gray-900 dark:text-white font-bold">10+ Years</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Healthcare Experience</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Fade>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Completely redesigned with proper icons */}
        <section id="testimonials" className="py-24 relative bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <Fade triggerOnce>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
                <p className="text-xl text-gray-700 dark:text-indigo-300 max-w-2xl mx-auto">
                  Hear from healthcare professionals who have transformed their operations with CareSync
                </p>
              </div>
            </Fade>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "The seamless integration of the system with our hospital's existing setup was remarkable. The real-time updates make a huge difference.",
                  name: "Dr. Sarah Lee",
                  role: "Chief Medical Officer, City Hospital",
                  icon: <FaUserMd className="w-full h-full text-indigo-600 dark:text-indigo-400" />
                },
                {
                  quote: "Our workflow efficiency has improved drastically with the queuing system. Patient satisfaction has gone through the roof!",
                  name: "Dr. Michael Edwards",
                  role: "Head of Surgery, Green Valley Hospital",
                  icon: <FaStethoscope className="w-full h-full text-indigo-600 dark:text-indigo-400" />
                },
                {
                  quote: "With real-time bed availability updates, managing patient admissions has never been easier or more efficient.",
                  name: "Dr. Emily Carter",
                  role: "Director, Lakeside Medical Center",
                  icon: <FaRegHospital className="w-full h-full text-indigo-600 dark:text-indigo-400" />
                }
              ].map((testimonial, index) => (
                <Fade key={index} direction="up" triggerOnce delay={index * 100}>
                  <motion.div 
                    className="bg-white dark:bg-indigo-900/30 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.1)" }}
                  >
                    <FaQuoteLeft className="w-10 h-10 text-indigo-400 mb-6 opacity-50" />
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 flex-1">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center p-3 border-2 border-indigo-200 dark:border-indigo-700 mr-4">
                        {testimonial.icon}
              </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-indigo-600 dark:text-indigo-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
            </Fade>
              ))}
          </div>

            {/* Testimonial carousel for mobile */}
            <div className="mt-12 lg:hidden">
              {/* Mobile testimonial carousel would go here */}
            </div>
            
            {/* Testimonial CTA */}
            <div className="mt-16 text-center">
              <motion.a
                href="#"
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                whileHover={{ x: 5 }}
              >
                Read more success stories <FaArrowRight className="ml-2" />
              </motion.a>
            </div>
          </div>
        </section>

        {/* Call to Action - Enhanced with gradient and animation */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <Fade triggerOnce>
            <div className="container mx-auto px-6 relative z-10 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Join hundreds of hospitals already using CareSync to revolutionize their operations and patient care.
            </p>
              <motion.button
              onClick={handleLogin}
                className="px-8 py-4 rounded-full bg-white text-indigo-600 font-bold text-lg shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
            >
                Get Started Today
              </motion.button>
          </div>
          </Fade>
        </section>
      </div>

      {/* Footer - Modern redesign with gradient and glass effect */}
      <footer className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-16">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Main footer content - Condensed layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* About and Newsletter combined */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold text-white">
                  Care<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Sync</span>
                </h1>
              </div>
              <p className="text-white/70 leading-relaxed mb-6 max-w-md">
                Revolutionizing healthcare management with intelligent solutions for hospitals and patients across India and beyond.
              </p>
              
              {/* Newsletter */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-white">Stay Updated</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full border border-white/20 placeholder-white/60"
                  />
                  <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-r-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg">
                    Subscribe
                  </button>
                </div>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-3">
                {[
                  { name: 'twitter', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg> },
                  { name: 'facebook', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg> },
                  { name: 'instagram', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                  { name: 'linkedin', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg> }
                ].map((social) => (
                  <a 
                    key={social.name}
                    href="#" 
                    className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <ul className="grid grid-cols-2 gap-2">
                {['Home', 'About Us', 'Services', 'Features', 'Testimonials', 'Contact'].map((link) => (
                  <li key={link}>
                    <Link
                      to={link.toLowerCase().replace(' ', '-')}
                      smooth={true}
                      duration={500}
                      className="text-white/70 hover:text-white transition-colors duration-300 flex items-center group cursor-pointer text-sm"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 mr-0 group-hover:mr-1 transition-all duration-300"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center group text-sm">
                  <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-lg mr-2 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a href="tel:+123456789" className="text-white/70 group-hover:text-white transition-colors duration-300">
                    (123) 456-7890
                  </a>
                </li>
                <li className="flex items-center group text-sm">
                  <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-lg mr-2 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href="mailto:info@caresync.com" className="text-white/70 group-hover:text-white transition-colors duration-300">
                    info@caresync.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-white/60 mb-4 md:mb-0">© {new Date().getFullYear()} <span className="text-white">CareSync</span>. All rights reserved.</p>
            <div>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
