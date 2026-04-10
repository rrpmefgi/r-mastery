import { Code, ChevronRight } from 'lucide-react';

export default function Curriculum({ handleLogin }: { handleLogin: () => void }) {
  const curriculumItems = [
    { title: "Foundations", color: "bg-brutal-blue", desc: "Syntax, vectors, and data types." },
    { title: "Wrangling", color: "bg-brutal-pink", desc: "Master the Tidyverse and dplyr." },
    { title: "Visualization", color: "bg-brutal-yellow", desc: "Create stunning plots with ggplot2." },
    { title: "Variables & Data Types", color: "bg-brutal-green", desc: "Master the building blocks of R code." },
    { title: "Analytics", color: "bg-white", desc: "Modeling and statistical inference." }
  ];

  return (
    <div id="curriculum" className="bg-black py-24 px-6 md:px-12 diagonal-stripes relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-8 py-4 brutal-border brutal-shadow font-black uppercase tracking-widest text-xl">
        Explore Curriculum
      </div>
      
      <div className="max-w-7xl mx-auto pt-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              THE ROADMAP<br />TO MASTERY
            </h2>
            <div className="absolute -top-8 -right-8 bg-brutal-green text-black px-3 py-1 brutal-border font-black text-xs rotate-12">
              v2.5.0-BETA
            </div>
          </div>
          <div className="bg-brutal-yellow brutal-border p-6 max-w-md brutal-shadow-white">
            <p className="font-black uppercase text-sm leading-tight">
              Our roadmap is designed to take you from zero to data science hero using the most powerful tools in the R ecosystem.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {curriculumItems.map((item, i) => (
            <div 
              key={i} 
              onClick={handleLogin}
              className={`${item.color} brutal-border p-8 brutal-shadow-white brutal-3d cursor-pointer group flex flex-col h-full`}
            >
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-6 brutal-shadow">
                 <Code size={24} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="font-bold text-sm uppercase opacity-80 mb-8">{item.desc}</p>
              <div className="mt-auto flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                Explore Path <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
