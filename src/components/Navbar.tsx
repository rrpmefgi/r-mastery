import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X, Trophy, Zap, LogIn, LogOut, User, HelpCircle } from 'lucide-react';
import { XPProgressBar } from './XPProgressBar';

interface NavbarProps {
  onHome: () => void;
  onTutorials: () => void;
  onChallenges: () => void;
  onQuizzes: () => void;
  onAbout: () => void;
  onStartLearning: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
  xp: number;
  level: number;
  progress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onHome, 
  onTutorials, 
  onChallenges,
  onQuizzes,
  onAbout,
  onStartLearning,
  isMenuOpen, 
  setIsMenuOpen,
  xp,
  level,
  progress
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-8">
        <div 
          className="flex items-center gap-2 cursor-pointer group shrink-0 brutal-3d"
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

        {/* XP Progress Bar - Desktop */}
        <div className="hidden lg:block flex-1 max-w-md">
          <XPProgressBar xp={xp} level={level} progress={progress} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={onHome}
            className="font-bold uppercase hover:text-brutal-blue transition-colors text-sm brutal-3d"
          >
            Home
          </button>
          <button 
            onClick={onTutorials}
            className="font-bold uppercase hover:text-brutal-pink transition-colors text-sm flex items-center gap-1 brutal-3d"
          >
            <Trophy size={16} /> Leaderboard
          </button>
          <button 
            onClick={onChallenges}
            className="font-bold uppercase hover:text-brutal-yellow transition-colors text-sm flex items-center gap-1 brutal-3d"
          >
            <Zap size={16} /> Daily Quest
          </button>
          <button 
            onClick={onQuizzes}
            className="font-bold uppercase hover:text-brutal-pink transition-colors text-sm flex items-center gap-1 brutal-3d"
          >
            <HelpCircle size={16} /> Quizzes
          </button>
          <button 
            onClick={onAbout}
            className="font-bold uppercase hover:text-brutal-pink transition-colors text-sm brutal-3d"
          >
            About
          </button>
          
          <div className="h-8 w-[2px] bg-black/10 mx-2" />

          <button 
            onClick={onStartLearning}
            className="bg-brutal-black text-white px-4 py-2 brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold uppercase text-sm brutal-3d"
          >
            Start Learning
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="w-32">
            <XPProgressBar xp={xp} level={level} progress={progress} />
          </div>
          <button 
            className="p-2 brutal-border bg-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
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
              <button onClick={() => { onTutorials(); setIsMenuOpen(false); }} className="text-left font-black uppercase text-xl py-4 border-b-2 border-black/10 hover:text-brutal-pink transition-colors flex items-center gap-2"><Trophy size={24} /> Leaderboard</button>
              <button onClick={() => { onChallenges(); setIsMenuOpen(false); }} className="text-left font-black uppercase text-xl py-4 border-b-2 border-black/10 hover:text-brutal-yellow transition-colors flex items-center gap-2"><Zap size={24} /> Challenges</button>
              <button onClick={() => { onQuizzes(); setIsMenuOpen(false); }} className="text-left font-black uppercase text-xl py-4 border-b-2 border-black/10 hover:text-brutal-pink transition-colors flex items-center gap-2"><HelpCircle size={24} /> Quizzes</button>
              <button onClick={() => { onAbout(); setIsMenuOpen(false); }} className="text-left font-black uppercase text-xl py-4 border-b-2 border-black/10 hover:text-brutal-pink transition-colors">About</button>
              
              <button onClick={() => { onStartLearning(); setIsMenuOpen(false); }} className="bg-brutal-black text-white p-5 brutal-border brutal-shadow font-black uppercase text-xl mt-4 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">Start Learning</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
