import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion } from '../types';
import { Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';

interface TopicQuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export const TopicQuiz: React.FC<TopicQuizProps> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<{question: string, selected: number, correct: number, explanation: string}[]>([]);

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);
    
    const currentQ = questions[currentIdx];
    const isCorrect = optionIdx === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswers(prev => [...prev, {
      question: currentQ.question,
      selected: optionIdx,
      correct: currentQ.correctAnswer,
      explanation: currentQ.explanation
    }]);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="py-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white brutal-border brutal-shadow-lg p-8 md:p-12 text-center brutal-3d"
        >
          <Trophy size={64} className="mx-auto mb-6 text-brutal-yellow" />
          <h3 className="text-4xl font-black uppercase mb-2">Topic Quiz Complete</h3>
          <p className="text-xl font-bold opacity-60 uppercase mb-8">You scored {score} out of {questions.length}</p>
          
          <div className="w-full h-6 bg-gray-100 brutal-border mb-12 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className="h-full bg-brutal-green border-r-4 border-black"
            />
          </div>

          <div className="space-y-8 text-left mb-12">
            <h4 className="text-2xl font-black uppercase italic border-b-4 border-black pb-2">Review Answers</h4>
            {answers.map((ans, i) => (
              <div key={i} className="p-6 brutal-border bg-gray-50">
                <div className="flex items-start gap-4 mb-4">
                  {ans.selected === ans.correct ? (
                    <CheckCircle2 className="text-brutal-green shrink-0" size={24} />
                  ) : (
                    <XCircle className="text-red-500 shrink-0" size={24} />
                  )}
                  <div>
                    <p className="font-black text-lg leading-tight mb-2">{ans.question}</p>
                    <p className={`font-bold ${ans.selected === ans.correct ? 'text-brutal-green' : 'text-red-500'}`}>
                      Your answer: {questions[i].options[ans.selected]}
                    </p>
                    {ans.selected !== ans.correct && (
                      <p className="text-brutal-green font-bold">
                        Correct answer: {questions[i].options[ans.correct]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white brutal-border border-dashed flex gap-3">
                  <HelpCircle className="text-brutal-blue shrink-0" size={20} />
                  <p className="text-sm font-medium text-gray-700 text-justify">{ans.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => onComplete(score)}
            className="w-full bg-brutal-black text-white py-4 brutal-border brutal-shadow font-black uppercase text-xl hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Continue to Next Lesson
          </button>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="py-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <span className="bg-brutal-pink px-4 py-1 brutal-border font-black uppercase text-xs mb-2 inline-block">
            Topic Quiz
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Question {currentIdx + 1}/{questions.length}</h2>
        </div>
        <div className="text-right">
          <span className="font-black uppercase text-xs opacity-60 block mb-1">Score</span>
          <span className="text-2xl font-black">{score}</span>
        </div>
      </div>

      <div className="w-full h-3 bg-gray-100 brutal-border mb-12 overflow-hidden">
        <motion.div 
          animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
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
          <h3 className="text-2xl font-black mb-10 leading-tight">
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
          {currentIdx === questions.length - 1 ? 'See Results' : 'Next Question'} <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};
