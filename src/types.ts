export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'R Programming Setup & Syntax' | 'Logic & Data Structures' | 'Data Engineering & ETL' | 'Statistical analysis in R' | 'Data visualisation basic graphs' | 'Statistics using R' | 'ggplot2 in R' | 'Plotly in R';
  quizQuestions?: QuizQuestion[];
  staticOutputs?: Record<string, { output: string[]; plot?: string }>;
}

export type ViewState = 'home' | 'tutorial' | 'curriculum' | 'dailyQuest' | 'qQuest' | 'leaderboard' | 'auth' | 'about';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface SavedSnippet {
  id: string;
  title: string;
  code: string;
  savedAt: number;
}

export interface QuizScore {
  id: string;
  category: string;
  score: number;
  total: number;
  date: number;
}

export interface UserStats {
  xp: number;
  level: number;
  completedLessons: string[];
  completedChallenges: string[]; // Track attempted/completed daily quests
  badges: Badge[];
  savedSnippets: SavedSnippet[];
  quizScores: QuizScore[];
}
