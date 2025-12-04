
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero/Hero';
import { Section } from './components/UI/Section';
import { StatusBoard } from './components/Progress/StatusBoard';
import { Specs } from './components/Specs/Specs';
import { Footer } from './components/Footer/Footer';
import { BootSequence } from './components/Boot/BootSequence';
import './styles/tokens.css';
import './App.css';

function App() {
  const [booted, setBooted] = useState(false);

  // Check if we've already shown the boot sequence this session?
  // Actually, let's just show it every reload for the "wow" factor on the sandbox.
  
  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      
      <main className={`app-wrapper ${booted ? 'visible' : ''}`}>
        {/* Navigation/Header could go here, but Hero covers it */}
        
        <Hero />

        <Section id="overview">
          <div className="section-header">
            <h2 className="section-title">Mission Objective</h2>
            <div className="section-line"></div>
          </div>
          <div className="overview-text">
            <p>
              The <span className="highlight">NextStep Exoskeleton Project</span> is a comprehensive engineering initiative 
              aimed at developing a functional lower-body assistive device. By integrating high-torque brushless motors 
              with advanced sensor arrays, the system creates a responsive support framework for human movement.
            </p>
          </div>
        </Section>

        <Section id="status">
          <div className="section-header">
            <h2 className="section-title">Development Log</h2>
            <div className="section-line"></div>
          </div>
          <StatusBoard />
        </Section>

        <Section id="specs">
          <div className="section-header">
            <h2 className="section-title">System Architecture</h2>
            <div className="section-line"></div>
          </div>
          <Specs />
        </Section>

        <Section id="future">
          <div className="future-banner">
            <h2 className="mono">FUTURE MODULES</h2>
            <p>Adaptive AI Gait Learning & Mobile Companion App</p>
            <span className="status-tag">OPTIONAL</span>
          </div>
        </Section>

        <Footer />
      </main>
    </>
  );
}

export default App;
