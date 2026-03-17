import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Star, TrendingUp } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  level: number;
  badges: number;
}

export const Leaderboard: React.FC = () => {
  const leaderboard: LeaderboardUser[] = [
    { id: '1', name: 'Rushika Patt', xp: 15420, level: 16, badges: 12 },
    { id: '2', name: 'Alex Chen', xp: 12850, level: 13, badges: 9 },
    { id: '3', name: 'Sarah Miller', xp: 11200, level: 12, badges: 8 },
    { id: '4', name: 'David Kim', xp: 9800, level: 10, badges: 7 },
    { id: '5', name: 'Elena Rossi', xp: 8500, level: 9, badges: 6 },
    { id: '6', name: 'Marcus Wong', xp: 7200, level: 8, badges: 5 },
    { id: '7', name: 'Julia Santos', xp: 6400, level: 7, badges: 4 },
    { id: '8', name: 'Kevin O\'Brien', xp: 5100, level: 6, badges: 3 },
    { id: '9', name: 'Aisha Khan', xp: 4300, level: 5, badges: 3 },
    { id: '10', name: 'Tom Wilson', xp: 3200, level: 4, badges: 2 },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">Global Leaderboard</h2>
        <p className="text-xl font-bold opacity-60 uppercase">The top R-Mastery students worldwide</p>
      </div>

      <div className="bg-white brutal-border brutal-shadow-lg overflow-hidden brutal-3d">
        <div className="bg-brutal-black text-white p-6 grid grid-cols-12 gap-4 font-black uppercase text-xs tracking-widest border-b-2 border-black">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Student</div>
          <div className="col-span-2 text-center">Level</div>
          <div className="col-span-2 text-center">Badges</div>
          <div className="col-span-2 text-right">Total XP</div>
        </div>

        <div className="divide-y-2 divide-black">
          {leaderboard.length > 0 ? leaderboard.map((user, idx) => (
            <motion.div 
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`grid grid-cols-12 gap-4 p-6 items-center hover:bg-gray-50 transition-colors ${idx < 3 ? 'bg-brutal-yellow/5' : ''}`}
            >
              <div className="col-span-1 font-black text-2xl italic">
                {idx === 0 ? <Trophy className="text-brutal-yellow" /> : idx === 1 ? <Medal className="text-gray-400" /> : idx === 2 ? <Medal className="text-brutal-pink" /> : `#${idx + 1}`}
              </div>
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-brutal-black brutal-border flex items-center justify-center text-white font-black uppercase text-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="font-black uppercase tracking-tight text-lg">{user.name}</span>
              </div>
              <div className="col-span-2 text-center font-bold">
                <span className="bg-brutal-blue/10 px-3 py-1 brutal-border text-xs uppercase font-black">Lvl {user.level}</span>
              </div>
              <div className="col-span-2 text-center font-bold flex justify-center items-center gap-1">
                <Star size={14} className="text-brutal-pink" fill="currentColor" /> {user.badges}
              </div>
              <div className="col-span-2 text-right font-black text-xl tabular-nums">
                {user.xp.toLocaleString()}
              </div>
            </motion.div>
          )) : (
            <div className="p-12 text-center font-bold opacity-50 uppercase">No students ranked yet. Be the first!</div>
          )}
        </div>
      </div>

      <div className="mt-12 bg-brutal-pink p-8 brutal-border brutal-shadow flex items-center justify-between text-white">
        <div>
          <h3 className="text-3xl font-black uppercase mb-2">Want to climb the ranks?</h3>
          <p className="font-bold uppercase opacity-80 text-justify">Complete Daily Quests and Tutorials to earn massive XP!</p>
        </div>
        <TrendingUp size={64} className="opacity-20" />
      </div>
    </div>
  );
};
