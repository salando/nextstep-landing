import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="system-nav">
            <div className="nav-brand mono">NEXTSTEP_OS</div>

            <button className={`mobile-menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                <Link
                    to="/"
                    className={`nav-link mono ${location.pathname === '/' ? 'active' : ''}`}
                    onClick={closeMenu}
                >
                    [HOME]
                </Link>
                <Link
                    to="/research"
                    className={`nav-link mono ${location.pathname === '/research' ? 'active' : ''}`}
                    onClick={closeMenu}
                >
                    [RESEARCH]
                </Link>
                <Link
                    to="/development"
                    className={`nav-link mono ${location.pathname === '/development' ? 'active' : ''}`}
                    onClick={closeMenu}
                >
                    [DEV LOG]
                </Link>
                <Link
                    to="/contact"
                    className={`nav-link mono ${location.pathname === '/contact' ? 'active' : ''}`}
                    onClick={closeMenu}
                >
                    [CONTACT]
                </Link>
            </div>
        </nav>
    );
};
