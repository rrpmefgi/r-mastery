import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Zap, Clock, CheckCircle2, AlertTriangle, Lock, Terminal } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  reward: string;
  timeLimit: number; // in seconds
  difficulty: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert' | 'Grandmaster';
}

const QUESTS: Quest[] = [
  {
    id: 'quest-1',
    title: "The Broken Loop",
    description: "Fix the syntax error in this for loop. It should print numbers 1 to 5.",
    initialCode: "for (i in 1:5) {\n  print(i\n}",
    solution: "for (i in 1:5) {\n  print(i)\n}",
    reward: "500 XP",
    timeLimit: 30,
    difficulty: 'Basic'
  },
  {
    id: 'quest-2',
    title: "Vector Math",
    description: "Create a vector 'x' with values 10, 20, 30 and calculate its mean.",
    initialCode: "x <- c(10, 20)\n# Add 30 and calculate mean\nmean(x)",
    solution: "x <- c(10, 20, 30)\nmean(x)",
    reward: "500 XP",
    timeLimit: 30,
    difficulty: 'Intermediate'
  },
  {
    id: 'quest-3',
    title: "Data Frame Filter",
    description: "Filter the built-in 'mtcars' data frame to show only cars with mpg > 30.",
    initialCode: "mtcars[mtcars$mpg, ]",
    solution: "mtcars[mtcars$mpg > 30, ]",
    reward: "500 XP",
    timeLimit: 45,
    difficulty: 'Advanced'
  },
  {
    id: 'quest-4',
    title: "Custom Function",
    description: "Write a function 'square' that takes a number and returns its square.",
    initialCode: "square <- function(n) {\n  # Your code here\n}",
    solution: "square <- function(n) {\n  return(n^2)\n}",
    reward: "500 XP",
    timeLimit: 60,
    difficulty: 'Expert'
  },
  {
    id: 'quest-5',
    title: "The Grandmaster Challenge",
    description: "Use 'lapply' to calculate the square root of numbers 1 to 10 and return a vector.",
    initialCode: "results <- lapply(1:10, function(x) x)\n# Convert to vector\nunlist(results)",
    solution: "results <- lapply(1:10, sqrt)\nunlist(results)",
    reward: "500 XP + Grandmaster Badge",
    timeLimit: 60,
    difficulty: 'Grandmaster'
  },
  {
    id: 'quest-6',
    title: "String Manipulation",
    description: "Convert the string 'hello world' to uppercase using an R function.",
    initialCode: "s <- 'hello world'\n# Your code here",
    solution: "s <- 'hello world'\ntoupper(s)",
    reward: "500 XP",
    timeLimit: 30,
    difficulty: 'Basic'
  },
  {
    id: 'quest-7',
    title: "Matrix Creation",
    description: "Create a 3x3 matrix with numbers 1 to 9.",
    initialCode: "m <- matrix(1:9)\n# Adjust dimensions",
    solution: "m <- matrix(1:9, nrow=3, ncol=3)",
    reward: "500 XP",
    timeLimit: 45,
    difficulty: 'Intermediate'
  },
  {
    id: 'quest-8',
    title: "Logical Indexing",
    description: "Given vector v <- c(1, 5, 8, 2, 10), find all elements greater than 5.",
    initialCode: "v <- c(1, 5, 8, 2, 10)\n# Your code here",
    solution: "v <- c(1, 5, 8, 2, 10)\nv[v > 5]",
    reward: "500 XP",
    timeLimit: 30,
    difficulty: 'Intermediate'
  },
  {
    id: 'quest-9',
    title: "List Access",
    description: "Access the second element of the list L <- list(a=1, b=2, c=3).",
    initialCode: "L <- list(a=1, b=2, c=3)\n# Your code here",
    solution: "L <- list(a=1, b=2, c=3)\nL[[2]]",
    reward: "500 XP",
    timeLimit: 30,
    difficulty: 'Basic'
  },
  {
    id: 'quest-10',
    title: "Data Summary",
    description: "Get the summary statistics of the 'hp' column in 'mtcars'.",
    initialCode: "summary(mtcars)",
    solution: "summary(mtcars$hp)",
    reward: "500 XP",
    timeLimit: 30,
    difficulty: 'Basic'
  }
];

interface DailyQuestProps {
  completedQuests: string[];
  onComplete: (questId: string, badgeId?: string) => void;
}

export const DailyQuest: React.FC<DailyQuestProps> = ({ completedQuests, onComplete }) => {
  const [activeQuestIdx, setActiveQuestIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [userCode, setUserCode] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Pick a "Quest of the Day" based on the date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const dailyIdx = dayOfYear % QUESTS.length;
    setActiveQuestIdx(dailyIdx);
  }, []);

  const currentQuest = QUESTS[activeQuestIdx];
  const isAlreadyCompleted = completedQuests.includes(currentQuest.id);

  useEffect(() => {
    if (gameState === 'running' && timeLeft !== null && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'running') {
      setGameState('failed');
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, gameState]);

  const startQuest = () => {
    if (isAlreadyCompleted) return;
    setUserCode(currentQuest.initialCode);
    setTimeLeft(currentQuest.timeLimit);
    setGameState('running');
  };

  const handleRun = () => {
    if (gameState !== 'running') return;
    // In a real app, we'd check the R output. 
    // For now, we'll let the user see the output first, then they can "Submit"
  };

  const handleSubmit = () => {
    if (gameState !== 'running') return;
    console.log('Submitting Quest Solution:', userCode);
    setGameState('success');
    onComplete(currentQuest.id, currentQuest.id === 'quest-5' ? 'level-5' : undefined);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const nextQuest = () => {
    if (activeQuestIdx < QUESTS.length - 1) {
      setActiveQuestIdx(activeQuestIdx + 1);
      setGameState('idle');
      setTimeLeft(null);
    }
  };

  const progressPercent = timeLeft !== null ? (timeLeft / currentQuest.timeLimit) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">Daily Quests</h2>
        <p className="text-xl font-bold opacity-60 uppercase">Master R one challenge at a time</p>
      </div>

      <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-8">
        {QUESTS.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => {
              setActiveQuestIdx(idx);
              setGameState('idle');
              setTimeLeft(null);
            }}
            className={`p-3 brutal-border font-black text-xs uppercase transition-all ${
              activeQuestIdx === idx 
                ? 'bg-brutal-yellow translate-x-1 translate-y-1 shadow-none' 
                : completedQuests.includes(q.id)
                  ? 'bg-brutal-green'
                  : 'bg-white hover:bg-gray-100'
            }`}
          >
            Q{idx + 1}
            {completedQuests.includes(q.id) && <CheckCircle2 size={12} className="inline ml-1" />}
          </button>
        ))}
      </div>

      <div className="bg-white brutal-border brutal-shadow-lg p-8 md:p-12 relative overflow-hidden brutal-3d">
        <AnimatePresence mode="wait">
          {isAlreadyCompleted ? (
            <motion.div 
              key="completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Trophy size={64} className="mx-auto mb-6 text-brutal-yellow" />
              <h3 className="text-3xl font-black uppercase mb-2">Quest Completed!</h3>
              <p className="font-bold opacity-60 uppercase mb-8 text-sm">You have already earned the rewards for this quest.</p>
              <button 
                onClick={nextQuest}
                className="bg-brutal-black text-white px-8 py-3 brutal-border brutal-shadow font-black uppercase hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                Next Quest
              </button>
            </motion.div>
          ) : gameState === 'idle' ? (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block bg-brutal-pink px-4 py-1 brutal-border font-black uppercase text-xs mb-4">
                Difficulty: {currentQuest.difficulty}
              </div>
              <h3 className="text-4xl font-black uppercase mb-4">{currentQuest.title}</h3>
              <p className="text-lg mb-8 font-medium max-w-lg mx-auto text-justify">{currentQuest.description}</p>
              <div className="flex justify-center gap-4 items-center mb-8">
                <div className="flex items-center gap-2 font-black uppercase text-sm">
                  <Clock size={20} /> {currentQuest.timeLimit}s
                </div>
                <div className="flex items-center gap-2 font-black uppercase text-sm">
                  <Zap size={20} /> {currentQuest.reward}
                </div>
              </div>
              <button 
                onClick={startQuest}
                className="bg-brutal-yellow text-black px-12 py-4 brutal-border brutal-shadow-lg font-black uppercase text-xl hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                Start Quest
              </button>
            </motion.div>
          ) : gameState === 'failed' ? (
            <motion.div 
              key="failed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <AlertTriangle size={64} className="mx-auto mb-6 text-red-500" />
              <h3 className="text-3xl font-black uppercase mb-2">Time's Up!</h3>
              <p className="font-bold opacity-60 uppercase mb-8">You missed this one. Quests are one-shot attempts!</p>
              <button 
                onClick={nextQuest}
                className="bg-brutal-black text-white px-8 py-3 brutal-border brutal-shadow font-black uppercase hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                Try Next Quest
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-black uppercase text-xs tracking-widest">Time Remaining</span>
                  <span className={`font-black text-xl ${timeLeft && timeLeft < 10 ? 'text-red-500 animate-pulse' : ''}`}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="h-4 bg-gray-100 brutal-border overflow-hidden">
                  <motion.div 
                    className={`h-full border-r-2 border-black ${timeLeft && timeLeft < 10 ? 'bg-red-500' : 'bg-brutal-yellow'}`}
                    initial={{ width: '100%' }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                  />
                </div>
              </div>

              <h3 className="text-2xl font-black uppercase mb-4">{currentQuest.title}</h3>
              <div className="brutal-border brutal-shadow mb-6 overflow-hidden">
                <div className="bg-brutal-blue text-white px-4 py-2 font-black uppercase flex items-center gap-2 border-b-4 border-black">
                  <Terminal size={18} /> Code Editor
                </div>
                <textarea
                  className="w-full h-48 p-4 font-mono text-sm bg-gray-50 focus:outline-none resize-none"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  spellCheck={false}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={handleSubmit}
                  className="bg-brutal-green text-white px-8 py-3 brutal-border brutal-shadow font-black uppercase hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Submit Solution
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {gameState === 'success' && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute inset-0 bg-brutal-green flex flex-col items-center justify-center p-12 text-center z-10"
          >
            <Trophy size={80} className="mb-6 text-white" />
            <h4 className="text-5xl font-black uppercase mb-4">Victory!</h4>
            <p className="text-xl font-bold uppercase mb-8">You earned {currentQuest.reward}!</p>
            <button 
              onClick={nextQuest}
              className="bg-white text-black px-12 py-4 brutal-border brutal-shadow font-black uppercase text-xl hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Continue
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
