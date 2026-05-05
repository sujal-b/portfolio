import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Briefcase, Code, Award, Mail } from 'lucide-react';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const navItems = [
        { id: 'hero', label: 'Home', icon: Home },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'featured-projects', label: 'Projects', icon: Code },
        { id: 'skill-tech', label: 'Skills', icon: Award },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];

    const scrollToSection = (sectionId) => {
        const element = document.querySelector(`[data-section="${sectionId}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => ({
                id: item.id,
                element: document.querySelector(`[data-section="${item.id}"]`)
            }));

            for (const section of sections) {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex fixed top-4 left-4 z-40 neo-card px-4 py-2 gap-2" aria-label="Main navigation">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-green min-w-[44px] min-h-[44px] ${
                                activeSection === item.id
                                    ? 'bg-neon-green text-black font-bold'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-white/10'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Navigate to ${item.label}`}
                            aria-current={activeSection === item.id ? 'page' : undefined}
                        >
                            <Icon size={18} />
                            <span className="text-sm font-mono">{item.label}</span>
                        </motion.button>
                    );
                })}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-40 p-3 rounded-full neo-card text-text-primary focus:outline-none focus:ring-2 focus:ring-neon-green min-w-[44px] min-h-[44px] flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="md:hidden fixed top-0 left-0 z-40 h-full w-64 neo-card p-6 flex flex-col gap-4"
                            aria-label="Mobile navigation"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-bold font-mono text-neon-green">Menu</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-neon-green min-w-[44px] min-h-[44px] flex items-center justify-center"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-green min-w-[44px] min-h-[44px] ${
                                            activeSection === item.id
                                                ? 'bg-neon-green text-black font-bold'
                                                : 'text-text-secondary hover:text-text-primary hover:bg-white/10'
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        aria-label={`Navigate to ${item.label}`}
                                    >
                                        <Icon size={20} />
                                        <span className="font-mono">{item.label}</span>
                                    </motion.button>
                                );
                            })}
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
