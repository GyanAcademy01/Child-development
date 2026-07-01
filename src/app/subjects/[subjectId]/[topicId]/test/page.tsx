import { subjects } from "@/data/subjects";
import type { TestData } from "@/types";
import { childDevelopmentTopics } from "@/data/subjects/child-development/topics";
import { chapter1Test } from "@/data/subjects/child-development/chapter-1-test";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TestContent from "./TestContent";

const testMap: Record<string, Record<string, TestData>> = {
  "child-development": {
    "ch-1": chapter1Test,
  },
};

export async function generateStaticParams() {
  const params: { subjectId: string; topicId: string }[] = [];

  const allTopics = [
    ...childDevelopmentTopics.map(t => ({...t, subjectId: "child-development"})),
  ];

  allTopics.forEach((topic) => {
    if (topic.hasTest) {
      params.push({
        subjectId: topic.subjectId,
        topicId: topic.id,
      });
    }
  });

  return params;
}

export default async function TestPage({
  params,
}: {
  params: Promise<{ subjectId: string; topicId: string }>;
}) {
  const { subjectId, topicId } = await params;
  
  const subject = subjects.find((s) => s.id === subjectId);
  const testData = testMap[subjectId]?.[topicId];

  if (!subject || !testData) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl mb-4">🧪</p>
          <p className="text-muted-foreground">Test ઉપલબ્ધ નથી</p>
          <Link href={`/subjects/${subjectId}`}>
            <Button variant="outline" className="mt-4">
              ← પાછા જાઓ
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <TestContent 
      subject={subject} 
      test={testData} 
      subjectId={subjectId} 
      topicId={topicId} 
    />
  );
}
