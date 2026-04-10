import { useState, useEffect } from 'react';
import { Trophy, Medal, User, Zap } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users_public'), orderBy('xp', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeaders(data);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'users_public'));
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="p-8 flex justify-center items-center">
      <div className="animate-spin w-8 h-8 border-4 border-brutal-pink border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="bg-white brutal-border p-8 brutal-shadow-lg max-w-2xl mx-auto my-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-brutal-yellow p-3 brutal-border brutal-shadow">
          <Trophy size={32} className="text-black" />
        </div>
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Global Leaderboard</h2>
          <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Top R-Masters</span>
        </div>
      </div>

      <div className="space-y-4">
        {leaders.map((leader, index) => (
          <div 
            key={leader.id}
            className={cn(
              "flex items-center justify-between p-4 brutal-border transition-all hover:-translate-y-1",
              index === 0 ? "bg-brutal-yellow brutal-shadow" : "bg-white"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 font-black text-xl italic opacity-40">
                {index + 1}
              </div>
              <div className="w-10 h-10 bg-white brutal-border flex items-center justify-center">
                {index === 0 ? <Medal size={24} className="text-brutal-pink" /> : <User size={20} />}
              </div>
              <div>
                <div className="font-black uppercase tracking-tight">{leader.displayName}</div>
                <div className="text-[10px] font-bold text-black/50 uppercase">Level {leader.level}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 font-black text-brutal-blue">
              <Zap size={16} />
              <span>{leader.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
