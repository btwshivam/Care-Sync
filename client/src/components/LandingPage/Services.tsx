import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { FaStethoscope, FaBed, FaRegHospital, FaClipboardCheck } from "react-icons/fa";

const Services = () => {
  const services = [
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
  ];

  return (
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
          {services.map((service, index) => (
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
  );
};

export default Services; 