import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import './GlobalLogo.css';

interface GlobalLogoProps {
    booted: boolean;
    onAnimationComplete?: () => void;
    shouldHide?: boolean;
}

/**
 * GlobalLogo - Animated logo component that transitions from boot screen to navbar
 * 
 * This component renders the NEXTSTEP logo and handles the animation sequence:
 * 1. Initially locks to the boot screen anchor position
 * 2. When `booted` becomes true, animates to the navbar anchor position
 * 3. After animation completes, stays synced with navbar anchor on resize
 * 
 * The logo uses CSS gradients for styling (defined in GlobalLogo.css)
 * - "NEXT" uses a radial gradient (white to gray)
 * - "STEP" uses a linear gradient (cyan to blue)
 */
export const GlobalLogo: React.FC<GlobalLogoProps> = ({ booted, onAnimationComplete, shouldHide }) => {
    const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const requestRef = useRef<number | null>(requestAnimationFrame(() => { }));


    // Function to update position based on active anchor
    const snapToAnchor = useCallback((anchorId: string) => {
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
    }, []);

    useLayoutEffect(() => {
        // Animation State: Triggered when booted becomes true
        // NOTE: During the boot phase (!booted), this component relies on the static
        // logo inside BootSequence to be visible. We don't render or track position
        // until we are ready to fly out, avoiding scroll jitter/desync issues.
        if (booted && !isAnimating) {
            cancelAnimationFrame(requestRef.current!);

            setIsAnimating(true);

            // 1. Get current position (use last known good position to avoid jump from BootSequence exit transform)
            // Since we don't track during boot anymore, we grab the layout snapshot RIGHT NOW.
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

                // Set initial state with transition
                setStyle({
                    ...startStyle,
                    position: 'fixed',
                    zIndex: 10000,
                    opacity: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0,
                    transition: transition
                });

                // Start animation to end style in next frame
                requestAnimationFrame(() => {
                    setStyle({
                        ...endStyle,
                        position: 'fixed',
                        zIndex: 10000,
                        opacity: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0,
                        transition: transition
                    });
                });

                // Cleanup - mark animation complete and enable pointer events
                setTimeout(() => {
                    setAnimationComplete(true);
                    setStyle(prev => ({
                        ...prev,
                        zIndex: 1001,
                        pointerEvents: 'auto',
                        transition: 'none' // Disable transition for resize updates
                    }));
                    if (onAnimationComplete) onAnimationComplete();
                }, 1000);
            }
        }

        return () => cancelAnimationFrame(requestRef.current!);
    }, [booted, isAnimating, onAnimationComplete, snapToAnchor]);

    // Resize and scroll handler: Keep logo synced with nav anchor after animation completes
    useEffect(() => {
        if (!animationComplete) return;

        const updatePosition = () => {
            const newStyle = snapToAnchor('nav-logo-anchor');
            if (newStyle) {
                setStyle(prev => ({
                    ...prev,
                    ...newStyle,
                    transition: 'none' // Instant update
                }));
            }
        };

        // Throttle scroll updates for performance
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updatePosition();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [animationComplete, snapToAnchor]);


    if (shouldHide) return null;

    return (
        <Link to="/" ref={logoRef} className="global-logo" style={style}>
            <span className="logo-next">NEXT</span><span className="logo-step">STEP</span>
        </Link>
    );
};
