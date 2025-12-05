
import React, { useEffect, useState } from 'react';
import './BootSequence.css';

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [progress, setProgress] = useState(0);
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

    let timeoutId: ReturnType<typeof setTimeout>;

    const typeLine = () => {
      if (currentLineIndex >= sequence.length) {
        setTimeout(onComplete, 800);
        return;
      }

      const currentLine = sequence[currentLineIndex];

      if (currentCharIndex < currentLine.length) {
        // Typing current line
        timeoutId = setTimeout(() => {
          setLines(prev => {
            const newLines = [...prev];
            if (newLines.length === currentLineIndex) {
              newLines.push(currentLine[currentCharIndex]);
            } else {
              newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
            }
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);

          // Update progress based on total characters typed vs total characters in sequence
          // This is a rough approximation for visual progress
          setProgress(p => Math.min(p + 0.5, 100));

        }, Math.random() * 30 + 20); // Typing speed
      } else {
        // Line finished, move to next
        timeoutId = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);

          // Scroll to bottom
          const el = document.getElementById('boot-log');
          if (el) el.scrollTop = el.scrollHeight;
        }, Math.random() * 200 + 100); // Pause between lines
      }
    };

    typeLine();

    return () => clearTimeout(timeoutId);
  }, [currentLineIndex, currentCharIndex, onComplete]);

  // Ensure progress reaches 100% at the end
  useEffect(() => {
    if (currentLineIndex === sequence.length) {
      setProgress(100);
    }
  }, [currentLineIndex]);

  return (
    <div className="boot-overlay">
      <div className="boot-terminal mono">
        <div className="boot-header">
          <div className="boot-title">NEXTSTEP_OS // KERNEL_LOADER_V1.0</div>
          <div className="boot-stats">
            <span>MEM: 4096MB OK</span>
            <span>CPU: 12%</span>
            <span>NET: CONNECTED</span>
          </div>
        </div>

        <div id="boot-log" className="boot-log">
          {lines.map((line, i) => (
            <div key={i} className="boot-line">
              <span className="prompt">&gt;</span> {line}
              {i === currentLineIndex && <span className="cursor-block"></span>}
            </div>
          ))}
        </div>

        <div className="boot-footer">
          <div className="boot-progress-bar">
            <div className="boot-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="boot-progress-text">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
};
