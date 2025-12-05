
import React, { useEffect, useState } from 'react';
import './BootSequence.css';

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<{ text: string; type: 'info' | 'success' | 'warning' }[]>([]);
  const initialized = React.useRef(false);

  const sequence = [
    { text: "Initializing NEXTSTEP_OS kernel v2.4.0...", type: 'info' },
    { text: "Mounting file system: /dev/nvme0n1...", type: 'info' },
    { text: "Loading GIM8108 driver modules... [OK]", type: 'success' },
    { text: "Verifying 4S LiPo voltage... 16.8V [STABLE]", type: 'success' },
    { text: "Connecting to neural interface bridge...", type: 'info' },
    { text: "Allocating memory for gait analysis... 4096MB", type: 'info' },
    { text: "Calibrating IMU sensors (BNO055)...", type: 'warning' },
    { text: "IMU calibration complete. Drift < 0.01°", type: 'success' },
    { text: "Establishing secure link to exoskeleton...", type: 'info' },
    { text: "System diagnostics: GREEN", type: 'success' },
    { text: "Boot sequence complete. Launching UI...", type: 'info' }
  ];

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let delay = 0;
    sequence.forEach((item, index) => {
      delay += Math.random() * 150 + 50;
      setTimeout(() => {
        // @ts-ignore
        setLines(prev => [...prev, item]);

        const el = document.getElementById('boot-log');
        if (el) el.scrollTop = el.scrollHeight;

        if (index === sequence.length - 1) {
          setTimeout(onComplete, 1000);
        }
      }, delay);
    });
  }, []);

  const progress = Math.min((lines.length / sequence.length) * 100, 100);

  return (
    <div className="boot-overlay">
      <div className="boot-container">
        <div className="boot-header">
          <div className="header-left">NEXTSTEP_OS // BOOT_LOADER</div>
          <div className="header-right">MEM: 64GB // CPU: 12%</div>
        </div>

        <div className="boot-content">
          <div id="boot-log" className="boot-log">
            {lines.map((line, i) => (
              <div key={i} className={`boot-line type-${line.type}`}>
                <span className="timestamp">[{Math.floor(Date.now() / 1000) - 10000 + i * 12}]</span>
                <span className="prompt">&gt;</span>
                {line.text}
              </div>
            ))}
            <div className="cursor-block"></div>
          </div>

          <div className="boot-sidebar">
            <div className="status-item">
              <div className="label">SYSTEM</div>
              <div className="value success">ONLINE</div>
            </div>
            <div className="status-item">
              <div className="label">NETWORK</div>
              <div className="value warning">LOCAL</div>
            </div>
            <div className="status-item">
              <div className="label">BATTERY</div>
              <div className="value">98%</div>
            </div>
          </div>
        </div>

        <div className="boot-footer">
          <div className="boot-progress-bar">
            <div className="boot-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="boot-status-text">LOADING RESOURCES... {Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
};
