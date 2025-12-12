import { useRef } from 'react';
import { motion, useInView, useAnimation, type Variant } from 'framer-motion';
import { useEffect } from 'react';

/** Props for the Reveal scroll animation component */
interface RevealProps {
    children: React.ReactNode;
    /** Container width - "fit-content" or "100%" */
    width?: "fit-content" | "100%";
    /** Animation delay in seconds (default: 0.25) */
    delay?: number;
    /** Animation duration in seconds (default: 0.8) */
    duration?: number;
    /** Vertical offset in pixels to animate from (default: 50) */
    yOffset?: number;
    /** Viewport visibility threshold to trigger animation (default: 0.2) */
    threshold?: number;
}

/**
 * Reveal - Scroll-triggered fade-in animation component
 * 
 * Wraps children in a motion container that animates in when scrolled into view.
 * Uses "Apple-style" easing for a premium feel.
 * 
 * Animation properties:
 * - Fade from 0 to 100% opacity
 * - Slide up from yOffset pixels
 * - Subtle blur effect (4px to 0px)
 * 
 * @example
 * <Reveal delay={0.2} yOffset={30}>
 *   <YourContent />
 * </Reveal>
 */
export const Reveal = ({
    children,
    width = "fit-content",
    delay = 0.25,
    duration = 0.8,
    yOffset = 50,
    threshold = 0.2
}: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: threshold,
        margin: "0px 0px -50px 0px" // Trigger slightly before element is fully visible
    });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const variants: Record<string, Variant> = {
        hidden: {
            opacity: 0,
            y: yOffset,
            filter: "blur(4px)", // Apple-like blur in effect
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: duration,
                ease: [0.25, 0.1, 0.25, 1], // "Apple Ease"
                delay: delay
            }
        }
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={mainControls}
            >
                {children}
            </motion.div>
        </div>
    );
};
