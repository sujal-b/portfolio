import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className, onClick, layoutId }) => {
    return (
        <motion.div
            layoutId={layoutId} // Shared layout transition
            className={`neo-card p-4 overflow-hidden relative cursor-pointer flex flex-col ${className}`}
            onClick={onClick}
            whileHover={{ y: -4, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
            whileTap={{ scale: 0.95, y: 0, boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

export default Card;
