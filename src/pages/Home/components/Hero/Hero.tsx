import { motion } from 'framer-motion';
import './Hero.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Faster stagger
      delayChildren: 0.1,   // Reduced initial delay
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8, // Slightly faster duration
      ease: [0.25, 0.1, 0.25, 1] as const, // Apple-like ease
    },
  },
};

export const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-grid-bg"></div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="hero-badge mono">
          GRADE 12 CAPSTONE PROJECT
        </motion.div>

        <motion.h1 variants={itemVariants} className="hero-title">
          NEXT<span className="highlight">STEP</span>
          <br />
          EXOSKELETON
        </motion.h1>

        <motion.p variants={itemVariants} className="hero-subtitle">
          Redefining human potential. Whether restoring mobility or enhancing performance, NextStep powers your movement to go further.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-stats mono">
          <div className="stat-item">
            <span className="label">STATUS</span>
            <span className="value text-active">IN DEVELOPMENT</span>
          </div>
          <div className="stat-item">
            <span className="label">VOLTAGE</span>
            <span className="value">14.8V (4S)</span>
          </div>
          <div className="stat-item">
            <span className="label">LOGIC</span>
            <span className="value">RPi + CAN</span>
          </div>
        </motion.div>

        <motion.a
          variants={itemVariants}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('value-prop')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: 'pointer' }}
        >
          EXPLORE THE PROJECT
        </motion.a>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        onClick={() => document.getElementById('value-prop')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="scroll-text mono">SCROLL</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>

      {/* Decorative Abstract Tech Ring - Animated with Framer */}
      <div className="tech-ring-container">
        <motion.div
          className="tech-ring ring-1"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <motion.div
          className="tech-ring ring-2"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <motion.div
          className="tech-ring ring-3"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </div>
  );
};
