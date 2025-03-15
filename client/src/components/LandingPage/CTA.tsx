import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
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
  );
};

export default CTA; 