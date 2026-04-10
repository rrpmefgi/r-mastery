import { CheckCircle2, Circle, Play } from 'lucide-react';
import { Lesson } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QuizzesProps {
  lessons: Lesson[];
  userProfile: any;
  setCurrentLessonIndex: (index: number) => void;
  setShowQuiz: (show: boolean) => void;
  setActiveView: (view: any) => void;
}

export default function Quizzes({ lessons, userProfile, setCurrentLessonIndex, setShowQuiz, setActiveView }: QuizzesProps) {
  const completedLessonIds = userProfile?.completedLessons || [];

  const handleStartQuiz = (index: number) => {
    setCurrentLessonIndex(index);
    setShowQuiz(true);
    setActiveView('lessons');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto my-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="bg-brutal-yellow p-3 brutal-border brutal-shadow">
          <CheckCircle2 size={32} className="text-black" />
        </div>
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-black">Mastery Quizzes</h2>
          <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Test Your R Knowledge</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          return (
            <div 
              key={lesson.id}
              className={cn(
                "bg-white brutal-border p-6 brutal-shadow transition-all hover:-translate-y-1 group",
                isCompleted && "border-brutal-green"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-black uppercase tracking-tight leading-tight group-hover:text-brutal-blue transition-colors">
                  {lesson.title}
                </h3>
                {isCompleted && (
                  <div className="text-brutal-green">
                    <CheckCircle2 size={24} />
                  </div>
                )}
              </div>
              <p className="text-sm font-bold text-black/60 mb-6 italic">
                Quiz: {lesson.quiz?.question?.substring(0, 50) || 'No question available'}...
              </p>
              <button 
                onClick={() => handleStartQuiz(index)}
                className={cn(
                  "w-full brutal-border py-2 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 brutal-3d",
                  isCompleted ? "bg-brutal-green text-white" : "bg-brutal-yellow text-black"
                )}
              >
                <Play size={14} />
                {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
