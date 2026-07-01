import { subjects } from "@/data/subjects";
import { chapter1Theory } from "@/data/subjects/child-development/chapter-1-theory";
import type { TheoryData } from "@/types";
import { childDevelopmentTopics } from "@/data/subjects/child-development/topics";
import TheoryContent from "./TheoryContent";

const theoryMap: Record<string, Record<string, TheoryData>> = {
  "child-development": {
    "ch-1": chapter1Theory,
  },
};

export async function generateStaticParams() {
  const params: { subjectId: string; topicId: string }[] = [];

  const allTopics = [
    ...childDevelopmentTopics.map(t => ({...t, subjectId: "child-development"})),
  ];

  for (const topic of allTopics) {
    if (topic.hasTheory) {
      params.push({
        subjectId: topic.subjectId,
        topicId: topic.id,
      });
    }
  }

  return params;
}

export default async function TheoryPage({
  params,
}: {
  params: Promise<{ subjectId: string; topicId: string }>;
}) {
  const { subjectId, topicId } = await params;
  const subject = subjects.find((s) => s.id === subjectId);
  const theory = theoryMap[subjectId]?.[topicId];

  return (
    <TheoryContent
      subjectId={subjectId}
      topicId={topicId}
      subject={subject}
      theory={theory}
    />
  );
}
