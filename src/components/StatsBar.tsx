interface StatsBarProps {
  globalStats: {
    totalUsers: number;
    totalXP: number;
  };
}

export default function StatsBar({ globalStats }: StatsBarProps) {
  return (
    <div className="bg-brutal-yellow py-12 border-y-8 border-black overflow-hidden">
      <div className="whitespace-nowrap animate-marquee flex gap-20 items-center">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-20 items-center">
            <span className="text-4xl font-black uppercase tracking-tighter">
              {globalStats.totalUsers.toLocaleString()} ACTIVE STUDENTS
            </span>
            <span className="text-6xl font-black text-brutal-blue">★</span>
            <span className="text-4xl font-black uppercase tracking-tighter">
              {globalStats.totalXP.toLocaleString()} XP EARNED
            </span>
            <span className="text-6xl font-black text-brutal-pink">★</span>
            <span className="text-4xl font-black uppercase tracking-tighter">
              15+ MODULES
            </span>
            <span className="text-6xl font-black text-brutal-green">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
