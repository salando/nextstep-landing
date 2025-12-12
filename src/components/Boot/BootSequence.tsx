import { useEffect, useState, useRef } from 'react';
import './BootSequence.css';

/** Boot sequence line item with message type for styling */
type SequenceItem = { text: string; type: 'info' | 'success' | 'warning' };

/** Simulated boot log messages displayed during startup */
const SEQUENCE_DATA: SequenceItem[] = [
  { text: "Initializing NEXTSTEP kernel...", type: 'info' },
  { text: "Loading GIM8108 driver modules... [OK]", type: 'success' },
  { text: "Verifying 4S LiPo voltage... 16.8V [STABLE]", type: 'success' },
  { text: "Calibrating IMU sensors (BNO055)...", type: 'warning' },
  { text: "System diagnostics: GREEN", type: 'success' },
  { text: "Boot sequence complete. Launching UI...", type: 'info' }
];

/**
 * BootSequence - Terminal-style loading animation on app startup
 * 
 * Displays a simulated system boot log with:
 * - Sequentially appearing log lines with random delays
 * - Color-coded message types (info, success, warning)
 * - Progress bar tracking completion
 * - System status sidebar
 * 
 * The component includes a hidden anchor (#boot-logo-anchor) that GlobalLogo
 * uses as its starting position for the fly-in animation.
 * 
 * @param onComplete - Called when all boot lines have finished displaying
 * @param shouldFadeOut - When true, triggers the exit fade animation
 */
export const BootSequence = ({ onComplete, shouldFadeOut }: { onComplete: () => void, shouldFadeOut: boolean }) => {
  // Store lines with their calculated timestamp to ensure purity during render
  const [lines, setLines] = useState<(SequenceItem & { timestamp: number })[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let delay = 0;
    SEQUENCE_DATA.forEach((item, index) => {
      delay += Math.random() * 100 + 50;
      setTimeout(() => {
        // Calculate timestamp here (side effect), not in render
        const timestamp = Math.floor(Date.now() / 1000) - 10000 + index * 12;
        setLines(prev => [...prev, { ...item, timestamp }]);

        const el = document.getElementById('boot-log');
        if (el) el.scrollTop = el.scrollHeight;

        if (index === SEQUENCE_DATA.length - 1) {
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  const progress = Math.min((lines.length / SEQUENCE_DATA.length) * 100, 100);

  return (
    <div className={`boot-overlay ${shouldFadeOut ? 'exiting' : ''}`}>
      <div className={`boot-container ${shouldFadeOut ? 'fade-out' : ''}`}>
        <div className="boot-header">
          <div className="header-left">
            {/* Anchor for GlobalLogo - Text matches logo for sizing */}
            <span id="boot-logo-anchor" style={{ opacity: 0, fontWeight: 'bold' }}>NEXTSTEP</span>
            <span className="header-suffix"> // BOOT_LOADER</span>
          </div>
        </div>

        <div className="boot-content">
          <div id="boot-log" className="boot-log">
            {lines.map((line, i) => (
              <div key={i} className={`boot-line type-${line.type}`}>
                <span className="timestamp">[{line.timestamp}]</span>
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
            {/* Fix: removed extra space in width string */}
            <div className="boot-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="boot-status-text">LOADING RESOURCES... {Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
};
