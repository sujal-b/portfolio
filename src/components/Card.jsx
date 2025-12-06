import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className, onClick, layoutId }) => {
    return (
        <motion.div
            className={`neo-card p-4 overflow-hidden relative cursor-pointer flex flex-col ${className}`}
            onClick={onClick}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

export default Card;
