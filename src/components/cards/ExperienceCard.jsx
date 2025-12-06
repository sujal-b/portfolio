import React from 'react';
import { motion } from 'framer-motion';

const ExperienceCard = ({ item, isExpanded }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold font-mono">{item.title}</h3>
                <span className="text-xs bg-neon-green/10 text-neon-green border border-neon-green/20 px-2 py-1 font-mono rounded">{item.date}</span>
            </div>
            <h4 className="font-bold text-text-secondary mb-2">{item.organization}</h4>

            <p className="text-sm border-l-2 border-white/20 pl-2 mb-4 text-gray-300">{item.short_desc}</p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {item.tags.map(tag => (
                    <span key={tag} className="text-xs border border-white/20 px-2 py-0.5 bg-neon-green/5 text-neon-green/80">{tag}</span>
                ))}
            </div>

            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 space-y-2"
                >
                    <h4 className="font-bold font-mono border-b-2 border-neon-green inline-block mb-2 text-neon-green">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {item.detailed_content.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default ExperienceCard;
