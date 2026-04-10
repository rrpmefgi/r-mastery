import { Bookmark, Play, Trash2 } from 'lucide-react';
import { Lesson } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LibraryProps {
  lessons: Lesson[];
  userProfile: any;
  setCurrentLessonIndex: (index: number) => void;
  setActiveView: (view: any) => void;
}

export default function Library({ lessons, userProfile, setCurrentLessonIndex, setActiveView }: LibraryProps) {
  const bookmarkedLessonIds = userProfile?.library || [];
  const bookmarkedLessons = lessons.filter(l => bookmarkedLessonIds.includes(l.id));

  const handleStartLesson = (lessonId: string) => {
    const index = lessons.findIndex(l => l.id === lessonId);
    if (index !== -1) {
      setCurrentLessonIndex(index);
      setActiveView('lessons');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto my-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="bg-brutal-blue p-3 brutal-border brutal-shadow">
          <Bookmark size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-black">My Library</h2>
          <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Saved Lessons & Tutorials</span>
        </div>
      </div>

      {bookmarkedLessons.length === 0 ? (
        <div className="bg-white brutal-border p-12 text-center brutal-shadow">
          <p className="text-2xl font-black uppercase mb-4 opacity-20">Your library is empty</p>
          <button 
            onClick={() => setActiveView('lessons')}
            className="bg-brutal-yellow brutal-border px-8 py-3 font-black brutal-3d uppercase tracking-tighter"
          >
            Explore Lessons
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarkedLessons.map((lesson) => (
            <div 
              key={lesson.id}
              className="bg-white brutal-border p-6 brutal-shadow transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-black uppercase tracking-tight leading-tight group-hover:text-brutal-blue transition-colors">
                  {lesson.title}
                </h3>
              </div>
              <p className="text-sm font-bold text-black/60 mb-6 line-clamp-2 italic">
                {lesson.description}
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleStartLesson(lesson.id)}
                  className="flex-1 bg-brutal-yellow brutal-border py-2 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 brutal-3d"
                >
                  <Play size={14} />
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
