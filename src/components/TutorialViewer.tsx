import React from 'react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { ChevronLeft, ChevronRight, Share2, Bookmark } from 'lucide-react';
import { Tutorial } from '../types';

interface TutorialViewerProps {
  tutorial: Tutorial;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const TutorialViewer: React.FC<TutorialViewerProps> = ({ tutorial, onBack, onNext, onPrev }) => {
  return (
    <div className="max-w-4xl mx-auto py-6 md:py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white brutal-border brutal-shadow-lg p-6 md:p-12 mb-8 md:mb-12"
      >
        <div className="flex justify-between items-start mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 font-bold uppercase hover:text-brutal-blue transition-colors"
          >
            <ChevronLeft size={20} /> Back to List
          </button>
          <div className="flex gap-4">
            <button className="p-2 brutal-border hover:bg-brutal-yellow transition-colors"><Bookmark size={20} /></button>
            <button className="p-2 brutal-border hover:bg-brutal-blue hover:text-white transition-colors"><Share2 size={20} /></button>
          </div>
        </div>

        <div className="mb-6 md:mb-10">
          <span className="bg-brutal-yellow px-3 py-1 brutal-border text-xs font-black uppercase mb-4 inline-block">
            {tutorial.category}
          </span>
          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            {tutorial.title}
          </h1>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:uppercase prose-headings:font-black prose-pre:bg-brutal-black prose-pre:text-white prose-pre:brutal-border prose-pre:brutal-shadow prose-code:text-brutal-pink prose-code:font-mono prose-strong:font-black">
          <Markdown>{tutorial.content}</Markdown>
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 md:gap-6">
        {onPrev ? (
          <button 
            onClick={onPrev}
            className="flex-1 bg-white p-4 md:p-6 brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col items-start gap-2"
          >
            <span className="text-[10px] md:text-xs font-black uppercase opacity-50">Previous</span>
            <span className="font-bold uppercase text-sm md:text-base flex items-center gap-2"><ChevronLeft size={18} /> Previous Lesson</span>
          </button>
        ) : <div className="hidden sm:block flex-1" />}

        {onNext ? (
          <button 
            onClick={onNext}
            className="flex-1 bg-brutal-black text-white p-4 md:p-6 brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col items-end gap-2"
          >
            <span className="text-[10px] md:text-xs font-black uppercase opacity-50">Next Up</span>
            <span className="font-bold uppercase text-sm md:text-base flex items-center gap-2">Next Lesson <ChevronRight size={18} /></span>
          </button>
        ) : <div className="hidden sm:block flex-1" />}
      </div>
    </div>
  );
};
