import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BtmToTopProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

const BtmToTop = ({ children, delay = 0, className }: BtmToTopProps) => {
    const shouldReduceMotion = useReducedMotion();
    const offset = shouldReduceMotion ? 0 : 18;

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: offset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            transition={{
                duration: shouldReduceMotion ? 0.2 : 0.45,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

export default BtmToTop;
