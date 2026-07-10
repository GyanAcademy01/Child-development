import { subjects } from "@/data/subjects";
import { chapter1Theory } from "@/data/subjects/child-development/chapter-1-theory";
import { chapter2Theory } from "@/data/subjects/child-development/chapter-2-theory";
import { chapter3Theory } from "@/data/subjects/child-development/chapter-3-theory";
import { chapter4Theory } from "@/data/subjects/child-development/chapter-4-theory";
import { chapter5Theory } from "@/data/subjects/child-development/chapter-5-theory";
import { chapter6Theory } from "@/data/subjects/child-development/chapter-6-theory";
import { chapter7Theory } from "@/data/subjects/child-development/chapter-7-theory";
import { chapter8Theory } from "@/data/subjects/child-development/chapter-8-theory";
import { chapter9Theory } from "@/data/subjects/child-development/chapter-9-theory";
import { chapter10Theory } from "@/data/subjects/child-development/chapter-10-theory";
import { chapter11Theory } from "@/data/subjects/child-development/chapter-11-theory";
import { chapter12Theory } from "@/data/subjects/child-development/chapter-12-theory";
import { chapter13Theory } from "@/data/subjects/child-development/chapter-13-theory";
import { chapter14Theory } from "@/data/subjects/child-development/chapter-14-theory";
import { chapter15Theory } from "@/data/subjects/child-development/chapter-15-theory";
import { chapter16Theory } from "@/data/subjects/child-development/chapter-16-theory";
import { chapter17Theory } from "@/data/subjects/child-development/chapter-17-theory";
import { chapter18Theory } from "@/data/subjects/child-development/chapter-18-theory";
import { chapter19Theory } from "@/data/subjects/child-development/chapter-19-theory";
import { chapter20Theory } from "@/data/subjects/child-development/chapter-20-theory";
import { chapter21Theory } from "@/data/subjects/child-development/chapter-21-theory";
import { chapter22Theory } from "@/data/subjects/child-development/chapter-22-theory";
import type { TheoryData } from "@/types";
import { childDevelopmentTopics } from "@/data/subjects/child-development/topics";
import TheoryContent from "./TheoryContent";

const theoryMap: Record<string, Record<string, TheoryData>> = {
  "child-development": {
    "ch-1": chapter1Theory,
    "ch-2": chapter2Theory,
    "ch-3": chapter3Theory,
    "ch-4": chapter4Theory,
    "ch-5": chapter5Theory,
    "ch-6": chapter6Theory,
    "ch-7": chapter7Theory,
    "ch-8": chapter8Theory,
    "ch-9": chapter9Theory,
    "ch-10": chapter10Theory,
    "ch-11": chapter11Theory,
    "ch-12": chapter12Theory,
    "ch-13": chapter13Theory,
    "ch-14": chapter14Theory,
    "ch-15": chapter15Theory,
    "ch-16": chapter16Theory,
    "ch-17": chapter17Theory,
    "ch-18": chapter18Theory,
    "ch-19": chapter19Theory,
    "ch-20": chapter20Theory,
    "ch-21": chapter21Theory,
    "ch-22": chapter22Theory,
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

  if (!subject || !theory) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl mb-4">📖</p>
          <p className="text-muted-foreground">થિયરી ઉપલબ્ધ નથી</p>
        </div>
      </main>
    );
  }

  return (
    <TheoryContent
      subjectId={subjectId}
      topicId={topicId}
      subject={subject}
      theory={theory}
    />
  );
}
