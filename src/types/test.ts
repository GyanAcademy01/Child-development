// Test/Quiz related TypeScript interfaces

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TestData {
  chapterId: string;
  chapterTitle: string;
  totalQuestions: number;
  questions: TestQuestion[];
}
