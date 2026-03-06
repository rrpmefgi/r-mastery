/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { TutorialList } from './components/TutorialList';
import { TutorialViewer } from './components/TutorialViewer';
import { tutorials } from './data/tutorials';
import { LessonCreator } from './components/LessonCreator';
import { Tutorial, ViewState } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Twitter, Linkedin, Mail, Settings } from 'lucide-react';

export default function App() {
  const [view, setView] = React.useState<ViewState | 'admin'>('home');
  const [selectedTutorial, setSelectedTutorial] = React.useState<Tutorial | null>(null);
  const [curriculumCategory, setCurriculumCategory] = React.useState<string>('All');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSelectTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setView('tutorial');
    window.scrollTo(0, 0);
  };

  const handleViewCurriculum = (category: string = 'All') => {
    setCurriculumCategory(category);
    setView('curriculum');
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (!selectedTutorial) return;
    const idx = tutorials.findIndex(t => t.id === selectedTutorial.id);
    if (idx < tutorials.length - 1) {
      handleSelectTutorial(tutorials[idx + 1]);
    }
  };

  const handlePrev = () => {
    if (!selectedTutorial) return;
    const idx = tutorials.findIndex(t => t.id === selectedTutorial.id);
    if (idx > 0) {
      handleSelectTutorial(tutorials[idx - 1]);
    }
  };

  const currentIndex = selectedTutorial ? tutorials.findIndex(t => t.id === selectedTutorial.id) : -1;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onHome={() => setView('home')} 
        onTutorials={() => handleViewCurriculum('All')}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomeView 
                onStart={() => handleViewCurriculum('All')} 
                onCategorySelect={handleViewCurriculum}
              />
            </motion.div>
          ) : view === 'curriculum' ? (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              <TutorialList 
                onSelect={handleSelectTutorial} 
                initialCategory={curriculumCategory}
              />
            </motion.div>
          ) : view === 'admin' ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LessonCreator />
            </motion.div>
          ) : (
            <motion.div
              key="tutorial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {selectedTutorial && (
                <TutorialViewer 
                  tutorial={selectedTutorial} 
                  onBack={() => setView('curriculum')}
                  onNext={currentIndex < tutorials.length - 1 ? handleNext : undefined}
                  onPrev={currentIndex > 0 ? handlePrev : undefined}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-brutal-black text-white py-16 px-4 border-t-4 border-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-black uppercase mb-6 tracking-tighter">R-Mastery</h2>
            <p className="text-white/60 font-medium max-w-sm">
              Empowering the next generation of data scientists with high-quality, 
              accessible R programming education.
            </p>
          </div>
          
          <div>
            <h4 className="font-black uppercase mb-6 text-brutal-yellow">Quick Links</h4>
            <ul className="flex flex-col gap-4 font-bold uppercase text-sm">
              <li><button onClick={() => setView('home')} className="hover:text-brutal-blue transition-colors">Home</button></li>
              <li><button onClick={() => handleViewCurriculum('All')} className="hover:text-brutal-pink transition-colors">Curriculum</button></li>
              <li><a href="#" className="hover:text-brutal-blue transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase mb-6 text-brutal-pink">Student Message</h4>
            <p className="text-sm font-medium mb-4 text-white/60">Have a question? Send a message to the team.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent! Thank you.'); }} className="flex flex-col gap-2">
              <textarea 
                placeholder="Write your message here..." 
                rows={3}
                className="bg-white text-black p-3 brutal-border w-full font-bold focus:outline-none resize-none text-sm"
              />
              <button type="submit" className="bg-brutal-yellow text-black py-2 brutal-border font-black uppercase text-xs hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">Send Message</button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-xs font-bold uppercase tracking-widest text-white/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} R-Mastery Tutorial Platform.</span>
          <span className="text-brutal-yellow">Created by Rushika Patt</span>
          <span>Built for Students.</span>
        </div>
      </footer>
    </div>
  );
}
