import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBed } from "react-icons/fa";

// Import all the components
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import Features from "./Features";
import About from "./About";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Footer from "./Footer";

const LandingPage = () => {
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
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`relative overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <Navbar 
        isScrolled={isScrolled} 
        activeSection={activeSection} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
      
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
        {/* Hero Section */}
        <Hero hospitals={hospitals} darkMode={darkMode} />

        {/* Services Section */}
        <Services />

        {/* Features Section */}
        <Features />

        {/* About Section */}
        <About />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Call to Action Section */}
        <CTA />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage; 