import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
    const location = useLocation();

    return (
        <nav className="system-nav">
            <div className="nav-brand mono">NEXTSTEP_OS</div>
            <div className="nav-links">
                <Link
                    to="/"
                    className={`nav-link mono ${location.pathname === '/' ? 'active' : ''}`}
                >
                    [HOME]
                </Link>
                <Link
                    to="/research"
                    className={`nav-link mono ${location.pathname === '/research' ? 'active' : ''}`}
                >
                    [RESEARCH]
                </Link>
                <Link
                    to="/development"
                    className={`nav-link mono ${location.pathname === '/development' ? 'active' : ''}`}
                >
                    [DEV LOG]
                </Link>
                <Link
                    to="/contact"
                    className={`nav-link mono ${location.pathname === '/contact' ? 'active' : ''}`}
                >
                    [CONTACT]
                </Link>
            </div>
        </nav>
    );
};
