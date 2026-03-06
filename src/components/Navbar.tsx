import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X } from 'lucide-react';

interface NavbarProps {
  onHome: () => void;
  onTutorials: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHome, onTutorials, isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onHome}
        >
          <div className="bg-brutal-yellow p-2 brutal-border brutal-shadow group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
            <Terminal size={24} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black uppercase tracking-tighter leading-none">R-Mastery</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-brutal-pink leading-none mt-1">by Rushika Patt</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={onHome}
            className="font-bold uppercase hover:text-brutal-blue transition-colors"
          >
            Home
          </button>
          <button 
            onClick={onTutorials}
            className="font-bold uppercase hover:text-brutal-pink transition-colors"
          >
            Curriculum
          </button>
          <button 
            onClick={onTutorials}
            className="bg-brutal-black text-white px-6 py-2 brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold uppercase"
          >
            Start Learning
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 brutal-border bg-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b-4 border-black overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              <button onClick={() => { onHome(); setIsMenuOpen(false); }} className="text-left font-black uppercase text-xl py-4 border-b-2 border-black/10 hover:text-brutal-blue transition-colors">Home</button>
              <button onClick={() => { onTutorials(); setIsMenuOpen(false); }} className="text-left font-black uppercase text-xl py-4 border-b-2 border-black/10 hover:text-brutal-pink transition-colors">Curriculum</button>
              <button onClick={() => { onTutorials(); setIsMenuOpen(false); }} className="bg-brutal-black text-white p-5 brutal-border brutal-shadow font-black uppercase text-xl mt-4 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">Start Learning</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
