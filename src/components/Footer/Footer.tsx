import { Link } from 'react-router-dom';
import { ThemeToggle } from '../UI/ThemeToggle';
import './Footer.css';

export const Footer = () => (
  <footer className="footer section-padding">
    <div className="container footer-content">
      <div className="footer-column brand-column">
        <h2 className="mono footer-brand-title">NEXTSTEP</h2>
        <p className="text-muted">Empowering movement through robotics.</p>
        <ThemeToggle />
      </div>

      <div className="footer-column">
        <h4>Navigation</h4>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/research">Research</Link></li>
          <li><Link to="/development">Development</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
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
        <p>React 18 / TypeScript / Vite</p>
      </div>
    </div>

    <div className="container copyright mono text-muted">
      <div className="copyright-content">
        <span>SYSTEM_STATUS: ONLINE</span>
        <span>&copy; 2025 NextStep Project</span>
        <span className="footer-credit">Designed & Built by Charlie Shen</span>
      </div>
    </div>
  </footer>
);
