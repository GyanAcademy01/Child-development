// Theory content related TypeScript interfaces

export interface TheoryPoint {
  text: string;
  isBold?: boolean;
}

export interface TheorySubTopic {
  title: string;
  points?: string[];
  table?: TheoryTable;
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
  content: TheorySubTopic[];
  table?: TheoryTable;
  imageUrl?: string;
  illustration?: string;
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
  title: string;
  nodes: MindMapNode[];
}

export interface TheoryData {
  chapterId?: string;
  chapterTitle: string;
  description?: string;
  sections: TheorySection[];
  mindMap?: MindMapSection[];
}

