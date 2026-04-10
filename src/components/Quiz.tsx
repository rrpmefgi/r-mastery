import { BarChart3, CheckCircle2, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Lesson } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QuizProps {
  currentLesson: Lesson;
  quizAnswer: number | null;
  setQuizAnswer: (answer: number | null) => void;
  quizSubmitted: boolean;
  handleQuizSubmit: () => void;
  handleNextLesson: () => void;
  setShowQuiz: (show: boolean) => void;
  currentLessonIndex: number;
  totalLessons: number;
}

export default function Quiz({
  currentLesson,
  quizAnswer,
  setQuizAnswer,
  quizSubmitted,
  handleQuizSubmit,
  handleNextLesson,
  setShowQuiz,
  currentLessonIndex,
  totalLessons
}: QuizProps) {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-black mb-12 uppercase tracking-tight flex items-center gap-4">
        <BarChart3 className="text-brutal-yellow" size={40} />
        Knowledge Check
      </h2>
      
      <div className="bg-white brutal-border p-8 brutal-shadow-lg mb-12">
        <h3 className="text-2xl font-bold mb-8">{currentLesson.quiz.question}</h3>
        <div className="space-y-4">
          {currentLesson.quiz.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !quizSubmitted && setQuizAnswer(idx)}
              className={cn(
                "w-full text-left p-6 brutal-border font-bold transition-all flex items-center justify-between",
                quizAnswer === idx ? "bg-brutal-yellow scale-[1.02]" : "bg-white hover:bg-gray-50",
                quizSubmitted && idx === currentLesson.quiz.correctAnswer && "bg-brutal-green text-white",
                quizSubmitted && quizAnswer === idx && idx !== currentLesson.quiz.correctAnswer && "bg-red-500 text-white"
              )}
            >
              {option}
              {quizSubmitted && idx === currentLesson.quiz.correctAnswer && <CheckCircle2 size={24} />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowQuiz(false)}
          className="brutal-border px-6 py-3 font-bold brutal-3d"
        >
          BACK TO LESSON
        </button>
        
        {!quizSubmitted ? (
          <button
            onClick={handleQuizSubmit}
            disabled={quizAnswer === null}
            className="bg-brutal-black text-white brutal-border px-10 py-3 font-bold brutal-3d disabled:opacity-50"
          >
            SUBMIT ANSWER
          </button>
        ) : (
          <div className="flex flex-col items-end gap-2">
            {quizAnswer === currentLesson.quiz.correctAnswer && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="text-brutal-green font-black uppercase flex items-center gap-1"
              >
                <Zap size={16} /> +50 XP EARNED!
              </motion.div>
            )}
            <button
              onClick={handleNextLesson}
              disabled={currentLessonIndex === totalLessons - 1}
              className="bg-brutal-blue text-white brutal-border px-10 py-3 font-bold flex items-center gap-2 brutal-3d disabled:opacity-50"
            >
              {currentLessonIndex === totalLessons - 1 ? 'COURSE COMPLETE!' : 'NEXT LESSON'}
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
