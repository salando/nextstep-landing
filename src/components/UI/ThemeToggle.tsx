import { useEffect, useState } from 'react';
import './ThemeToggle.css';

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        return savedTheme || 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        // Add transition class to html element
        document.documentElement.classList.add('theme-transition');

        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Remove class after transition completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    };

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <span className="toggle-track">
                <span className={`toggle-thumb ${theme}`} />
            </span>
        </button>
    );
};
