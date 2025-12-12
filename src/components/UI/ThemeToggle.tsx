import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ThemeToggle.css';

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme') as 'light' | 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const transitionRef = useRef<any>(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';

        // Check for View Transition API support
        // @ts-ignore - Document.startViewTransition is experimental
        if (!document.startViewTransition) {
            document.documentElement.classList.add('theme-transition');
            setTheme(nextTheme);
            setTimeout(() => document.documentElement.classList.remove('theme-transition'), 300);
            return;
        }

        // If a transition is already running, skip it and apply the new theme immediately.
        // This ensures rapid clicks feel responsive by jumping to the target state.
        if (transitionRef.current) {
            try {
                transitionRef.current.skipTransition();
            } catch {
                // Ignore errors if transition already finished
            }
            transitionRef.current = null;
        }

        const x = e.clientX;
        const y = e.clientY;

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // @ts-ignore - Document.startViewTransition is experimental
        const transition = document.startViewTransition(() => {
            setTheme(nextTheme);
        });

        transitionRef.current = transition;

        // Cleanup ref when transition finishes (animation ends)
        transition.finished.then(() => {
            if (transitionRef.current === transition) {
                transitionRef.current = null;
            }
        }).catch(() => {
            // Ignore errors from skipped transitions
            transitionRef.current = null;
        });

        // Run animation in background (non-blocking)
        transition.ready.then(() => {
            // Animate the circular clip path
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 400,
                    easing: "ease-in-out",
                    // @ts-ignore - pseudoElement is a valid property for Web Animations Level 2
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        }).catch(() => {
            // Ignore errors from skipped transitions
        });
    };

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
                justifyContent: theme === 'dark' ? 'flex-end' : 'flex-start',
                padding: '4px'
            }}
        >
            <motion.div
                className="toggle-thumb"
                layout
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30
                }}
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={theme}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {theme === 'dark' ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="none"
                                className="toggle-icon moon-icon"
                            >
                                <path d="M21.07 15.34C19.98 19.38 16.32 22.35 12 22.35C6.48 22.35 2 17.87 2 12.35C2 8.03 4.97 4.37 9.01 3.28C8.36 4.96 8.36 6.83 9.01 8.5C9.9 10.79 11.96 12.56 14.5 13.06C16.17 13.4 17.9 13.06 19.36 12.18C19.66 13.3 20.31 14.36 21.07 15.34Z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="toggle-icon sun-icon"
                            >
                                <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                                <path d="M12 2v2" />
                                <path d="M12 20v2" />
                                <path d="m4.93 4.93 1.41 1.41" />
                                <path d="m17.66 17.66 1.41 1.41" />
                                <path d="M2 12h2" />
                                <path d="M20 12h2" />
                                <path d="m6.34 17.66-1.41 1.41" />
                                <path d="m19.07 4.93-1.41 1.41" />
                            </svg>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </button>
    );
};
