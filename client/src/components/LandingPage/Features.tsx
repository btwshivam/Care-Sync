import { motion } from "framer-motion";
import { Fade, Slide } from "react-awesome-reveal";
import { FaHeartbeat, FaBed, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const Features = () => {
  const coreFeatures = [
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
  ];

  const stats = [
    { value: "95%", label: "Patient Satisfaction" },
    { value: "40%", label: "Reduced Wait Times" },
    { value: "500+", label: "Hospitals" },
    { value: "24/7", label: "Support" }
  ];

  return (
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
          {coreFeatures.map((feature, index) => (
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
          {stats.map((stat, index) => (
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
  );
};

export default Features; 