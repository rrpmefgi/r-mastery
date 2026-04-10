export interface Question {
  id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  codeSnippet?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
