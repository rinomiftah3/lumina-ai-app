export type StudyMode = 'explain' | 'quiz' | 'summary' | 'landing';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  mode: StudyMode;
  subject: string;
  messages: Message[];
  startTime: number;
}
