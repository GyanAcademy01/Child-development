"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Subject } from "@/types";

interface TopicData {
  id: string;
  number: string | number;
  fullTitle: string;
  hasTheory?: boolean;
  hasTest?: boolean;
  pdfUrl?: string;
}

interface SubjectContentProps {
  subject?: Subject;
  topics: TopicData[];
}

// Color palette for chapter cards (No blue-related colors, matches HTML specs)
const chapterColors = [
  {
    // 1. Emerald Green
    accentBar: "bg-gradient-to-b from-[#10b981] to-[#047857]",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40 text-[#047857] dark:text-emerald-400",
    shadow: "shadow-[0_6px_20px_-3px_rgba(16,185,129,0.30),_inset_0_0_20px_rgba(16,185,129,0.06)] dark:shadow-[0_6px_20px_-4px_rgba(16,185,129,0.40),_inset_0_0_20px_rgba(16,185,129,0.12)]",
    btnStart: "bg-gradient-to-r from-[#10b981] to-[#047857] text-white shadow-[0_8px_18px_-6px_rgba(4,120,87,0.55)]",
    border: "border-emerald-100 dark:border-zinc-800/80"
  },
  {
    // 2. Amber Gold
    accentBar: "bg-gradient-to-b from-[#f59e0b] to-[#b45309]",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40 text-[#b45309] dark:text-amber-400",
    shadow: "shadow-[0_6px_20px_-3px_rgba(245,158,11,0.30),_inset_0_0_20px_rgba(245,158,11,0.06)] dark:shadow-[0_6px_20px_-4px_rgba(245,158,11,0.40),_inset_0_0_20px_rgba(245,158,11,0.12)]",
    btnStart: "bg-gradient-to-r from-[#f59e0b] to-[#b45309] text-white shadow-[0_8px_18px_-6px_rgba(180,83,9,0.55)]",
    border: "border-amber-100 dark:border-zinc-800/80"
  },
  {
    // 3. Coral Orange
    accentBar: "bg-gradient-to-b from-[#f97316] to-[#c2410c]",
    badgeBg: "bg-orange-50 dark:bg-orange-950/40 text-[#c2410c] dark:text-orange-400",
    shadow: "shadow-[0_6px_20px_-3px_rgba(249,115,22,0.30),_inset_0_0_20px_rgba(249,115,22,0.06)] dark:shadow-[0_6px_20px_-4px_rgba(249,115,22,0.40),_inset_0_0_20px_rgba(249,115,22,0.12)]",
    btnStart: "bg-gradient-to-r from-[#f97316] to-[#c2410c] text-white shadow-[0_8px_18px_-6px_rgba(194,65,12,0.55)]",
    border: "border-orange-100 dark:border-zinc-800/80"
  },
  {
    // 4. Rose Red
    accentBar: "bg-gradient-to-b from-[#f43f5e] to-[#be123c]",
    badgeBg: "bg-rose-50 dark:bg-rose-950/40 text-[#be123c] dark:text-rose-400",
    shadow: "shadow-[0_6px_20px_-3px_rgba(244,63,94,0.30),_inset_0_0_20px_rgba(244,63,94,0.06)] dark:shadow-[0_6px_20px_-4px_rgba(244,63,94,0.40),_inset_0_0_20px_rgba(244,63,94,0.12)]",
    btnStart: "bg-gradient-to-r from-[#f43f5e] to-[#be123c] text-white shadow-[0_8px_18px_-6px_rgba(190,18,60,0.55)]",
    border: "border-rose-100 dark:border-zinc-800/80"
  },
  {
    // 5. Teal Mint
    accentBar: "bg-gradient-to-b from-[#14b8a6] to-[#0f766e]",
    badgeBg: "bg-teal-50 dark:bg-teal-950/40 text-[#0f766e] dark:text-teal-400",
    shadow: "shadow-[0_6px_20px_-3px_rgba(20,184,166,0.30),_inset_0_0_20px_rgba(20,184,166,0.06)] dark:shadow-[0_6px_20px_-4px_rgba(20,184,166,0.40),_inset_0_0_20px_rgba(20,184,166,0.12)]",
    btnStart: "bg-gradient-to-r from-[#14b8a6] to-[#0f766e] text-white shadow-[0_8px_18px_-6px_rgba(15,118,110,0.55)]",
    border: "border-teal-100 dark:border-zinc-800/80"
  },
  {
    // 6. Amethyst Purple
    accentBar: "bg-gradient-to-b from-[#8b5cf6] to-[#5b21b6]",
    badgeBg: "bg-purple-50 dark:bg-purple-950/40 text-[#5b21b6] dark:text-purple-400",
    shadow: "shadow-[0_6px_20px_-3px_rgba(139,92,246,0.30),_inset_0_0_20px_rgba(139,92,246,0.06)] dark:shadow-[0_6px_20px_-4px_rgba(139,92,246,0.40),_inset_0_0_20px_rgba(139,92,246,0.12)]",
    btnStart: "bg-gradient-to-r from-[#8b5cf6] to-[#5b21b6] text-white shadow-[0_8px_18px_-6px_rgba(91,33,182,0.55)]",
    border: "border-purple-100 dark:border-zinc-800/80"
  },
  {
    // 7. Magenta Pink
    accentBar: "bg-gradient-to-b from-[#d946ef] to-[#86198f]",
    badgeBg: "bg-fuchsia-50 dark:bg-fuchsia-950/40 text-[#86198f] dark:text-fuchsia-400",
    shadow: "shadow-[0_6px_20px_-3px_rgba(217,70,239,0.30),_inset_0_0_20px_rgba(217,70,239,0.06)] dark:shadow-[0_6px_20px_-4px_rgba(217,70,239,0.40),_inset_0_0_20px_rgba(217,70,239,0.12)]",
    btnStart: "bg-gradient-to-r from-[#d946ef] to-[#86198f] text-white shadow-[0_8px_18px_-6px_rgba(134,25,143,0.55)]",
    border: "border-fuchsia-100 dark:border-zinc-800/80"
  },
  {
    // 8. Charcoal Slate
    accentBar: "bg-gradient-to-b from-[#4b5563] to-[#374151]",
    badgeBg: "bg-slate-50 dark:bg-slate-900/60 text-[#374151] dark:text-slate-300",
    shadow: "shadow-[0_6px_20px_-3px_rgba(75,85,99,0.30),_inset_0_0_20px_rgba(75,85,99,0.06)] dark:shadow-[0_6px_20px_-4px_rgba(75,85,99,0.40),_inset_0_0_20px_rgba(75,85,99,0.12)]",
    btnStart: "bg-gradient-to-r from-[#4b5563] to-[#374151] text-white shadow-[0_8px_18px_-6px_rgba(55,65,81,0.55)]",
    border: "border-slate-100 dark:border-zinc-800/80"
  },
  {
    // 9. Lime Green
    accentBar: "bg-gradient-to-b from-[#84cc16] to-[#4f7a28]",
    badgeBg: "bg-lime-50 dark:bg-lime-950/40 text-[#4f7a28] dark:text-lime-400",
    shadow: "shadow-[0_6px_20px_-3px_rgba(132,204,22,0.30),_inset_0_0_20px_rgba(132,204,22,0.06)] dark:shadow-[0_6px_20px_-4px_rgba(132,204,22,0.40),_inset_0_0_20px_rgba(132,204,22,0.12)]",
    btnStart: "bg-gradient-to-r from-[#84cc16] to-[#4f7a28] text-white shadow-[0_8px_18px_-6px_rgba(79,122,40,0.55)]",
    border: "border-lime-100 dark:border-zinc-800/80"
  },
  {
    // 10. Bronze Copper
    accentBar: "bg-gradient-to-b from-[#a16207] to-[#713f12]",
    badgeBg: "bg-yellow-50 dark:bg-yellow-950/40 text-[#713f12] dark:text-yellow-400",
    shadow: "shadow-[0_6px_20px_-3px_rgba(161,98,7,0.30),_inset_0_0_20px_rgba(161,98,7,0.06)] dark:shadow-[0_6px_20px_-4px_rgba(161,98,7,0.40),_inset_0_0_20px_rgba(161,98,7,0.12)]",
    btnStart: "bg-gradient-to-r from-[#a16207] to-[#713f12] text-white shadow-[0_8px_18px_-6px_rgba(113,63,18,0.55)]",
    border: "border-yellow-100 dark:border-zinc-800/80"
  }
];

export default function SubjectContent({ subject, topics }: SubjectContentProps) {
  const [testResults, setTestResults] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!subject) return;
    const results: Record<string, number> = {};
    topics.forEach(topic => {
      const stored = localStorage.getItem(`test_result_${subject.id}_${topic.id}`);
      if (stored) {
        results[topic.id] = parseInt(stored, 10);
      }
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTestResults(results);
  }, [subject, topics]);

  if (!subject) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl mb-4">😕</p>
          <p className="text-muted-foreground">વિષય મળ્યો નથી</p>
          <Link href="/subjects">
            <Button variant="outline" className="mt-4">
              ← પાછા જાઓ
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex-1 py-8 sm:py-10 px-4 sm:px-6 overflow-hidden min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] dark:from-zinc-950 dark:to-black">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Blob 1: Subject Color */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] sm:blur-[130px]" 
          style={{ backgroundColor: `${subject.color}12` }} 
        />
        {/* Blob 2: Subject Color 2 */}
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] sm:blur-[130px]" 
          style={{ backgroundColor: `${subject.color2}12` }} 
        />
      </div>

      <div className="mx-auto max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {/* Header Row (Back Button + Capsule Title) */}
        <div className="relative mb-8 flex min-h-[36px] items-center justify-center">
          <div className="absolute left-0">
            <Link href="/">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-gradient-to-b from-[#f24c4c] to-[#d92b2b] border-b-[3px] border-[#9b1c1c] text-white hover:brightness-110 active:translate-y-[1.5px] active:border-b-[1.5px] active:shadow-none transition-all duration-75 cursor-pointer shadow-[0_3px_8px_rgba(239,68,68,0.15)]"
                aria-label="પાછા જાઓ"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
              </button>
            </Link>
          </div>

          {/* Premium Capsule Title */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-full shadow-md">
            <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-xs sm:text-sm">
              {subject.icon}
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight uppercase">
              {subject.name}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: subject.color }} />
              <span className="text-xs sm:text-sm font-bold" style={{ color: subject.color }}>
                પ્રકરણો
              </span>
            </div>
          </div>
        </div>

        {/* Topic Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-[340px] sm:max-w-[450px] md:max-w-full mx-auto">
          {topics.map((topic, index) => {
            const result = testResults[topic.id];
            const hasTestGiven = result !== undefined;
            const isPass = hasTestGiven ? result >= 80 : false;
            const colorCfg = chapterColors[index % chapterColors.length];
            
            return (
              <div key={topic.id} className="h-full">
                {/* Emerald Edge Design Card (Tailwind adaptation) */}
                <div className={`relative bg-white dark:bg-zinc-900 rounded-[22px] p-[26px] pb-[22px] border ${colorCfg.border} ${colorCfg.shadow} hover:shadow-lg transition-all duration-300 flex flex-col h-full justify-between overflow-hidden group/card`}>
                  
                  {/* Left Accent Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[5px] ${colorCfg.accentBar} rounded-r-[6px]`} />
                  
                  {/* Card Top */}
                  <div className="flex items-center gap-[14px] mb-[22px] pl-1.5">
                    <div className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full font-sans font-extrabold text-[15px] ${colorCfg.badgeBg}`}>
                      #{topic.number}
                    </div>
                    <h2 className="text-[17px] sm:text-[18px] font-bold text-[#1c2230] dark:text-zinc-100 leading-[1.5] tracking-tight flex-1">
                      {(() => {
                        const parts = topic.fullTitle.split("→");
                        return parts.length > 1 ? parts[1].trim() : topic.fullTitle;
                      })()}
                    </h2>
                  </div>

                  {/* Score Status (If given) */}
                  {hasTestGiven && (
                    <div className="pl-1.5 mb-4">
                      <div className={`flex items-center gap-1.5 w-fit px-2.5 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-sm ${
                        isPass 
                          ? 'bg-emerald-100/70 border-emerald-250/80 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-700/50 dark:text-emerald-300' 
                          : 'bg-rose-100/70 border-rose-250/80 text-rose-700 dark:bg-rose-900/30 dark:border-rose-700/50 dark:text-rose-300'
                      }`}>
                        {isPass ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        )}
                        <span>Score: {result}%</span>
                      </div>
                    </div>
                  )}

                  {/* Button Grid (Spec: 1fr 1.3fr 1fr) */}
                  <div className="grid grid-cols-[1fr_1.3fr_1fr] gap-[10px] pl-1.5 mt-auto">
                    {topic.hasTheory ? (
                      <Link href={`/subjects/${subject.id}/${topic.id}/theory`} className="w-full">
                        <button className="w-full font-sans font-bold text-xs sm:text-[12.5px] py-1.5 rounded-[8px] bg-white dark:bg-zinc-800 text-stone-600 dark:text-zinc-300 border-[1.5px] border-slate-200 dark:border-zinc-700 hover:translate-y-[-2px] active:translate-y-0 hover:shadow-sm transition-all duration-150 cursor-pointer">
                          Theory
                        </button>
                      </Link>
                    ) : (
                      <div />
                    )}

                    {topic.hasTest ? (
                      <Link href={`/subjects/${subject.id}/${topic.id}/test`} className="w-full">
                        <button className={`w-full font-sans font-bold text-xs sm:text-[12.5px] py-1.5 rounded-[8px] ${colorCfg.btnStart} hover:translate-y-[-2px] active:translate-y-0 hover:shadow-md transition-all duration-150 cursor-pointer`}>
                          {hasTestGiven ? "Retake" : "Start Test"}
                        </button>
                      </Link>
                    ) : (
                      <div />
                    )}

                    {topic.pdfUrl ? (
                      <Link href={`/pdf-view?file=${encodeURIComponent(topic.pdfUrl)}&title=${encodeURIComponent(topic.fullTitle)}`} className="w-full">
                        <button className="w-full font-sans font-bold text-xs sm:text-[12.5px] py-1.5 rounded-[8px] bg-white dark:bg-zinc-800 text-stone-600 dark:text-zinc-300 border-[1.5px] border-slate-200 dark:border-zinc-700 hover:translate-y-[-2px] active:translate-y-0 hover:shadow-sm transition-all duration-150 cursor-pointer">
                          PDF
                        </button>
                      </Link>
                    ) : (
                      <div />
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
