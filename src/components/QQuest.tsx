import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Q_POOL, QQuestion } from '../data/qQuestions';
import { Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, HelpCircle, Star, Zap } from 'lucide-react';

interface QQuestProps {
  onComplete: (xp: number) => void;
  onSaveScore: (category: string, score: number, total: number) => void;
}

export const QQuest: React.FC<QQuestProps> = ({ onComplete, onSaveScore }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<QQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);

  // Function to get 10 random questions from a pool
  const getRandomQuestions = (category: string) => {
    const pool = Q_POOL[category];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  const startQuiz = (category: string) => {
    const questions = getRandomQuestions(category);
    setCurrentQuestions(questions);
    setActiveCategory(category);
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);
    if (optionIdx === currentQuestions[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < currentQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      if (activeCategory && !completedCategories.includes(activeCategory)) {
        setCompletedCategories(prev => [...prev, activeCategory]);
      }
      if (activeCategory) {
        onSaveScore(activeCategory, score, currentQuestions.length);
      }
      onComplete(score * 50); // 50 XP per correct answer
    }
  };

  const resetQuiz = () => {
    setActiveCategory(null);
    setCurrentQuestions([]);
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
  };

  if (!activeCategory) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-7xl font-black uppercase tracking-tighter mb-4 italic text-brutal-black">Q1 QUEST</h2>
          <p className="text-2xl font-bold opacity-60 uppercase tracking-tight">Master R through 50 randomized challenges</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Q5'].map((cat, idx) => {
            const isCompleted = completedCategories.includes(cat);
            const colors = [
              'bg-brutal-yellow',
              'bg-brutal-pink',
              'bg-brutal-blue',
              'bg-brutal-green',
              'bg-orange-400'
            ];
            const descriptions = [
              'Basics & Syntax',
              'Data Structures',
              'Tidyverse & ETL',
              'Statistics in R',
              'Visualization'
            ];

            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startQuiz(cat)}
                className={`relative p-8 brutal-border brutal-shadow-lg flex flex-col items-center justify-center gap-4 transition-all ${colors[idx]} ${isCompleted ? 'grayscale-[0.5]' : ''} brutal-3d`}
              >
                {isCompleted && (
                  <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full brutal-border shadow-md z-10">
                    <CheckCircle2 className="text-brutal-green" size={24} />
                  </div>
                )}
                <span className="text-5xl font-black">{cat}</span>
                <span className="font-black uppercase text-xs tracking-widest opacity-80">{descriptions[idx]}</span>
                <div className="mt-4 bg-white/30 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  10 Random Questions
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-20 bg-brutal-black text-white p-12 brutal-border">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <Zap className="mx-auto mb-4 text-brutal-yellow" size={40} />
              <h4 className="text-xl font-black uppercase mb-2">Randomized</h4>
              <p className="text-sm font-medium opacity-60 text-justify">Every run pulls fresh questions from our extensive pool.</p>
            </div>
            <div>
              <Star className="mx-auto mb-4 text-brutal-pink" size={40} />
              <h4 className="text-xl font-black uppercase mb-2">Progressive</h4>
              <p className="text-sm font-medium opacity-60 text-justify">From basic syntax to advanced statistical modeling.</p>
            </div>
            <div>
              <Trophy className="mx-auto mb-4 text-brutal-blue" size={40} />
              <h4 className="text-xl font-black uppercase mb-2">Rewards</h4>
              <p className="text-sm font-medium opacity-60 text-justify">Earn XP and master badges for every category you conquer.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / currentQuestions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto py-20 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white brutal-border brutal-shadow-lg p-12 text-center"
        >
          <Trophy size={80} className="mx-auto mb-6 text-brutal-yellow" />
          <h3 className="text-5xl font-black uppercase mb-2">{activeCategory} COMPLETE</h3>
          <p className="text-2xl font-bold opacity-60 uppercase mb-8">You scored {score} out of {currentQuestions.length}</p>
          
          <div className="w-full h-8 bg-gray-100 brutal-border mb-12 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className="h-full bg-brutal-green border-r-4 border-black"
            />
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => startQuiz(activeCategory)}
              className="bg-brutal-yellow text-black py-4 brutal-border brutal-shadow font-black uppercase text-xl hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={24} /> Try Again (New Questions)
            </button>
            <button 
              onClick={resetQuiz}
              className="bg-brutal-black text-white py-4 brutal-border brutal-shadow font-black uppercase text-xl hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Back to Quests
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = currentQuestions[currentIdx];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <span className="bg-brutal-pink px-4 py-1 brutal-border font-black uppercase text-xs mb-2 inline-block">
            Category: {activeCategory}
          </span>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Question {currentIdx + 1}/10</h2>
        </div>
        <div className="text-right">
          <span className="font-black uppercase text-xs opacity-60 block mb-1">Current Score</span>
          <span className="text-3xl font-black">{score}</span>
        </div>
      </div>

      <div className="w-full h-4 bg-gray-100 brutal-border mb-12 overflow-hidden">
        <motion.div 
          animate={{ width: `${((currentIdx + 1) / 10) * 100}%` }}
          className="h-full bg-brutal-blue border-r-2 border-black"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="bg-white brutal-border brutal-shadow-lg p-8 md:p-12 mb-8 brutal-3d"
        >
          <h3 className="text-2xl md:text-3xl font-black mb-10 leading-tight">
            {currentQ.question}
          </h3>

          <div className="grid gap-4">
            {currentQ.options.map((option, idx) => {
              const isCorrect = idx === currentQ.correctAnswer;
              const isSelected = selectedOption === idx;
              
              let buttonClass = "bg-white hover:bg-gray-50";
              if (isAnswered) {
                if (isCorrect) buttonClass = "bg-brutal-green text-white";
                else if (isSelected) buttonClass = "bg-red-500 text-white";
                else buttonClass = "bg-gray-100 opacity-50";
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(idx)}
                  className={`p-6 brutal-border text-left font-bold text-lg transition-all flex items-center justify-between ${buttonClass} ${!isAnswered ? 'hover:translate-x-1 hover:translate-y-1 hover:shadow-none' : ''}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 size={24} />}
                  {isAnswered && isSelected && !isCorrect && <XCircle size={24} />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 p-6 bg-gray-50 brutal-border border-dashed"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="text-brutal-blue shrink-0" size={24} />
                <div>
                  <h4 className="font-black uppercase text-sm mb-1">Explanation</h4>
                  <p className="font-medium text-gray-700 text-justify">{currentQ.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end">
        <button
          disabled={!isAnswered}
          onClick={nextQuestion}
          className={`px-10 py-4 brutal-border brutal-shadow font-black uppercase text-xl flex items-center gap-2 transition-all ${
            isAnswered 
              ? 'bg-brutal-black text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentIdx === 9 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};
