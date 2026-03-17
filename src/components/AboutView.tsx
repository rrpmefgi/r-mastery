import React from 'react';
import { motion } from 'motion/react';
import { Info, Users, Target, Heart, Github, Linkedin, Mail } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-block bg-brutal-yellow p-4 brutal-border brutal-shadow mb-6">
          <Info size={48} />
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">About R-Mastery</h1>
        <p className="text-xl font-bold opacity-60 uppercase">Empowering the next generation of data scientists</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white brutal-border brutal-shadow-lg p-10 brutal-3d"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-brutal-blue brutal-border flex items-center justify-center text-white">
              <Target size={24} />
            </div>
            <h3 className="text-3xl font-black uppercase">Our Mission</h3>
          </div>
          <p className="text-lg font-bold text-black/60 leading-relaxed text-justify">
            R-Mastery was created to bridge the gap between complex statistical theory and practical application. 
            We believe that learning R should be structured, interactive, and accessible to everyone, 
            regardless of their technical background.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white brutal-border brutal-shadow-lg p-10 brutal-3d"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-brutal-pink brutal-border flex items-center justify-center text-white">
              <Users size={24} />
            </div>
            <h3 className="text-3xl font-black uppercase">The Community</h3>
          </div>
          <p className="text-lg font-bold text-black/60 leading-relaxed text-justify">
            With thousands of students worldwide, R-Mastery is more than just a tutorial platform. 
            It's a global community of data enthusiasts sharing knowledge, competing on leaderboards, 
            and building the future of data science together.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-brutal-black text-white p-12 brutal-border brutal-shadow-white mb-20"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 bg-white brutal-border brutal-shadow p-2 flex-shrink-0">
            <img 
              src="https://picsum.photos/seed/rushika/400/400" 
              alt="Rushika Patt" 
              className="w-full h-full object-cover brutal-border"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="text-4xl font-black uppercase mb-4 text-brutal-yellow italic">Meet the Creator</h3>
            <p className="text-xl font-bold mb-6 opacity-80 text-justify">
              Rushika Patt is a passionate data scientist and educator dedicated to making 
              complex concepts simple. R-Mastery is the culmination of years of experience 
              in statistical modeling and teaching.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white text-black brutal-border hover:bg-brutal-blue hover:text-white transition-all"><Github size={20} /></a>
              <a href="#" className="p-3 bg-white text-black brutal-border hover:bg-brutal-blue hover:text-white transition-all"><Linkedin size={20} /></a>
              <a href="#" className="p-3 bg-white text-black brutal-border hover:bg-brutal-blue hover:text-white transition-all"><Mail size={20} /></a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="text-center">
        <h3 className="text-3xl font-black uppercase mb-8">Join the journey</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 font-black uppercase text-sm">
            <Heart className="text-brutal-pink" fill="currentColor" /> 10k+ Students
          </div>
          <div className="flex items-center gap-2 font-black uppercase text-sm">
            <Heart className="text-brutal-pink" fill="currentColor" /> 50+ Tutorials
          </div>
          <div className="flex items-center gap-2 font-black uppercase text-sm">
            <Heart className="text-brutal-pink" fill="currentColor" /> 100% Free
          </div>
        </div>
      </div>
    </div>
  );
};
