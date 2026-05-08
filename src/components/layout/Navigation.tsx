import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Activity', 'Contact'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.toLowerCase());
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/[0.04] backdrop-blur-xl border-b border-white/[0.09]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer text-2xl font-bold text-gradient focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          SB
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className={`cursor-pointer text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
                activeSection === link.toLowerCase()
                  ? 'text-emerald'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo('contact')}
          className="cursor-pointer rounded-full bg-gradient-to-r from-blue to-purple px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          Hire Me
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer text-white md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-[min(80vw,18rem)] bg-white/[0.04] backdrop-blur-xl border-l border-white/[0.09] md:hidden"
          >
            <div className="flex flex-col gap-6 p-8 pt-20">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className={`cursor-pointer text-left text-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
                    activeSection === link.toLowerCase()
                      ? 'text-emerald'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="mt-4 cursor-pointer rounded-full bg-gradient-to-r from-blue to-purple px-5 py-2.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
