import React from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Sparkles, Wand2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const LessonCreator: React.FC = () => {
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [category, setCategory] = React.useState('R Programming Setup & Syntax');
  const [content, setContent] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generatedCode = `  {
    id: '${title.toLowerCase().replace(/\s+/g, '-')}',
    title: '${title}',
    description: '${desc}',
    category: '${category}',
    content: \`
${content}
\`
  },`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWithAI = async () => {
    if (!title) return alert("Please enter a title first!");
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a detailed R programming tutorial for students about "${title}". 
        Include an introduction, why it's important, and 2-3 clear code examples with comments. 
        Format it in clean Markdown with headings (##).`,
      });
      setContent(response.text || '');
    } catch (error) {
      console.error(error);
      alert("AI generation failed. Please check your connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white brutal-border brutal-shadow-lg p-8">
        <h2 className="text-4xl font-black uppercase mb-2">Lesson Creator</h2>
        <p className="font-bold opacity-60 mb-8 uppercase text-sm">Fill this out to generate your lesson code</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <label className="font-black uppercase text-xs">Lesson Title</label>
            <input 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Advanced Plotting"
              className="brutal-border p-3 font-bold focus:bg-brutal-yellow/10 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-black uppercase text-xs">Category</label>
            <select 
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="brutal-border p-3 font-bold bg-white outline-none"
            >
              <option>R Programming Setup & Syntax</option>
              <option>Logic & Data Structures</option>
              <option>Data Engineering & ETL</option>
              <option>Statistical analysis in R</option>
              <option>Data visualisation basic graphs</option>
              <option>Statistics using R</option>
              <option>ggplot2 in R</option>
              <option>Plotly in R</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-black uppercase text-xs">Short Description</label>
            <input 
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="A brief summary for the card..."
              className="brutal-border p-3 font-bold focus:bg-brutal-yellow/10 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <div className="flex justify-between items-end">
            <label className="font-black uppercase text-xs">Lesson Content (Markdown)</label>
            <button 
              onClick={generateWithAI}
              disabled={isGenerating}
              className="bg-brutal-pink text-white px-4 py-1 brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs font-black uppercase flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? "Generating..." : <><Wand2 size={14} /> Generate with AI</>}
            </button>
          </div>
          <textarea 
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your lesson here using Markdown..."
            rows={10}
            className="brutal-border p-4 font-mono text-sm focus:bg-brutal-yellow/10 outline-none"
          />
        </div>

        <div className="bg-brutal-black text-white p-6 brutal-border relative group">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-black uppercase text-brutal-yellow">Your Generated Code</span>
            <button 
              onClick={handleCopy}
              className="bg-white text-black px-4 py-2 brutal-border brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs font-black uppercase flex items-center gap-2"
            >
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Code</>}
            </button>
          </div>
          <pre className="text-[10px] overflow-x-auto opacity-80 leading-tight">
            {generatedCode}
          </pre>
        </div>

        <div className="mt-8 p-4 bg-brutal-blue/10 brutal-border border-brutal-blue">
          <h4 className="font-black uppercase text-sm text-brutal-blue mb-2 flex items-center gap-2">
            <Sparkles size={16} /> How to save:
          </h4>
          <ol className="text-xs font-bold list-decimal ml-4 flex flex-col gap-1">
            <li>Click the "Copy Code" button above.</li>
            <li>Open the file <code className="bg-white px-1">src/data/tutorials.ts</code> in your editor.</li>
            <li>Scroll to the very bottom.</li>
            <li>Paste the code right before the last <code className="bg-white px-1">];</code> line.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
