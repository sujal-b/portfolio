import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ExperienceCard = ({ item, isExpanded }) => {
    const experiences = item.experiences || [];

    return (
        <div className="flex flex-col h-full w-full relative group/card">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Briefcase size={120} strokeWidth={1} className="text-neon-green" />
            </div>

            <div className="flex justify-between items-start mb-4 z-10">
                <h3 className="text-2xl font-bold font-mono leading-tight text-neon-green">{item.title}</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-4 h-full overflow-hidden z-10">
                {experiences.map((exp, idx) => (
                    <div key={idx} className={`flex-1 flex flex-col p-5 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 relative group/exp overflow-hidden ${idx === 0 ? 'md:border-r md:border-white/10' : ''}`}>
                        
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-neon-green/5 opacity-0 group-hover/exp:opacity-100 transition-opacity duration-500" />

                        <div className="flex justify-between items-start mb-1 relative z-10">
                            <h4 className="font-bold text-lg text-white group-hover/exp:text-neon-green transition-colors">{exp.role}</h4>
                            <span className="text-[10px] bg-neon-green/10 text-neon-green border border-neon-green/20 px-2 py-1 font-mono rounded whitespace-nowrap">{exp.date}</span>
                        </div>
                        
                        <h5 className="font-bold text-text-secondary mb-3 text-sm relative z-10">{exp.organization}</h5>

                        <p className="text-sm text-gray-300 mb-6 line-clamp-4 leading-relaxed relative z-10 flex-grow border-l-2 border-white/20 pl-3 py-1">{exp.short_desc}</p>

                        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                            {exp.tags.slice(0, 4).map(tag => (
                                <span key={tag} className="text-[10px] border border-white/20 px-2 py-1 bg-black/40 text-gray-400 font-mono rounded-sm">{tag}</span>
                            ))}
                        </div>

                        {/* Expanded details */}
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-5 pt-5 border-t border-white/10 relative z-10"
                            >
                                <div className='space-y-3 text-sm text-gray-300'>
                                    {exp.detailed_content && exp.detailed_content.map((point, k) => (
                                        <p key={k} className='pl-3 border-l-2 border-neon-green/50 hover:border-neon-green transition-colors'>{point}</p>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceCard;
