import React from 'react';
import { motion } from 'framer-motion';

import { Briefcase } from 'lucide-react';

const ExperienceCard = ({ item, isExpanded }) => {
    return (
        <div className="flex flex-col h-full relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute -bottom-4 -right-4 text-white/5 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                <Briefcase size={120} strokeWidth={1} />
            </div>

            <div className="flex justify-between items-start mb-4 z-10">
                <h3 className="text-xl font-bold font-mono">{item.title}</h3>
                <span className="text-xs bg-neon-green/10 text-neon-green border border-neon-green/20 px-2 py-1 font-mono rounded whitespace-nowrap">{item.date}</span>
            </div>

            <div className="flex-1 z-10 flex flex-col">
                <h4 className="font-bold text-text-secondary mb-3 text-lg">{item.organization}</h4>
                <p className="text-sm border-l-2 border-white/20 pl-3 py-1 mb-4 text-gray-300 leading-relaxed max-w-[90%]">{item.short_desc}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto z-10">
                {item.tags.map(tag => (
                    <span key={tag} className="text-xs border border-white/20 px-2 py-0.5 bg-neon-green/5 text-neon-green/80">{tag}</span>
                ))}
            </div>

            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 space-y-2 relative z-10 bg-card-bg/95 p-2 rounded-lg -mx-2"
                >
                    <h4 className="font-bold font-mono border-b-2 border-neon-green inline-block mb-2 text-neon-green">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {item.detailed_content.map((point, i) => (
                            <li key={i} className='text-sm leading-relaxed text-gray-200'>{point}</li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default ExperienceCard;
