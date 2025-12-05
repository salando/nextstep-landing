
import { useState } from 'react';
import './Specs.css';

/* Icons as inline SVGs for constraint compliance */
const IconPower = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
);
const IconChip = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
);
const IconMech = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
const IconWifi = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
);

const SECTIONS = [
  {
    id: 'power',
    title: 'Power Systems',
    icon: IconPower,
    items: [
      '2x 4S 5000mAh Li-ion (Split Config)',
      'JBD 7S-14S Li-ion 30A BMS',
      'Buck Converter 32V→5V (Logic)',
      'XT60/XT90 + 30A Safety Fuses'
    ]
  },
  {
    id: 'control',
    title: 'Control Logic',
    icon: IconChip,
    items: [
      'Raspberry Pi 4 (Central Brain)',
      'RS485 CAN HAT Extension',
      'ICM-20948 IMU (9-DOF)',
      'Custom Python Control Loop'
    ]
  },
  {
    id: 'mech',
    title: 'Mechanical',
    icon: IconMech,
    items: [
      'GIM8108-8 Brushless Motors',
      'Carbon Fiber / Alu Frame',
      'Ratchet Fastening System',
      'Adjustable Waist Harness'
    ]
  },
  {
    id: 'coms',
    title: 'Communication',
    icon: IconWifi,
    items: [
      'CAN Bus @ 1Mbps',
      '120Ω Termination Resistors',
      'Twisted Pair (22-24 AWG)',
      'Silicone Shielded Wiring'
    ]
  }
];

export const Specs = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="specs-grid">
      {SECTIONS.map((s) => (
        <div
          key={s.id}
          className={`spec-card ${activeId === s.id ? 'active' : ''}`}
          onMouseEnter={() => setActiveId(s.id)}
          onMouseLeave={() => setActiveId(null)}
        >
          <div className="spec-icon">
            <s.icon />
          </div>
          <h3 className="spec-title">{s.title}</h3>
          <ul className="spec-list">
            {s.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className="card-shine"></div>
        </div>
      ))}
    </div>
  );
};
