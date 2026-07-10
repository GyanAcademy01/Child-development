import { subjects } from "@/data/subjects";
import type { TestData } from "@/types";
import { childDevelopmentTopics } from "@/data/subjects/child-development/topics";
import { chapter1Test } from "@/data/subjects/child-development/chapter-1-test";
import { chapter2Test } from "@/data/subjects/child-development/chapter-2-test";
import { chapter3Test } from "@/data/subjects/child-development/chapter-3-test";
import { chapter4Test } from "@/data/subjects/child-development/chapter-4-test";
import { chapter5Test } from "@/data/subjects/child-development/chapter-5-test";
import { chapter6Test } from "@/data/subjects/child-development/chapter-6-test";
import { chapter7Test } from "@/data/subjects/child-development/chapter-7-test";
import { chapter8Test } from "@/data/subjects/child-development/chapter-8-test";
import { chapter9Test } from "@/data/subjects/child-development/chapter-9-test";
import { chapter10Test } from "@/data/subjects/child-development/chapter-10-test";
import { chapter11Test } from "@/data/subjects/child-development/chapter-11-test";
import { chapter12Test } from "@/data/subjects/child-development/chapter-12-test";
import { chapter13Test } from "@/data/subjects/child-development/chapter-13-test";
import { chapter14Test } from "@/data/subjects/child-development/chapter-14-test";
import { chapter15Test } from "@/data/subjects/child-development/chapter-15-test";
import { chapter16Test } from "@/data/subjects/child-development/chapter-16-test";
import { chapter17Test } from "@/data/subjects/child-development/chapter-17-test";
import { chapter18Test } from "@/data/subjects/child-development/chapter-18-test";
import { chapter19Test } from "@/data/subjects/child-development/chapter-19-test";
import { chapter20Test } from "@/data/subjects/child-development/chapter-20-test";
import { chapter21Test } from "@/data/subjects/child-development/chapter-21-test";
import { chapter22Test } from "@/data/subjects/child-development/chapter-22-test";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TestContent from "./TestContent";

const testMap: Record<string, Record<string, TestData>> = {
  "child-development": {
    "ch-1": chapter1Test,
    "ch-2": chapter2Test,
    "ch-3": chapter3Test,
    "ch-4": chapter4Test,
    "ch-5": chapter5Test,
    "ch-6": chapter6Test,
    "ch-7": chapter7Test,
    "ch-8": chapter8Test,
    "ch-9": chapter9Test,
    "ch-10": chapter10Test,
    "ch-11": chapter11Test,
    "ch-12": chapter12Test,
    "ch-13": chapter13Test,
    "ch-14": chapter14Test,
    "ch-15": chapter15Test,
    "ch-16": chapter16Test,
    "ch-17": chapter17Test,
    "ch-18": chapter18Test,
    "ch-19": chapter19Test,
    "ch-20": chapter20Test,
    "ch-21": chapter21Test,
    "ch-22": chapter22Test,
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
