import React from 'react';
import { motion } from 'motion/react';
import { tutorials } from '../data/tutorials';
import { Tutorial } from '../types';
import { Search, Play } from 'lucide-react';

interface TutorialListProps {
  onSelect: (tutorial: Tutorial) => void;
  initialCategory?: string;
}

export const TutorialList: React.FC<TutorialListProps> = ({ onSelect, initialCategory = 'All' }) => {
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string>(initialCategory);

  React.useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const categories = ['All', ...new Set(tutorials.map(t => t.category))];

  const filtered = tutorials.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                         t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">
          Course <span className="bg-brutal-pink text-white px-2">Curriculum</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
            <input 
              type="text"
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 brutal-border bg-white font-bold focus:outline-none focus:bg-brutal-yellow/10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 brutal-border font-bold uppercase text-sm whitespace-nowrap transition-colors ${
                  activeCategory === cat ? 'bg-brutal-black text-white' : 'bg-white hover:bg-brutal-yellow'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filtered.map((tutorial, idx) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelect(tutorial)}
            className="group bg-white brutal-border brutal-shadow hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all cursor-pointer flex flex-col"
          >
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-brutal-yellow px-2 py-1 brutal-border text-[10px] font-black uppercase">
                  {tutorial.category}
                </span>
                <span className="font-mono text-xs font-bold opacity-30">0{idx + 1}</span>
              </div>
              <h3 className="text-2xl font-black uppercase mb-3 group-hover:text-brutal-blue transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-black/60 font-medium text-sm leading-relaxed">
                {tutorial.description}
              </p>
            </div>
            <div className="p-4 border-t-2 border-black bg-black/5 flex justify-between items-center group-hover:bg-brutal-black group-hover:text-white transition-colors">
              <span className="font-bold uppercase text-xs">Start Lesson</span>
              <Play size={16} fill="currentColor" />
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white brutal-border brutal-shadow">
          <h3 className="text-3xl font-black uppercase mb-2">No lessons found</h3>
          <p className="font-bold opacity-50">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
