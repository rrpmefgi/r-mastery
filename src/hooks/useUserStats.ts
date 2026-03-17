import { useState, useEffect } from 'react';
import { UserStats, Badge } from '../types';

const INITIAL_STATS: UserStats = {
  xp: 0,
  level: 1,
  completedLessons: [],
  completedChallenges: [],
  badges: [],
  savedSnippets: [],
  quizScores: [],
};

const BADGES_CONFIG: Badge[] = [
  { id: 'level-1', name: 'R Apprentice', description: 'Completed 5 lessons', icon: '🌱' },
  { id: 'level-2', name: 'Data Wrangler', description: 'Completed 15 lessons', icon: '🤠' },
  { id: 'level-3', name: 'Plot Master', description: 'Completed 30 lessons', icon: '📊' },
  { id: 'level-4', name: 'Syntax Samurai', description: 'Completed 50 lessons', icon: '⚔️' },
  { id: 'level-5', name: 'R Grandmaster', description: 'Mastered the most complex challenges', icon: '👑' },
  { id: 'speedster', name: 'Speedster', description: 'Completed a challenge in record time', icon: '⚡' },
];

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('r_mastery_stats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with INITIAL_STATS to ensure all fields (like quizScores) exist
        return { ...INITIAL_STATS, ...parsed };
      } catch (e) {
        console.error('Failed to parse stats:', e);
        return INITIAL_STATS;
      }
    }
    return INITIAL_STATS;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('r_mastery_stats', JSON.stringify(stats));
  }, [stats]);

  const addXP = (amount: number) => {
    setStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const checkMilestones = (completedCount: number, currentBadges: Badge[]) => {
    const newBadges = [...currentBadges];
    const milestones = [
      { count: 5, id: 'level-1' },
      { count: 15, id: 'level-2' },
      { count: 30, id: 'level-3' },
      { count: 50, id: 'level-4' },
    ];

    milestones.forEach(m => {
      if (completedCount >= m.count && !newBadges.find(b => b.id === m.id)) {
        const badge = BADGES_CONFIG.find(b => b.id === m.id);
        if (badge) newBadges.push({ ...badge, unlockedAt: Date.now() });
      }
    });

    return newBadges;
  };

  const completeLesson = (lessonId: string) => {
    if (stats.completedLessons.includes(lessonId)) return;
    
    setStats(prev => {
      const newCompleted = [...prev.completedLessons, lessonId];
      const newBadges = checkMilestones(newCompleted.length, prev.badges);
      const newXP = prev.xp + 100;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, completedLessons: newCompleted, badges: newBadges, xp: newXP, level: newLevel };
    });
  };

  const completeChallenge = (challengeId: string, badgeId?: string) => {
    if (stats.completedChallenges.includes(challengeId)) return;

    setStats(prev => {
      const newCompleted = [...prev.completedChallenges, challengeId];
      let newBadges = [...prev.badges];
      
      if (badgeId && !newBadges.find(b => b.id === badgeId)) {
        const badge = BADGES_CONFIG.find(b => b.id === badgeId);
        if (badge) newBadges.push({ ...badge, unlockedAt: Date.now() });
      }

      if (challengeId === 'quest-5' && !newBadges.find(b => b.id === 'level-5')) {
        const badge = BADGES_CONFIG.find(b => b.id === 'level-5');
        if (badge) newBadges.push({ ...badge, unlockedAt: Date.now() });
      }

      const newXP = prev.xp + 500;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, completedChallenges: newCompleted, badges: newBadges, xp: newXP, level: newLevel };
    });
  };

  const saveQuizScore = (category: string, score: number, total: number) => {
    setStats(prev => ({
      ...prev,
      quizScores: [
        { id: Math.random().toString(36).substring(2, 9), category, score, total, date: Date.now() },
        ...(prev.quizScores || [])
      ]
    }));
  };

  return {
    stats,
    loading,
    addXP,
    completeLesson,
    completeChallenge,
    saveQuizScore,
    xpToNextLevel: (stats.level * 1000) - stats.xp,
    progress: (stats.xp % 1000) / 10
  };
};
