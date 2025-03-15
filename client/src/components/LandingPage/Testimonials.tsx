import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { FaQuoteLeft, FaUserMd, FaStethoscope, FaRegHospital, FaArrowRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
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
  ];

  return (
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
          {testimonials.map((testimonial, index) => (
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
  );
};

export default Testimonials; 