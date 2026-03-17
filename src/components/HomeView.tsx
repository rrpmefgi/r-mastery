import React from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Code, BarChart, Database, Terminal, ArrowRight, Zap } from 'lucide-react';

interface HomeViewProps {
  onStart: () => void;
  onExplore: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStart, onExplore }) => {
  const learningPaths = [
    {
      level: '01',
      title: 'Foundations',
      category: 'R Programming Setup & Syntax',
      icon: Terminal,
      color: 'bg-brutal-blue',
      desc: 'Master the R environment, basic syntax, and fundamental data types like vectors and matrices.',
      skills: ['RStudio Setup', 'Basic Math', 'Data Types']
    },
    {
      level: '02',
      title: 'Wrangling',
      category: 'Logic & Data Structures',
      icon: Database,
      color: 'bg-brutal-pink',
      desc: 'Learn the Tidyverse way. Master dplyr and tidyr to clean and transform messy datasets.',
      skills: ['Dplyr', 'Tidyr', 'Joins']
    },
    {
      level: '03',
      title: 'Visualization',
      category: 'Data Engineering & ETL',
      icon: BarChart,
      color: 'bg-brutal-yellow',
      desc: 'Create publication-quality graphics with ggplot2. Master the grammar of graphics.',
      skills: ['Ggplot2', 'Themes', 'Faceting']
    },
    {
      level: '04',
      title: 'Analytics',
      category: 'Statistics using R',
      icon: Zap,
      color: 'bg-brutal-green',
      desc: 'Perform statistical testing, linear modeling, and build interactive dashboards with Shiny.',
      skills: ['Hypothesis Testing', 'Regression', 'Shiny']
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white px-4 py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 mb-8"
          >
            <div className="inline-block bg-brutal-yellow px-4 py-2 brutal-border font-black uppercase text-sm rotate-[-2deg] brutal-3d">
              The Ultimate R Programming Guide
            </div>
            <div className="text-xs font-black uppercase tracking-widest opacity-40">
              Created by Rushika Patt
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8"
          >
            Master <span className="text-brutal-blue">Data Science</span> <br />
            with <span className="bg-brutal-pink text-white px-2 md:px-4">R-Mastery</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl font-bold max-w-2xl mx-auto mb-12 leading-relaxed px-4 text-justify"
          >
            From installation to advanced statistical analysis. 
            A structured, brutalist approach to learning the world's 
            most powerful statistical language.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <button 
              onClick={onExplore}
              className="bg-brutal-black text-white px-12 py-6 text-3xl font-black uppercase brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-4 brutal-3d"
            >
              Explore Curriculum <BookOpen size={32} />
            </button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-[10%] hidden lg:block z-0"
        >
          <div className="w-24 h-24 bg-brutal-pink -rotate-12 opacity-80 brutal-3d" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-40 left-[10%] hidden lg:block z-0"
        >
          <div className="w-32 h-32 bg-brutal-yellow rounded-full opacity-80 brutal-3d" />
        </motion.div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24 px-4 bg-brutal-black text-white border-y-4 border-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.8]">
                The <span className="text-brutal-yellow">Roadmap</span> <br />
                to Mastery
              </h2>
              <p className="text-xl font-bold text-white/60 text-justify">
                A non-linear, skill-based progression system designed for maximum retention.
              </p>
            </div>
            <div className="bg-white text-black p-6 brutal-border brutal-shadow-white rotate-2 hidden md:block">
              <div className="text-xs font-black uppercase tracking-widest mb-2">Current Version</div>
              <div className="text-3xl font-black">v2.5.0-BETA</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-0 brutal-border border-white/20">
            {learningPaths.map((path, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`group relative bg-white text-black p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-black last:border-r-0 hover:bg-gray-50 transition-colors brutal-3d`}
              >
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-black text-white brutal-border flex items-center justify-center font-black text-xl z-20 group-hover:bg-brutal-yellow group-hover:text-black transition-colors">
                  {path.level}
                </div>
                
                <div className={`w-16 h-16 ${path.color} brutal-border flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                  <path.icon className="text-white" size={32} />
                </div>

                <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter leading-none">{path.title}</h3>
                <p className="font-bold text-black/60 mb-8 text-sm leading-relaxed text-justify">{path.desc}</p>
                
                <div className="space-y-2 mb-10">
                  {path.skills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                      <div className={`w-2 h-2 ${path.color} brutal-border`} />
                      {skill}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={onExplore}
                  className="w-full bg-black text-white py-3 brutal-border font-black uppercase text-xs tracking-widest hover:bg-brutal-blue transition-colors flex items-center justify-center gap-2"
                >
                  Explore Path <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Applications Section */}
      <section className="py-24 px-4 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 italic">
              R in the <span className="text-brutal-blue">Real World</span>
            </h2>
            <p className="text-xl font-bold opacity-60 uppercase max-w-3xl mx-auto text-justify">
              Beyond the classroom: How industry leaders use R to solve complex global challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Application 1: Healthcare */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white brutal-border brutal-shadow-lg p-8 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-brutal-pink/10 brutal-border rounded-full flex items-center justify-center mb-6">
                <Zap className="text-brutal-pink" size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">Epidemiology</h3>
              <p className="font-bold text-black/60 mb-6 text-justify">Tracking disease outbreaks and modeling vaccination impacts using the 'epir' package.</p>
              <div className="w-full h-2 bg-gray-100 brutal-border overflow-hidden">
                <div className="h-full bg-brutal-pink w-[85%]" />
              </div>
              <span className="text-[10px] font-black uppercase mt-2 opacity-40">85% of public health agencies use R</span>
            </motion.div>

            {/* Application 2: Finance */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white brutal-border brutal-shadow-lg p-8 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-brutal-yellow/10 brutal-border rounded-full flex items-center justify-center mb-6">
                <BarChart className="text-brutal-yellow" size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">Quantitative Finance</h3>
              <p className="font-bold text-black/60 mb-6 text-justify">Risk management and algorithmic trading at firms like Goldman Sachs and JP Morgan.</p>
              <div className="w-full h-2 bg-gray-100 brutal-border overflow-hidden">
                <div className="h-full bg-brutal-yellow w-[92%]" />
              </div>
              <span className="text-[10px] font-black uppercase mt-2 opacity-40">92% accuracy in predictive modeling</span>
            </motion.div>

            {/* Application 3: Tech */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white brutal-border brutal-shadow-lg p-8 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-brutal-blue/10 brutal-border rounded-full flex items-center justify-center mb-6">
                <Database className="text-brutal-blue" size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">User Behavior</h3>
              <p className="font-bold text-black/60 mb-6 text-justify">Facebook and Google use R for sentiment analysis and A/B testing optimization.</p>
              <div className="w-full h-2 bg-gray-100 brutal-border overflow-hidden">
                <div className="h-full bg-brutal-blue w-[78%]" />
              </div>
              <span className="text-[10px] font-black uppercase mt-2 opacity-40">78% faster insight generation</span>
            </motion.div>
          </div>

          {/* Case Study Diagram Section */}
          <div className="bg-brutal-black text-white p-12 brutal-border brutal-shadow-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
                <span className="bg-white text-black px-4 py-1 brutal-border italic">Case Study</span>
                Global Climate Modeling
              </h3>

              <div className="grid lg:grid-cols-4 gap-4 relative">
                {/* Step 1 */}
                <div className="bg-white/10 p-6 brutal-border border-white/20 relative">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-brutal-pink brutal-border flex items-center justify-center font-black text-xl">01</div>
                  <h4 className="font-black uppercase text-sm mb-4 text-brutal-pink">Data Ingestion</h4>
                  <p className="text-xs font-bold opacity-60 text-justify">Collecting TBs of satellite data using 'ncdf4' and 'raster' packages.</p>
                </div>

                {/* Arrow Desktop */}
                <div className="hidden lg:flex items-center justify-center">
                  <ArrowRight size={32} className="text-white/20" />
                </div>

                {/* Step 2 */}
                <div className="bg-white/10 p-6 brutal-border border-white/20 relative">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-brutal-yellow brutal-border flex items-center justify-center font-black text-xl text-black">02</div>
                  <h4 className="font-black uppercase text-sm mb-4 text-brutal-yellow">Processing</h4>
                  <p className="text-xs font-bold opacity-60 text-justify">Parallel processing with 'future' and 'foreach' to handle massive datasets.</p>
                </div>

                {/* Arrow Desktop */}
                <div className="hidden lg:flex items-center justify-center">
                  <ArrowRight size={32} className="text-white/20" />
                </div>

                {/* Step 3 */}
                <div className="bg-white/10 p-6 brutal-border border-white/20 relative">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-brutal-blue brutal-border flex items-center justify-center font-black text-xl">03</div>
                  <h4 className="font-black uppercase text-sm mb-4 text-brutal-blue">Visualization</h4>
                  <p className="text-xs font-bold opacity-60 text-justify">Generating 4D climate maps with 'ggplot2' and 'rayshader'.</p>
                </div>
              </div>

              <div className="mt-12 flex flex-col md:flex-row items-center gap-8 bg-white/5 p-8 brutal-border border-white/10">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 brutal-border bg-white p-2">
                    <div className="w-full h-full bg-brutal-black flex items-center justify-center">
                      <BarChart className="text-brutal-pink" size={48} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase mb-2 italic">The Result</h4>
                  <p className="font-bold opacity-80 text-justify">R enabled researchers at the IPCC to reduce simulation time by 60%, leading to more accurate predictions of sea-level rise for the 2026 report.</p>
                </div>
              </div>
            </div>

            {/* Background Graphic */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)', backgroundSize: '100px 100px' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
