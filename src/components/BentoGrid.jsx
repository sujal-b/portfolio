import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import HeroCard from './cards/HeroCard';
import ExperienceCard from './cards/ExperienceCard';
import ProjectCard from './cards/ProjectCard';
import ListCard from './cards/ListCard';
import WidgetCard from './cards/WidgetCard';
import SocialCard from './cards/SocialCard'; // New, need to create

const BentoGrid = () => {
    const { grid_layout } = portfolioData;
    const [selectedId, setSelectedId] = useState(null);

    const getColSpan = (size) => {
        switch (size) {
            case '2x2': return 'col-span-1 md:col-span-2 row-span-2';
            case '2x1': return 'col-span-1 md:col-span-2 row-span-1';
            case '1x2': return 'col-span-1 row-span-2';
            default: return 'col-span-1 row-span-1';
        }
    };

    const renderCardContent = (item, isExpanded = false) => {
        switch (item.type) {
            case 'hero': return <HeroCard item={item} isExpanded={isExpanded} />;
            case 'experience': return <ExperienceCard item={item} isExpanded={isExpanded} />;
            case 'project': return <ProjectCard item={item} isExpanded={isExpanded} />;
            case 'list': return <ListCard item={item} isExpanded={isExpanded} />;
            case 'widget': return <WidgetCard item={item} isExpanded={isExpanded} />;
            case 'social': return <SocialCard item={item} isExpanded={isExpanded} />;
            default: return <div>{item.title}</div>;
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[180px]">
                {grid_layout.map((item) => (
                    <div key={item.id} className={getColSpan(item.size)}>
                        <motion.div
                            layoutId={item.id}
                            onClick={() => setSelectedId(item.id)}
                            className="neo-card w-full h-full p-6 cursor-pointer flex flex-col justify-between overflow-hidden relative"
                            whileHover={{ y: -4, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {renderCardContent(item, false)}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Expanded Modal Overlay */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedId(null)}>
                        <motion.div
                            layoutId={selectedId}
                            className="neo-card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 bg-neo-bg relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 p-2 bg-neo-black text-white hover:rotate-90 transition-transform"
                            >
                                ✕
                            </button>
                            {renderCardContent(grid_layout.find(i => i.id === selectedId), true)}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BentoGrid;
