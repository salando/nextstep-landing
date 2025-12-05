
import React, { useEffect, useState } from 'react';
import './Hero.css';

export const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-grid-bg"></div>
      <div className={`hero-content ${mounted ? 'enter' : ''}`}>
        <div className="hero-badge mono">GRADE 12 CAPSTONE PROJECT</div>
        <h1 className="hero-title">
          NEXT<span className="highlight">STEP</span>
          <br />
          EXOSKELETON
        </h1>
        <p className="hero-subtitle">
          Redefining human potential. Whether restoring mobility or enhancing performance, NextStep powers your movement to go further.
        </p>

        <div className="hero-stats mono">
          <div className="stat-item">
            <span className="label">STATUS</span>
            <span className="value text-active">IN DEVELOPMENT</span>
          </div>
          <div className="stat-item">
            <span className="label">VOLTAGE</span>
            <span className="value">29.6V (8S)</span>
          </div>
          <div className="stat-item">
            <span className="label">LOGIC</span>
            <span className="value">RPi + CAN</span>
          </div>
        </div>

        <a href="#overview" className="cta-button">
          EXPLORE THE PROJECT
        </a>
      </div>

      {/* Decorative Abstract Tech Ring */}
      <div className="tech-ring-container">
        <div className="tech-ring ring-1"></div>
        <div className="tech-ring ring-2"></div>
        <div className="tech-ring ring-3"></div>
      </div>
    </div>
  );
};
