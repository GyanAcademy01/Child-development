"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Subject } from "@/types";

interface SubjectContentProps {
  subject?: Subject;
  topics: any[];
}

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
    setTestResults(results);
  }, [subject, topics]);

  if (!subject) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl mb-4">😕</p>
          <p className="text-muted-foreground">વિષય મળ્યો નહીં</p>
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
    <main className="relative flex-1 pt-8 pb-4 sm:pt-10 sm:pb-6 px-4 sm:px-6 overflow-hidden">
      {/* Background Blobs (Dhaba) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Blob 1: Subject Color (Top-Left) */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] sm:blur-[130px]" 
          style={{ backgroundColor: `${subject.color}26` }} 
        />
        {/* Blob 2: Subject Color 2 (Bottom-Right) */}
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] sm:blur-[130px]" 
          style={{ backgroundColor: `${subject.color2}26` }} 
        />
        {/* Blob 3: White */}
        <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] rounded-full bg-white/50 blur-[80px] sm:blur-[110px] dark:bg-white/5" />
        {/* Blob 4: White */}
        <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] rounded-full bg-white/40 blur-[80px] sm:blur-[110px] dark:bg-white/5" />
      </div>

      <div className="mx-auto max-w-3xl lg:max-w-5xl">
        {/* Header Row (Back Button + Capsule Title) */}
        <div className="relative mb-5 flex min-h-[36px] items-center justify-center">
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
          <div className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-full shadow-lg shadow-black/15 dark:shadow-black/40">
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, idx) => {
            const cardColors = [
              "#3b82f6", // blue
              "#10b981", // emerald
              "#8b5cf6", // violet
              "#f59e0b", // amber
              "#ec4899", // pink
              "#06b6d4", // cyan
              "#ef4444", // red
              "#84cc16", // lime
            ];
            const defaultCardColor = cardColors[idx % cardColors.length];
            const result = testResults[topic.id];
            const isPass = result !== undefined ? result >= 80 : false;
            const cardColor = result !== undefined ? (isPass ? "#10b981" : "#ef4444") : defaultCardColor;
            
            const cardBgClass = result !== undefined 
              ? (isPass 
                  ? 'bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/10 border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-300' 
                  : 'bg-gradient-to-br from-rose-50/80 to-rose-100/50 dark:from-rose-950/30 dark:to-rose-900/10 border-rose-200 dark:border-rose-900/50 hover:border-rose-300')
              : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 hover:border-slate-200';
            
            return (
            <div key={topic.id} className="h-full">
              <div className={`rounded-[20px] border-2 ${cardBgClass} shadow-[0_4px_20px_-2px_rgba(0,0,0,0.13),0_2px_6px_-1px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.18),0_3px_10px_-2px_rgba(0,0,0,0.1)] transition-all duration-200 flex flex-col h-full overflow-hidden`}>
                <CardContent className="p-4 sm:p-5 flex flex-col h-full justify-between">
                  <div className="flex items-start gap-3 sm:gap-4 mb-5">
                    {/* Compact Chapter Number Badge */}
                    <div 
                      className="flex shrink-0 h-11 w-11 items-center justify-center rounded-[12px] font-black text-lg text-white shadow-sm"
                      style={{ 
                        backgroundColor: cardColor,
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.15), rgba(0,0,0,0.05))'
                      }}
                    >
                      {topic.number}
                    </div>
                    
                    <div className="flex flex-col justify-center min-h-[44px]">
                      <h2 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-zinc-100 leading-snug">
                        {(() => {
                          const parts = topic.fullTitle.split("→");
                          return parts.length > 1 ? parts[1].trim() : topic.fullTitle;
                        })()}
                      </h2>
                      {result !== undefined && (
                        <div className={`mt-2 flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold border ${
                          isPass 
                            ? 'bg-emerald-100/80 border-emerald-200 text-emerald-700 dark:bg-emerald-500/20 dark:border-emerald-500/30 dark:text-emerald-300' 
                            : 'bg-rose-100/80 border-rose-200 text-rose-700 dark:bg-rose-500/20 dark:border-rose-500/30 dark:text-rose-300'
                        }`}>
                          {isPass ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                          )}
                          <span>Test Score: {result}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mt-auto pt-3 md:pt-4">
                    <div className={`w-full h-[1px] ${result !== undefined ? (isPass ? 'bg-emerald-200/60 dark:bg-emerald-800/40' : 'bg-rose-200/60 dark:bg-rose-800/40') : 'bg-slate-100 dark:bg-zinc-800/60'}`} />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 sm:gap-2.5 pt-3 md:pt-4">
                    {topic.hasTheory && (
                      <Link href={`/subjects/${subject.id}/${topic.id}/theory`} className="flex-1">
                        <button className="group/btn relative w-full flex items-center justify-center gap-1.5 h-8 rounded-lg text-[11px] sm:text-xs font-bold tracking-wide overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-zinc-800 dark:to-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/80 text-slate-600 dark:text-zinc-300 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_14px_-2px_rgba(0,0,0,0.2)] hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-[0.97] transition-all duration-200 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover/btn:opacity-100 transition-opacity"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                          Theory
                        </button>
                      </Link>
                    )}
                    {topic.hasTest && (
                      <Link href={`/subjects/${subject.id}/${topic.id}/test`} className="flex-1">
                        <button
                          className="group/btn relative w-full flex items-center justify-center gap-1.5 h-8 rounded-lg text-[11px] sm:text-xs font-bold tracking-wide text-white overflow-hidden shadow-[0_3px_10px_-1px_rgba(0,0,0,0.2),0_2px_5px_rgba(0,0,0,0.12)] hover:shadow-[0_5px_18px_-2px_rgba(0,0,0,0.25)] active:scale-[0.97] transition-all duration-200 cursor-pointer"
                          style={{
                            background: `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/10 pointer-events-none" />
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="relative opacity-80 group-hover/btn:opacity-100 transition-opacity"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                          <span className="relative">Test</span>
                        </button>
                      </Link>
                    )}
                    {topic.pdfUrl && (
                      <Link href={`/pdf-view?file=${encodeURIComponent(topic.pdfUrl)}&title=${encodeURIComponent(topic.fullTitle)}`} className="flex-1">
                        <button className="group/btn relative w-full flex items-center justify-center gap-1.5 h-8 rounded-lg text-[11px] sm:text-xs font-bold tracking-wide overflow-hidden bg-gradient-to-b from-rose-50 to-orange-50 dark:from-rose-950/40 dark:to-orange-950/30 border border-rose-200/70 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_14px_-2px_rgba(0,0,0,0.2)] hover:border-rose-300 dark:hover:border-rose-600/50 active:scale-[0.97] transition-all duration-200 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover/btn:opacity-100 transition-opacity"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                          PDF
                        </button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </div>
            </div>
          )})}
        </div>
      </div>
    </main>
  );
}
