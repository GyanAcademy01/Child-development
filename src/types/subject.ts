// Subject and Topic related TypeScript interfaces

export interface Subject {
  id: string;
  name: string;
  icon: string;
  topicCount: number;
  color: string;
  color2: string;
  description: string;
}

export interface Topic {
  id: string;
  number: string;
  title: string;
  fullTitle: string;
  hasTheory: boolean;
  hasTest: boolean;
  pdfUrl?: string;
}
