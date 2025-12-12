import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import './NavBar.css';

const NAV_LINKS = [
    { to: '/', label: 'HOME' },
    { to: '/research', label: 'RESEARCH' },
    { to: '/development', label: 'DEV LOG' },
    { to: '/physical', label: 'PHYSICAL' },
    { to: '/contact', label: 'CONTACT' },
];

export const NavBar = () => {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const navLinksRef = useRef<HTMLDivElement>(null);
    const [activeRect, setActiveRect] = useState({ left: 0, width: 0, opacity: 0 });

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const updatePill = () => {
            if (!navLinksRef.current) return;
            // Use querySelector to find the link with matching data-path
            // We use standard attribute selector to avoid special char issues in path
            const activeLink = navLinksRef.current.querySelector<HTMLAnchorElement>(`[data-path="${pathname}"]`);

            if (activeLink) {
                setActiveRect({
                    left: activeLink.offsetLeft,
                    width: activeLink.offsetWidth,
                    opacity: 1
                });
            } else {
                setActiveRect(prev => ({ ...prev, opacity: 0 }));
            }
        };

        // Run immediately
        updatePill();

        // Run on resize
        window.addEventListener('resize', updatePill);
        return () => window.removeEventListener('resize', updatePill);
    }, [pathname]);

    return (
        <div className="system-nav-container">
            <motion.nav
                className="system-nav"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <Link to="/" className="nav-brand" id="nav-logo-anchor" onClick={closeMenu} style={{ opacity: 0 }}>
                    NEXTSTEP
                </Link>

                {/* Desktop Links */}
                <div className="nav-links" ref={navLinksRef}>
                    {/* Active Pill (Floating) - Manually positioned to ensure horizontal slide */}
                    <motion.div
                        className="nav-pill active-pill"
                        initial={false}
                        animate={{
                            left: activeRect.left,
                            width: activeRect.width,
                            opacity: activeRect.opacity
                        }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        style={{
                            position: 'absolute',
                            height: '100%',
                            top: 0,
                            right: 'auto',
                            bottom: 'auto',
                            zIndex: 0
                        }}
                    />

                    {NAV_LINKS.map(({ to, label }) => {
                        const isActive = pathname === to;
                        return (
                            <Link
                                key={to}
                                to={to}
                                data-path={to}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredPath(to)}
                                onMouseLeave={() => setHoveredPath(null)}
                            >
                                <span style={{ position: 'relative', zIndex: 2 }}>{label}</span>
                                {/* Hover Pill (Ephemeral) */}
                                {hoveredPath === to && !isActive && (
                                    <motion.div
                                        className="nav-pill"
                                        layoutId="nav-pill-hover"
                                        style={{ opacity: 0.1, background: 'var(--color-text-main)' }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="nav-actions">
                    <ThemeToggle />
                    <button
                        className={`mobile-menu-toggle ${isOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            className="hamburger-line"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="hamburger-line"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            className="hamburger-line"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-nav-overlay"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: '80px', /* Below the pill */
                            left: 0,
                            right: 0,
                            background: 'rgba(15, 15, 22, 0.9)',
                            backdropFilter: 'blur(16px)',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                        }}
                    >
                        {NAV_LINKS.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={closeMenu}
                                style={{
                                    textDecoration: 'none',
                                    color: pathname === to ? 'var(--color-primary)' : 'var(--color-text-main)',
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    padding: '0.5rem',
                                }}
                            >
                                {label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
