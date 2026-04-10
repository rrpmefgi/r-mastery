import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import Markdown from 'react-markdown';
import { Lesson } from '../types';
import CodePlayground from './CodePlayground';

interface LessonContentProps {
  currentLesson: Lesson;
  currentLessonIndex: number;
  totalLessons: number;
  handlePrevLesson: () => void;
  setShowQuiz: (show: boolean) => void;
  isBookmarked: boolean;
  toggleBookmark: () => void;
}

export default function LessonContent({
  currentLesson,
  currentLessonIndex,
  totalLessons,
  handlePrevLesson,
  setShowQuiz,
  isBookmarked,
  toggleBookmark
}: LessonContentProps) {
  return (
    <>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <span className="bg-brutal-pink text-white px-3 py-1 font-bold brutal-border text-sm mb-4 inline-block">
            LESSON {currentLessonIndex + 1} OF {totalLessons}
          </span>
          <h2 className="text-5xl font-black mb-4 tracking-tight uppercase leading-none">
            {currentLesson.title}
          </h2>
          <p className="text-xl text-gray-600 font-medium italic">
            {currentLesson.description}
          </p>
        </div>
        <button 
          onClick={toggleBookmark}
          className={`p-4 brutal-border brutal-3d transition-all ${isBookmarked ? 'bg-brutal-blue text-white' : 'bg-white text-black'}`}
          title={isBookmarked ? "Remove from Library" : "Add to Library"}
        >
          <Bookmark size={24} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="markdown-body mb-12">
        <Markdown>{currentLesson.content || ''}</Markdown>
      </div>

      <CodePlayground initialCode={currentLesson.codeExample} />

      <div className="flex justify-between items-center pt-8 border-t-4 border-black">
        <button
          onClick={handlePrevLesson}
          disabled={currentLessonIndex === 0}
          className="brutal-border px-6 py-3 font-bold flex items-center gap-2 brutal-3d disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft size={20} />
          PREVIOUS
        </button>
        <button
          onClick={() => setShowQuiz(true)}
          className="bg-brutal-blue text-white brutal-border px-8 py-3 font-bold flex items-center gap-2 brutal-3d"
        >
          TAKE QUIZ
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
