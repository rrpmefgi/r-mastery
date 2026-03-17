import React from 'react';
import { motion } from 'motion/react';
import { tutorials } from '../data/tutorials';
import { Tutorial } from '../types';
import { Search, Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface TutorialListProps {
  onSelect: (tutorial: Tutorial) => void;
  initialCategory?: string;
}

export const TutorialList: React.FC<TutorialListProps> = ({ onSelect, initialCategory = 'All' }) => {
  const [search, setSearch] = React.useState('');
  const categories = React.useMemo(() => [...new Set(tutorials.map(t => t.category.toUpperCase()))], []);
  const [activeCategory, setActiveCategory] = React.useState<string>(
    initialCategory.toUpperCase() === 'ALL' ? categories[0] : initialCategory.toUpperCase()
  );
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (initialCategory.toUpperCase() === 'ALL') {
      setActiveCategory(categories[0]);
    } else {
      setActiveCategory(initialCategory.toUpperCase());
    }
  }, [initialCategory, categories]);

  const filtered = tutorials.filter(t => {
    const searchLower = search.toLowerCase().trim();
    const matchesSearch = searchLower === '' || 
                         t.title.toLowerCase().includes(searchLower) || 
                         t.description.toLowerCase().includes(searchLower);
    const matchesCategory = t.category.toUpperCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-8">
          <button 
            onClick={() => scroll('left')}
            className="p-2 brutal-border bg-white hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar py-2 flex-1"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 brutal-border font-black uppercase text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-black text-white' 
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="p-2 brutal-border bg-white hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={20} />
          <input 
            type="text"
            placeholder="Search lessons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 brutal-border bg-white font-bold focus:outline-none focus:bg-brutal-yellow/5"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((tutorial, idx) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx % 3 * 0.1 }}
            onClick={() => onSelect(tutorial)}
            className="group bg-white brutal-border brutal-shadow-lg hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all cursor-pointer flex flex-col brutal-3d"
          >
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-brutal-yellow px-3 py-1 brutal-border text-[10px] font-black uppercase">
                  {tutorial.category}
                </span>
                <span className="font-mono text-xs font-black opacity-20">#{idx + 1}</span>
              </div>
              <h3 className="text-4xl font-black uppercase mb-4 group-hover:text-brutal-blue transition-colors leading-[0.9]">
                {tutorial.title}
              </h3>
              <p className="text-black/60 font-bold text-sm leading-relaxed text-justify">
                {tutorial.description}
              </p>
            </div>
            <div className="p-6 border-t-2 border-black bg-white flex justify-between items-center group-hover:bg-brutal-black group-hover:text-white transition-colors">
              <span className="font-black uppercase text-xs tracking-widest italic">Start Lesson</span>
              <Play size={20} fill="currentColor" />
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-32 bg-white brutal-border brutal-shadow-lg">
          <Search size={64} className="mx-auto mb-6 opacity-20" />
          <h3 className="text-4xl font-black uppercase mb-2">No lessons found</h3>
          <p className="font-bold opacity-50 uppercase">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
