import React from 'react';
import { motion } from 'framer-motion';

const HeroCard = ({ item, isExpanded }) => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <motion.h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono leading-tight">
                    {item.title}
                </motion.h1>
                <h2 className="text-xl md:text-2xl font-bold text-gray-600 mb-4">
                    {item.subtitle}
                </h2>
            </div>

            {(isExpanded || item.size === '2x2') && (
                <motion.p
                    className="text-lg md:text-xl border-l-4 border-neo-accent pl-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {item.content}
                </motion.p>
            )}

            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                >
                    <button className="bg-neo-black text-white px-8 py-3 font-mono font-bold hover:bg-neo-accent hover:text-black transition-colors border-2 border-transparent hover:border-black">
                        Download Resume
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default HeroCard;
