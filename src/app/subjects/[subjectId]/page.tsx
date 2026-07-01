import { subjects } from "@/data/subjects";
import { childDevelopmentTopics } from "@/data/subjects/child-development/topics";
import SubjectContent from "./SubjectContent";

const topicsMap: Record<string, typeof childDevelopmentTopics> = {
  "child-development": childDevelopmentTopics,
};

export async function generateStaticParams() {
  return subjects.map((subject) => ({
    subjectId: subject.id,
  }));
}

export default async function TopicsPage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);
  const topics = topicsMap[subjectId] || [];

  // Pass subject to SubjectContent, which handles null/undefined internally.
  return <SubjectContent subject={subject} topics={topics} />;
}
