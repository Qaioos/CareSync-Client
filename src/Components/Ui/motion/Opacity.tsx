import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface OpacityProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

const Opacity = ({ children, delay = 0, className }: OpacityProps) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.4, delay }}
        >
            {children}
        </motion.div>
    );
};

export default Opacity;
