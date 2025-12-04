
import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer section-padding">
      <div className="container footer-content">
        <div className="footer-left">
          <h2 className="mono" style={{margin: 0, color: 'var(--color-primary)'}}>NEXTSTEP</h2>
          <p className="text-muted">Empowering movement through robotics.</p>
        </div>
        <div className="footer-right">
          <div className="footer-block">
            <h4>Student Project</h4>
            <p>Grade 12 Capstone</p>
            <p>Engineering & Robotics</p>
          </div>
          <div className="footer-block">
            <h4>Stack</h4>
            <p>React 18</p>
            <p>Typescript</p>
            <p>CSS Modules</p>
          </div>
        </div>
      </div>
      <div className="container copyright mono text-muted">
        SYSTEM_STATUS: ONLINE // 2023-2024
      </div>
    </footer>
  );
};
