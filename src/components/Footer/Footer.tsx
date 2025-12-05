
import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer section-padding">
      <div className="container footer-content">
        <div className="footer-column brand-column">
          <h2 className="mono" style={{ margin: 0, color: 'var(--color-primary)' }}>NEXTSTEP</h2>
          <p className="text-muted">Empowering movement through robotics.</p>
          <div className="social-links">
            {/* Placeholder for social links if needed later */}
          </div>
        </div>

        <div className="footer-column">
          <h4>Navigation</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/research">Research</a></li>
            <li><a href="/development">Development</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Project</h4>
          <p>Grade 12 Capstone</p>
          <p>Engineering & Robotics</p>
          <p>2024-2025 Cohort</p>
        </div>

        <div className="footer-column">
          <h4>Stack</h4>
          <p>React 18</p>
          <p>TypeScript</p>
          <p>Vite</p>
          <p>CSS Modules</p>
        </div>
      </div>

      <div className="container copyright mono text-muted">
        <div className="copyright-content">
          <span>SYSTEM_STATUS: ONLINE</span>
          <span>&copy; 2025 NextStep Project</span>
          <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>Designed & Built by Charlie Shen</span>
        </div>
      </div>
    </footer>
  );
};
