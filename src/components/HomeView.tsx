import React from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Code, BarChart, Database, Terminal, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  onStart: () => void;
  onCategorySelect: (category: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStart, onCategorySelect }) => {
  const learningPaths = [
    {
      title: 'Setup & Syntax',
      category: 'R Programming Setup & Syntax',
      icon: <Terminal className="text-brutal-blue" size={32} />,
      color: 'bg-brutal-blue/10',
      desc: 'Master the R environment, syntax, and basic building blocks.'
    },
    {
      title: 'Logic & Structures',
      category: 'Logic & Data Structures',
      icon: <Code className="text-brutal-pink" size={32} />,
      color: 'bg-brutal-pink/10',
      desc: 'Learn decision making, loops, and fundamental data structures.'
    },
    {
      title: 'Data Engineering',
      category: 'Data Engineering & ETL',
      icon: <Database className="text-brutal-yellow" size={32} />,
      color: 'bg-brutal-yellow/10',
      desc: 'Master ETL processes and data manipulation with the Tidyverse.'
    },
    {
      title: 'Statistics',
      category: 'Statistics using R',
      icon: <BarChart className="text-brutal-green" size={32} />,
      color: 'bg-brutal-green/10',
      desc: 'Perform statistical analysis and hypothesis testing.'
    },
    {
      title: 'Data Visulisation Basic Graphs',
      category: 'Data visualisation basic graphs',
      icon: <BookOpen className="text-brutal-blue" size={32} />,
      color: 'bg-brutal-blue/10',
      desc: 'Master the built-in plotting functions of R.'
    },
    {
      title: 'ggplot2',
      category: 'ggplot2 in R',
      icon: <Code className="text-brutal-pink" size={32} />,
      color: 'bg-brutal-pink/10',
      desc: 'Create professional graphics with the Grammar of Graphics.'
    },
    {
      title: 'Plotly',
      category: 'Plotly in R',
      icon: <Terminal className="text-brutal-yellow" size={32} />,
      color: 'bg-brutal-yellow/10',
      desc: 'Build interactive, web-based visualizations.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white px-4 py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 mb-8"
          >
            <div className="inline-block bg-brutal-yellow px-4 py-2 brutal-border font-black uppercase text-sm rotate-[-2deg]">
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
            className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 md:mb-12"
          >
            Master <span className="text-brutal-blue">Data Science</span> <br />
            with <span className="bg-brutal-pink text-white px-2 md:px-4">R-Mastery</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl font-bold max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4"
          >
            From installation to advanced statistical analysis. 
            A structured, brutalist approach to learning the world's 
            most powerful statistical language.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button 
              onClick={onStart}
              className="group relative bg-brutal-black text-white px-10 py-5 text-2xl font-black uppercase brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3"
            >
              Start Learning <Play fill="white" size={24} />
            </button>
            <button className="bg-white text-black px-10 py-5 text-2xl font-black uppercase brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              View Resources
            </button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-[10%] hidden lg:block"
        >
          <div className="w-24 h-24 brutal-border bg-brutal-pink -rotate-12" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-40 left-[10%] hidden lg:block"
        >
          <div className="w-32 h-32 brutal-border bg-brutal-yellow rounded-full" />
        </motion.div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24 px-4 bg-brutal-black text-white border-y-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">
              Structured <span className="text-brutal-yellow">Learning Paths</span>
            </h2>
            <p className="text-xl font-bold text-white/60 max-w-2xl">
              We've organized the curriculum into logical stages to take you from zero to data hero.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {learningPaths.map((path, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white text-black p-8 brutal-border brutal-shadow-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <div className={`w-16 h-16 ${path.color} brutal-border flex items-center justify-center mb-6`}>
                  {path.icon}
                </div>
                <h3 className="text-2xl font-black uppercase mb-4">{path.title}</h3>
                <p className="font-bold text-black/60 mb-6">{path.desc}</p>
                <button 
                  onClick={() => onCategorySelect(path.category)}
                  className="flex items-center gap-2 font-black uppercase text-sm hover:text-brutal-blue transition-colors"
                >
                  Explore <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why R Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
              Why Learn <br /><span className="bg-brutal-blue text-white px-2">R Programming?</span>
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-brutal-pink brutal-border flex items-center justify-center font-black text-xl">1</div>
                <div>
                  <h4 className="text-xl font-black uppercase mb-2">Statistical Power</h4>
                  <p className="font-bold text-black/60">Built by statisticians, for statisticians. R handles complex data analysis with ease.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-brutal-yellow brutal-border flex items-center justify-center font-black text-xl">2</div>
                <div>
                  <h4 className="text-xl font-black uppercase mb-2">Visualization King</h4>
                  <p className="font-bold text-black/60">Create publication-quality graphics with ggplot2 and other powerful visualization tools.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-brutal-green brutal-border flex items-center justify-center font-black text-xl">3</div>
                <div>
                  <h4 className="text-xl font-black uppercase mb-2">Industry Standard</h4>
                  <p className="font-bold text-black/60">Used by top tech companies, research institutions, and data scientists worldwide.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="brutal-border brutal-shadow bg-brutal-black p-4 rotate-2">
              <div className="bg-white p-8 brutal-border">
                <pre className="font-mono text-sm overflow-x-auto">
                  <code className="text-brutal-blue">
{`# Sample R Code
library(ggplot2)

# Create a stunning plot
ggplot(mtcars, aes(x=wt, y=mpg)) +
  geom_point(size=3, color="#FF0066") +
  theme_minimal() +
  labs(title="Weight vs MPG")`}
                  </code>
                </pre>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brutal-yellow brutal-border -z-10 rotate-12" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-brutal-pink border-t-4 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-white">
            Ready to become an <br />R Master?
          </h2>
          <p className="text-xl md:text-2xl font-bold text-white/90 mb-12">
            Join thousands of students and start your data science journey today. 
            Free, structured, and effective.
          </p>
          <button 
            onClick={onStart}
            className="bg-white text-black px-8 md:px-12 py-4 md:py-6 text-xl md:text-3xl font-black uppercase brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};
