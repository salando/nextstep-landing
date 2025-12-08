import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './GlobalLogo.css';

interface GlobalLogoProps {
    booted: boolean;
    onAnimationComplete?: () => void;
}

export const GlobalLogo: React.FC<GlobalLogoProps> = ({ booted, onAnimationComplete }) => {
    const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 }); // Start hidden
    const [isAnimating, setIsAnimating] = useState(false);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const requestRef = useRef<number | null>(requestAnimationFrame(() => { })); // Initialize with a dummy request ID

    // Function to update position based on active anchor
    const snapToAnchor = (anchorId: string) => {
        const anchor = document.getElementById(anchorId);
        if (!anchor) return;

        const rect = anchor.getBoundingClientRect();
        const computed = window.getComputedStyle(anchor);

        return {
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            letterSpacing: computed.letterSpacing,
            fontFamily: computed.fontFamily,
            color: computed.color,
            lineHeight: computed.lineHeight,
            textTransform: computed.textTransform as React.CSSProperties['textTransform'],
            textShadow: computed.textShadow,
            whiteSpace: 'nowrap', // Ensure single line
            boxSizing: 'border-box' as React.CSSProperties['boxSizing']
        };
    };

    useEffect(() => {
        // Initial State: Locked to boot anchor
        if (!booted && !isAnimating) {
            const updatePosition = () => {
                const newStyle = snapToAnchor('boot-logo-anchor');
                if (newStyle) {
                    setStyle({
                        ...newStyle,
                        position: 'fixed',
                        margin: 0,
                        padding: 0,
                        zIndex: 10005,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'none',
                        opacity: 1 // Make visible once positioned
                    });
                }
                requestRef.current = requestAnimationFrame(updatePosition);
            };

            requestRef.current = requestAnimationFrame(updatePosition);
        }
        // Animation State: Triggered when booted becomes true
        else if (booted && !isAnimating) {
            cancelAnimationFrame(requestRef.current!);

            // Defer state update to avoid sync render warning
            setTimeout(() => setIsAnimating(true), 0);


            // 1. Get current position (should be at boot anchor)
            const startStyle = snapToAnchor('boot-logo-anchor');

            // 2. Get target position (nav anchor)
            const endStyle = snapToAnchor('nav-logo-anchor');

            if (startStyle && endStyle) {
                // Match new speed with staggered font transition
                // Position moves immediately
                // Font properties wait 0.2s before changing, per user request
                const bezier = 'cubic-bezier(0.5, 0, 0.1, 1)';
                const duration = '0.6s';
                const fontDuration = '0.4s'; // Shorter to finish around same time (0.85 - 0.2)
                const fontDelay = '0.5s';

                const transition = `
                    top ${duration} ${bezier}, 
                    left ${duration} ${bezier}, 
                    transform ${duration} ${bezier}, 
                    opacity ${duration} ${bezier},
                    width ${fontDuration} ${bezier} ${fontDelay},
                    height ${fontDuration} ${bezier} ${fontDelay},
                    font-size ${fontDuration} ${bezier} ${fontDelay},
                    letter-spacing ${fontDuration} ${bezier} ${fontDelay},
                    font-weight ${fontDuration} ${bezier} ${fontDelay},
                    line-height ${fontDuration} ${bezier} ${fontDelay}
                `.replace(/\n\s+/g, ' ').trim();

                // Defer start to avoid sync setState in effect
                setTimeout(() => {
                    setIsAnimating(true);

                    // Set initial state with transition
                    setStyle({
                        ...startStyle,
                        position: 'fixed',
                        zIndex: 10005,
                        opacity: 1,
                        transition: transition
                    });

                    // Start animation to end style in next frame
                    requestAnimationFrame(() => {
                        setStyle({
                            ...endStyle,
                            position: 'fixed',
                            zIndex: 10005,
                            opacity: 1,
                            transition: transition
                        });
                    });
                }, 0);

                // Cleanup
                setTimeout(() => {
                    if (onAnimationComplete) onAnimationComplete();
                }, 1000);
            }
        }

        return () => cancelAnimationFrame(requestRef.current!);
    }, [booted, isAnimating, onAnimationComplete]);

    // Keep tracking nav anchor after animation? 
    // User asked to "remove it from the DOM" or "logo should be the same element".
    // If we remove it, the NavBar anchor needs to become visible. 
    // For now let's just keep this GlobalLogo as the permanent logo if desired, 
    // OR as requested: "fade out the splash overlay and remove it from the DOM." - wait, remove splash.
    // "The logo should be the same DOM element that later becomes the header logo". 
    // This implies GlobalLogo IS the header logo now.

    return (
        <Link to="/" ref={logoRef} className="global-logo" style={style}>
            <span style={{ color: 'var(--color-text-main)' }}>NEXT</span>
            <span style={{ color: 'var(--color-primary)' }}>STEP</span>
        </Link>
    );
};
