
import React, { useEffect, useState } from 'react';
import './BootSequence.css';

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const initialized = React.useRef(false);

  const sequence = [
    "Initializing kernel...",
    "Loading GIM8108 drivers...",
    "Checking battery clusters (4S)...",
    "Accessing development logs...",
    "Calculating total uptime... [120+ HOURS LOGGED]",
    "Calibrating IMU sensors...",
    "System GREEN.",
    "Welcome, User."
  ];

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let delay = 0;
    sequence.forEach((line, index) => {
      delay += Math.random() * 90 + 110;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        // Scroll to bottom
        const el = document.getElementById('boot-log');
        if (el) el.scrollTop = el.scrollHeight;

        if (index === sequence.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, []);

  const progress = Math.min((lines.length / sequence.length) * 100, 100);

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
          <div className="boot-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};
