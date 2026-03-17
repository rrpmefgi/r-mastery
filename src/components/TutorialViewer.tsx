import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { Tutorial } from '../types';
import { CodeOutputTable } from './CodeOutputTable';
import { TopicQuiz } from './TopicQuiz';

interface TutorialViewerProps {
  tutorial: Tutorial;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onRunCode?: () => void;
  onComplete?: () => void;
}

export const TutorialViewer: React.FC<TutorialViewerProps> = ({ 
  tutorial, 
  onBack, 
  onNext, 
  onPrev,
  onRunCode,
  onComplete
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Reset quiz state when tutorial changes
  useEffect(() => {
    setShowQuiz(false);
    setQuizCompleted(false);
  }, [tutorial.id]);

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    setShowQuiz(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto py-6 md:py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white brutal-border brutal-shadow-lg p-6 md:p-12 mb-8 md:mb-12 brutal-3d"
      >
        <div className="flex justify-between items-start mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 font-bold uppercase hover:text-brutal-blue transition-colors"
          >
            <ChevronLeft size={20} /> Back to List
          </button>
        </div>

        <div className="mb-6 md:mb-10">
          <span className="bg-brutal-yellow px-3 py-1 brutal-border text-xs font-black uppercase mb-4 inline-block">
            {tutorial.category}
          </span>
          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            {tutorial.title}
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {!showQuiz ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="prose prose-lg max-w-none prose-headings:uppercase prose-headings:font-black prose-pre:bg-brutal-black prose-pre:text-white prose-pre:brutal-border prose-pre:brutal-shadow prose-code:text-brutal-pink prose-code:font-mono prose-strong:font-black text-justify">
                <Markdown
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const isR = match && match[1] === 'r';
                      
                      if (!inline && isR) {
                        const code = String(children).replace(/\n$/, '');
                        const staticData = tutorial.staticOutputs?.[code];
                        
                        return (
                          <CodeOutputTable 
                            code={code} 
                            output={staticData?.output}
                            plot={staticData?.plot}
                          />
                        );
                      }
                      
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {tutorial.content}
                </Markdown>
              </div>

              <div className="mt-16 pt-12 border-t-4 border-black text-center">
                {quizCompleted ? (
                  <div className="bg-brutal-green/10 p-8 brutal-border border-dashed flex flex-col items-center gap-4">
                    <CheckCircle2 size={48} className="text-brutal-green" />
                    <h3 className="text-2xl font-black uppercase">Quiz Completed!</h3>
                    <p className="font-bold opacity-60 uppercase">You've mastered this topic.</p>
                  </div>
                ) : (
                  <div className="bg-brutal-blue/5 p-8 brutal-border border-dashed flex flex-col items-center gap-6">
                    <BookOpen size={48} className="text-brutal-blue" />
                    <div>
                      <h3 className="text-2xl font-black uppercase mb-2">Ready for the challenge?</h3>
                      <p className="font-bold opacity-60 uppercase">Test your knowledge with a 5-question quiz to finish this lesson.</p>
                    </div>
                    <button 
                      onClick={() => setShowQuiz(true)}
                      className="bg-brutal-blue text-white px-12 py-4 brutal-border brutal-shadow font-black uppercase text-xl hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      Take Topic Quiz
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <TopicQuiz 
                questions={tutorial.quizQuestions || []} 
                onComplete={handleQuizComplete} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 md:gap-6">
        {onPrev ? (
          <button 
            onClick={onPrev}
            className="flex-1 bg-white p-4 md:p-6 brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col items-start gap-2 brutal-3d"
          >
            <span className="text-[10px] md:text-xs font-black uppercase opacity-50">Previous</span>
            <span className="font-bold uppercase text-sm md:text-base flex items-center gap-2"><ChevronLeft size={18} /> Previous Lesson</span>
          </button>
        ) : <div className="hidden sm:block flex-1" />}

        {onNext && quizCompleted ? (
          <button 
            onClick={onNext}
            className="flex-1 bg-brutal-black text-white p-4 md:p-6 brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col items-end gap-2 brutal-3d"
          >
            <span className="text-[10px] md:text-xs font-black uppercase opacity-50">Next Up</span>
            <span className="font-bold uppercase text-sm md:text-base flex items-center gap-2">Next Lesson <ChevronRight size={18} /></span>
          </button>
        ) : <div className="hidden sm:block flex-1" />}
      </div>
    </div>
  );
};
