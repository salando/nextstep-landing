
import React, { useEffect, useState } from 'react';
import './BootSequence.css';

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  const sequence = [
    "Initializing kernel...",
    "Loading GIM8108 drivers...",
    "Checking battery clusters (8S)...",
    "Mounting file system...",
    "Calibrating IMU sensors...",
    "Establishing CAN bus link...",
    "System GREEN.",
    "Welcome, User."
  ];

  useEffect(() => {
    let delay = 0;
    sequence.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        // Scroll to bottom
        const el = document.getElementById('boot-log');
        if(el) el.scrollTop = el.scrollHeight;
        
        if (index === sequence.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="boot-overlay">
      <div className="boot-terminal mono">
        <div id="boot-log" className="boot-log">
          {lines.map((line, i) => (
            <div key={i} className="boot-line">
              <span className="prompt">&gt;</span> {line}
            </div>
          ))}
          <div className="cursor-block"></div>
        </div>
        <div className="boot-progress-bar">
          <div className="boot-progress-fill" style={{ width: `${(lines.length / sequence.length) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};
