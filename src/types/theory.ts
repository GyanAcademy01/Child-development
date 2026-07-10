/* eslint-disable @typescript-eslint/no-explicit-any */
// Theory content related TypeScript interfaces


export interface TheoryPoint {
  text: string;
  isBold?: boolean;
}

export interface TheorySubTopic {
  title?: string;
  points?: string[];
  table?: TheoryTable;
  [key: string]: any;
}

export interface TheoryTableRow {
  cells: string[];
}

export interface TheoryTable {
  headers: string[];
  rows: (TheoryTableRow | string[])[];
}

export interface TheorySection {
  icon?: string;
  title: string;
  content?: any[];
  table?: TheoryTable;
  imageUrl?: string;
  illustration?: string;
  [key: string]: any;
}

export interface MindMapPoint {
  text: string;
  isBold?: boolean;
}

export interface MindMapNode {
  title: string;
  points: MindMapPoint[];
}

export interface MindMapSection {
  id?: string;
  title?: string;
  description?: string;
  subTopics?: any[];
  nodes?: MindMapNode[];
  [key: string]: any;
}

export interface TheoryData {
  chapterId?: string;
  chapterTitle: string;
  description?: string;
  sections: TheorySection[];
  mindMap?: MindMapSection[];
}

