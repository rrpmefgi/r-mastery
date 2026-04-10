import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface HeroProps {
  handleLogin: () => void;
  isLoggingIn: boolean;
}

export default function Hero({ handleLogin, isLoggingIn }: HeroProps) {
  return (
    <div className="relative bg-white dot-grid py-20 md:py-32 px-6 md:px-12 border-b-8 border-black overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <div className="inline-block bg-brutal-yellow text-black px-4 py-2 font-black brutal-border brutal-shadow uppercase tracking-widest text-sm">
              The Ultimate R Programming Guide
            </div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-black/40">
              Created by Rushika Patt
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-black leading-[0.85] tracking-tighter uppercase">
            MASTER <span className="text-brutal-blue">DATA SCIENCE</span><br />
            WITH <span className="bg-brutal-pink text-white px-4 inline-block brutal-border brutal-shadow">R-MASTERY</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-black text-black/80 max-w-2xl uppercase leading-tight">
            Empowering the next generation of data scientists with the most interactive R learning platform.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-4">
            <button 
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="bg-brutal-yellow brutal-border brutal-shadow-lg px-10 py-5 font-black text-2xl brutal-3d uppercase tracking-tighter flex items-center gap-3"
            >
              <Play size={24} fill="currentColor" />
              {isLoggingIn ? 'LOGGING IN...' : 'JOIN THE MASTERY'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-20 right-20 hidden lg:block">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-48 h-48 bg-brutal-blue brutal-border brutal-shadow-lg flex items-center justify-center"
        >
          <div className="w-24 h-24 bg-white brutal-border rotate-45" />
        </motion.div>
      </div>
      <div className="absolute bottom-20 right-60 hidden lg:block">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 bg-brutal-pink rounded-full brutal-border brutal-shadow-lg"
        />
      </div>
    </div>
  );
}
