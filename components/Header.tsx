import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Album', 'Tracks', 'Tour', 'Bio', 'Merch'];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="relative group cursor-pointer">
          <a 
            href="#album" 
            onClick={(e) => handleNavClick(e, 'album')}
            className="font-display text-4xl text-white tracking-wider group-hover:text-primary transition-colors block"
          >
            R.A.F
          </a>
          <div className="absolute -bottom-1 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300"></div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="font-body font-bold text-sm uppercase tracking-widest text-gray-400 hover:text-primary transition-colors cursor-pointer"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-surface border-b border-white/10"
        >
          <nav className="flex flex-col p-6 gap-4">
             {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="font-display text-2xl text-white hover:text-primary cursor-pointer"
              >
                {item}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;