import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import HeroCard from './cards/HeroCard';
import ExperienceCard from './cards/ExperienceCard';
import ProjectCard from './cards/ProjectCard';
import ListCard from './cards/ListCard';
import WidgetCard from './cards/WidgetCard';
import SocialCard from './cards/SocialCard';
import FeaturedProjectsCard from './cards/FeaturedProjectsCard';

const BentoGrid = () => {
    const { grid_layout } = portfolioData;
    const [selectedId, setSelectedId] = useState(null);
    const [previousFocus, setPreviousFocus] = useState(null);

    const getColSpan = (size) => {
        switch (size) {
            case '4x2': return 'col-span-1 md:col-span-4 row-span-2';
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
            case 'featured': return <FeaturedProjectsCard item={item} isExpanded={isExpanded} />;
            case 'list': return <ListCard item={item} isExpanded={isExpanded} />;
            case 'widget': return <WidgetCard item={item} isExpanded={isExpanded} />;
            case 'social': return <SocialCard item={item} isExpanded={isExpanded} />;
            default: return <div>{item.title}</div>;
        }
    };

    const handleCardClick = useCallback((itemId, event) => {
        setPreviousFocus(document.activeElement);
        setSelectedId(itemId);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedId(null);
        if (previousFocus) {
            previousFocus.focus();
        }
    }, [previousFocus]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape' && selectedId) {
            handleCloseModal();
        }
    }, [selectedId, handleCloseModal]);

    useEffect(() => {
        if (selectedId) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [selectedId, handleKeyDown]);

    return (
        <div className="container mx-auto p-4 md:p-8" role="main" aria-label="Portfolio content">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[180px]" role="grid" aria-label="Portfolio grid">
                {grid_layout.map((item) => (
                    <div key={item.id} className={getColSpan(item.size)}>
                        <motion.div
                            onClick={(e) => handleCardClick(item.id, e)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleCardClick(item.id, e);
                                }
                            }}
                            className="neo-card w-full h-full p-6 cursor-pointer flex flex-col justify-between overflow-hidden relative hover:-translate-y-1 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-discord-bg"
                            whileTap={{ scale: 0.98 }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Open ${item.title} details`}
                            aria-expanded={selectedId === item.id}
                        >
                            {renderCardContent(item, false)}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Expanded Modal Overlay */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={handleCloseModal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`modal-title-${selectedId}`}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="neo-card w-full max-w-6xl max-h-[90vh] overflow-y-auto p-8 bg-card-bg relative shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                            role="document"
                        >
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 p-3 bg-text-primary/10 hover:bg-text-primary/20 text-text-primary rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neon-green min-w-[44px] min-h-[44px] flex items-center justify-center"
                                aria-label="Close modal"
                            >
                                ✕
                            </button>
                            {renderCardContent(grid_layout.find(i => i.id === selectedId), true)}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BentoGrid;
