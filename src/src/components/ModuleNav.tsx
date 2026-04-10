import { BookOpen, CheckCircle2 } from 'lucide-react';
import { Lesson } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ModuleNavProps {
  lessons: Lesson[];
  currentLessonIndex: number;
  setCurrentLessonIndex: (index: number) => void;
  setShowQuiz: (show: boolean) => void;
  setQuizAnswer: (answer: number | null) => void;
  setQuizSubmitted: (submitted: boolean) => void;
  userProfile: any;
  setActiveView: (view: any) => void;
  activeView: string;
}

export default function ModuleNav({
  lessons,
  currentLessonIndex,
  setCurrentLessonIndex,
  setShowQuiz,
  setQuizAnswer,
  setQuizSubmitted,
  userProfile,
  setActiveView,
  activeView
}: ModuleNavProps) {
  return (
    <div className="bg-white border-b-4 border-black p-4 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center gap-4 min-w-max">
        <div className="flex items-center gap-2 font-black uppercase text-xs tracking-widest mr-4">
          <BookOpen size={16} />
          Modules:
        </div>
        <div className="flex gap-3">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="flex gap-3">
              <button
                onClick={() => {
                  setCurrentLessonIndex(index);
                  setShowQuiz(false);
                  setQuizAnswer(null);
                  setQuizSubmitted(false);
                  setActiveView('lessons');
                }}
                className={cn(
                  "px-4 py-2 brutal-border font-black text-[10px] uppercase tracking-tighter transition-all flex items-center gap-2",
                  activeView === 'lessons' && currentLessonIndex === index 
                    ? "bg-brutal-blue text-white brutal-shadow" 
                    : "bg-white hover:bg-gray-100"
                )}
              >
                <span className="opacity-50">0{index + 1}</span>
                {lesson.title}
                {userProfile?.completedLessons?.includes(lesson.id) && (
                  <CheckCircle2 size={12} className="text-brutal-green" />
                )}
              </button>
              
              {lesson.title === 'Visualizing Data' && (
                <button
                  onClick={() => {
                    setActiveView('variables-data-types');
                  }}
                  className={cn(
                    "px-4 py-2 brutal-border font-black text-[10px] uppercase tracking-tighter transition-all flex items-center gap-2",
                    activeView === 'variables-data-types'
                      ? "bg-brutal-green text-white brutal-shadow" 
                      : "bg-white hover:bg-gray-100"
                  )}
                >
                  <span className="opacity-50">NEW</span>
                  Variables & Data Types
                </button>
              )}
            </div>
          ))}
          {!lessons.some(l => l.title === 'Visualizing Data') && (
            <button
              onClick={() => {
                setActiveView('variables-data-types');
              }}
              className={cn(
                "px-4 py-2 brutal-border font-black text-[10px] uppercase tracking-tighter transition-all flex items-center gap-2",
                activeView === 'variables-data-types'
                  ? "bg-brutal-green text-white brutal-shadow" 
                  : "bg-white hover:bg-gray-100"
              )}
            >
              <span className="opacity-50">NEW</span>
              Variables & Data Types
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
