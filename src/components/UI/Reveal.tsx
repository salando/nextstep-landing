import { useRef } from 'react';
import { motion, useInView, useAnimation, type Variant } from 'framer-motion';
import { useEffect } from 'react';

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    yOffset?: number;
    threshold?: number;
}

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
