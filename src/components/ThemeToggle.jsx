import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Init logic: default to dark if no pref, or check local storage
        const savedTheme = localStorage.getItem('theme');
        const wantsDark = savedTheme === 'dark' || (!savedTheme && true); // Default to dark for this portfolio

        setIsDark(wantsDark);
        if (wantsDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);

        if (newDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-2 rounded-full border border-black/10 dark:border-white/20 bg-white/80 dark:bg-card-bg backdrop-blur-sm shadow-lg text-text-primary sonar-effect hover:ring-2 hover:ring-neon-green transition-all"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {isDark ? <Sun size={20} className="text-neon-green" /> : <Moon size={20} className="text-neon-green" />}
        </motion.button>
    );
};

export default ThemeToggle;
