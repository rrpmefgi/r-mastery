import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AITutor({ currentLesson }: { currentLesson: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hi! I'm your R-Mastery AI Tutor. I'm here to help you with the "${currentLesson.title}" lesson. What's on your mind?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({ 
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are an expert R programming tutor. You are helping a student learn R. The current lesson is "${currentLesson.title}". The lesson description is: "${currentLesson.description}". The lesson content is: "${currentLesson.content}". Answer the student's questions concisely and accurately. Use code examples where appropriate.`
        }
      });

      // sendMessage only accepts the message parameter
      const result = await chat.sendMessage({ message: userMessage });
      const text = result.text;

      setMessages(prev => [...prev, { role: 'model', text: text || "I'm not sure how to respond to that." }]);
    } catch (error) {
      console.error('AI Tutor error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having some trouble connecting right now. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-brutal-pink brutal-border p-4 brutal-shadow-lg brutal-3d z-50 hover:scale-110 transition-transform"
      >
        <Sparkles size={24} className="text-white" />
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white border-l-8 border-black z-[60] flex flex-col brutal-shadow-lg"
          >
            {/* Header */}
            <div className="bg-brutal-pink p-6 border-b-4 border-black flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white brutal-border flex items-center justify-center">
                  <Bot size={24} className="text-brutal-pink" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-white">AI Tutor</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Powered by Gemini</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-white brutal-border p-2 brutal-3d"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 dot-grid"
            >
              {messages.map((m, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex flex-col gap-2",
                    m.role === 'user' ? "items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "flex items-center gap-2 font-black uppercase text-[10px] tracking-widest",
                    m.role === 'user' ? "text-brutal-blue" : "text-brutal-pink"
                  )}>
                    {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    {m.role === 'user' ? 'You' : 'AI Tutor'}
                  </div>
                  <div className={cn(
                    "max-w-[85%] p-4 brutal-border font-bold text-sm leading-relaxed",
                    m.role === 'user' ? "bg-brutal-blue text-white brutal-shadow" : "bg-white brutal-shadow"
                  )}>
                    {m.text || ''}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-brutal-pink font-black uppercase text-[10px] tracking-widest animate-pulse">
                  <Loader2 size={12} className="animate-spin" />
                  AI is thinking...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t-4 border-black bg-white">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-white brutal-border p-4 font-bold focus:outline-none focus:bg-gray-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-brutal-yellow brutal-border p-4 brutal-3d disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
