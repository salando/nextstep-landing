import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import './NavBar.css';

const NAV_LINKS = [
    { to: '/', label: '[HOME]' },
    { to: '/research', label: '[RESEARCH]' },
    { to: '/development', label: '[DEV LOG]' },
    { to: '/physical', label: '[PHYSICAL]' },
    { to: '/contact', label: '[CONTACT]' },
];

export const NavBar = () => {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="system-nav">
            <div className="nav-brand" id="nav-logo-anchor" style={{ opacity: 0 }}>NEXTSTEP</div>

            <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                {NAV_LINKS.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`nav-link ${pathname === to ? 'active' : ''}`}
                        onClick={closeMenu}
                    >
                        {label}
                    </Link>
                ))}
            </div>

            <div className="nav-actions">
                <ThemeToggle />
                <button className={`mobile-menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu" id="mobile-menu-toggle">
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>
        </nav>
    );
};
