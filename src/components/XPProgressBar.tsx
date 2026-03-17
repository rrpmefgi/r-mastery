import React from 'react';
import { motion } from 'motion/react';

interface XPProgressBarProps {
  xp: number;
  level: number;
  progress: number;
}

export const XPProgressBar: React.FC<XPProgressBarProps> = ({ xp, level, progress }) => {
  return (
    <div className="w-full bg-white brutal-border h-8 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <motion.div 
        className="h-full bg-brutal-pink border-r-2 border-black"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      <div className="absolute inset-0 flex justify-between items-center px-4 mix-blend-difference text-white font-black uppercase text-xs tracking-widest">
        <span>Level {level}</span>
        <span>{xp} XP</span>
      </div>
      
      {/* Glitch effect overlays */}
      <motion.div 
        className="absolute inset-0 bg-white/20 pointer-events-none"
        animate={{ 
          opacity: [0, 0.2, 0, 0.1, 0],
          x: [0, 2, -2, 1, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          times: [0, 0.1, 0.2, 0.3, 1]
        }}
      />
    </div>
  );
};
