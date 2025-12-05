import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ item, isExpanded }) => {
    return (
        <div className="flex flex-col h-full w-full">
            <div className='flex justify-between items-start'>
                <h3 className="text-lg font-bold font-mono leading-tight">{item.title}</h3>
                <ArrowUpRight size={20} />
            </div>

            <p className="text-sm text-gray-600 mt-2 line-clamp-2 hover:line-clamp-none">{item.short_desc}</p>

            {!isExpanded && (
                <div className="flex flex-wrap gap-1 mt-auto pt-2">
                    {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] border border-black px-1 bg-white">{tag}</span>
                    ))}
                    {item.tags.length > 3 && <span className="text-[10px] px-1">+{item.tags.length - 3}</span>}
                </div>
            )}

            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6"
                >
                    <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-xs border border-black px-2 py-1 bg-neo-accent">{tag}</span>
                        ))}
                    </div>

                    <div className='space-y-4 text-sm md:text-base'>
                        {item.detailed_content.map((point, i) => (
                            <p key={i} className='border-l-4 border-black pl-3'>{point}</p>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ProjectCard;
