/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { useRef } from "react";
import Link from "next/link";
import type { Subject, TheoryData } from "@/types";

const sectionThemes = [
  {
    header: "bg-gradient-to-r from-emerald-500 to-teal-600",
    border: "border-emerald-200/70 dark:border-emerald-900/40",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    glow: "shadow-[0_10px_35px_-14px_rgba(16,185,129,0.35)] dark:shadow-[0_10px_35px_-14px_rgba(16,185,129,0.2)]",
  },
  {
    header: "bg-gradient-to-r from-rose-500 to-pink-600",
    border: "border-rose-200/70 dark:border-rose-900/40",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50/60 dark:bg-rose-950/20",
    dot: "bg-rose-500 dark:bg-rose-400",
    glow: "shadow-[0_10px_35px_-14px_rgba(244,63,94,0.35)] dark:shadow-[0_10px_35px_-14px_rgba(244,63,94,0.2)]",
  },
  {
    header: "bg-gradient-to-r from-amber-500 to-orange-500",
    border: "border-amber-200/70 dark:border-amber-900/40",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50/60 dark:bg-amber-950/20",
    dot: "bg-amber-500 dark:bg-amber-400",
    glow: "shadow-[0_10px_35px_-14px_rgba(245,158,11,0.35)] dark:shadow-[0_10px_35px_-14px_rgba(245,158,11,0.2)]",
  },
  {
    header: "bg-gradient-to-r from-fuchsia-500 to-purple-600",
    border: "border-fuchsia-200/70 dark:border-fuchsia-900/40",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    bg: "bg-fuchsia-50/60 dark:bg-fuchsia-950/20",
    dot: "bg-fuchsia-500 dark:bg-fuchsia-400",
    glow: "shadow-[0_10px_35px_-14px_rgba(217,70,239,0.35)] dark:shadow-[0_10px_35px_-14px_rgba(217,70,239,0.2)]",
  },
  {
    header: "bg-gradient-to-r from-indigo-500 to-blue-600",
    border: "border-indigo-200/70 dark:border-indigo-900/40",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50/60 dark:bg-indigo-950/20",
    dot: "bg-indigo-500 dark:bg-indigo-400",
    glow: "shadow-[0_10px_35px_-14px_rgba(99,102,241,0.35)] dark:shadow-[0_10px_35px_-14px_rgba(99,102,241,0.2)]",
  },
  {
    header: "bg-gradient-to-r from-cyan-500 to-sky-600",
    border: "border-cyan-200/70 dark:border-cyan-900/40",
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50/60 dark:bg-cyan-950/20",
    dot: "bg-cyan-500 dark:bg-cyan-400",
    glow: "shadow-[0_10px_35px_-14px_rgba(6,182,212,0.35)] dark:shadow-[0_10px_35px_-14px_rgba(6,182,212,0.2)]",
  },
];

export default function TheoryContent({
  subjectId,
  topicId,
  subject,
  theory,
}: {
  subjectId: string;
  topicId: string;
  subject: Subject;
  theory: TheoryData | undefined;
}) {
  const mainRef = useRef<HTMLElement>(null);

  if (!subject || !theory) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] dark:from-zinc-950 dark:to-black">
        <div
          className="text-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/60 dark:border-zinc-800/60 shadow-[0_20px_50px_-15px_rgba(99,102,241,0.25)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 flex items-center justify-center text-3xl">
            📝
          </div>
          <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-1">Theory ઉપલબ્ધ નથી</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">આ પ્રકરણ માટે હજુ content ઉમેરાયું નથી.</p>
          <Link href={`/subjects/${subjectId}`}>
            <button className="px-6 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer">
              ← પાછા જાઓ
            </button>
          </Link>
        </div>
      </main>
    );
  }

  // Render bold text matching **text**
  const renderBold = (text: string) => {
    if (!text) return "";
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={i} className="font-bold text-indigo-900 dark:text-indigo-400">{part.slice(2, -2)}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Formatting points to handle \n, markdown bold (**text**), and special separators
  const formatPointText = (point: string, allPoints: string[] = []) => {
    if (!point) return null;

    // First split by \n to handle multi-line strings from agents
    const lines = point.split('\n');

    return (
      <div className="flex flex-col gap-1.5">
        {lines.map((line, lIdx) => {
          let processed = line.trim();
          if (!processed) return null;
          
          // Remove leading dashes for bullet points if they exist
          if (processed.startsWith('- ')) {
            processed = processed.substring(2);
          }

          // Fix formatting bug: replace "**Heading →**" with "**Heading** →"
          if (processed.startsWith("**") && processed.includes("→**")) {
            processed = processed.replace("→**", "** →");
          }

          // Fix formatting bug: "**Heading → Details:**" -> "**Heading** → **Details:**"
          if (processed.startsWith("**") && (processed.endsWith("**") || processed.endsWith(":**")) && processed.includes("→")) {
            const isColonEnd = processed.endsWith(":**");
            const clean = isColonEnd ? processed.slice(2, -3) : processed.slice(2, -2);
            const parts = clean.split("→");
            const heading = parts[0].trim();
            const description = parts.slice(1).join("→").trim();
            processed = `**${heading}** → **${description}**${isColonEnd ? ":" : ""}`;
          }

          // Split by → if present
          if (processed.includes("→")) {
            const parts = processed.split("→");
            const heading = parts[0].trim();
            const description = parts.slice(1).join("→").trim();
            return (
              <span key={lIdx} className="text-base md:text-lg text-slate-700 dark:text-zinc-300 leading-snug block">
                <span className="font-bold text-indigo-900 dark:text-indigo-400">{renderBold(heading)}:</span> {renderBold(description)}
              </span>
            );
          }

          // Let's use our robust heading matcher for colon (:) separators
          // Match e.g., "**Heading (Details):** Explanation" or "૧. **Heading:** Explanation" or "**Heading**: Explanation"
          const headingMatch = processed.match(/^(\s*(?:\d+\.|\w\.|[-•*૧૨૩૪૫૬૭૮૯૦])?\s*)\*\*([^*]+)\*\*:\s*(.*)$/) ||
                               processed.match(/^(\s*(?:\d+\.|\w\.|[-•*૧૨૩૪૫૬૭૮૯૦])?\s*)\*\*([^*]+):\*\*\s*(.*)$/);

          if (headingMatch) {
            const prefix = headingMatch[1] || "";
            const headingText = headingMatch[2].trim();
            const descText = headingMatch[3].trim();
            return (
              <span key={lIdx} className="text-base md:text-lg text-slate-700 dark:text-zinc-300 leading-snug block">
                <span className="font-bold text-indigo-900 dark:text-indigo-400">{renderBold(prefix + headingText)}:</span> {renderBold(descText)}
              </span>
            );
          }

          // Split by colon if it represents a heading prefix (and not a URL or time) without asterisks
          const colonIndex = processed.indexOf(":");
          if (colonIndex > 0 && colonIndex < 40 && !processed.substring(0, colonIndex).includes("**")) {
            const heading = processed.substring(0, colonIndex).trim();
            const description = processed.substring(colonIndex + 1).trim();
            
            return (
              <span key={lIdx} className="text-base md:text-lg text-slate-700 dark:text-zinc-300 leading-snug block">
                <span className="font-bold text-indigo-900 dark:text-indigo-400">{heading}:</span> {renderBold(description)}
              </span>
            );
          }

          return (
            <span key={lIdx} className="text-base md:text-lg text-slate-700 dark:text-zinc-300 leading-snug block">
              {renderBold(processed)}
            </span>
          );
        })}
      </div>
    );
  };

  
  const renderMindMap = () => {
    if (!theory.mindMap || theory.mindMap.length === 0) return null;

    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl shadow-[0_10px_35px_-14px_rgba(217,70,239,0.3)] dark:shadow-[0_10px_35px_-14px_rgba(217,70,239,0.18)] mb-8 overflow-hidden">
        <div className="py-4 px-5 flex items-center gap-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-t-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles w-5 h-5 text-white/80"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
          <h3 className="text-lg font-bold text-white tracking-wide"><span>🧠 Quick Revise Mind Map</span></h3>
        </div>
        <div className="p-3 md:p-5 text-gray-700 dark:text-zinc-300">
          {theory.mindMap.map((section, sIdx) => {
            const sectionColors = [
              { bg: "bg-[#FF4D5E]", line: "bg-[#FF4D5E]" }, // Bright Red
              { bg: "bg-indigo-500", line: "bg-indigo-500" },
              { bg: "bg-amber-500", line: "bg-amber-500" },
              { bg: "bg-rose-500", line: "bg-rose-500" }
            ];
            const nodeColors = [
              { bg: "bg-[#1E90FF]", line: "bg-[#1E90FF]" }, // Bright Blue
              { bg: "bg-[#2ECC71]", line: "bg-[#2ECC71]" }, // Emerald Green
              { bg: "bg-[#9B59B6]", line: "bg-[#9B59B6]" }, // Purple
              { bg: "bg-[#F39C12]", line: "bg-[#F39C12]" }, // Orange
              { bg: "bg-[#E67E22]", line: "bg-[#E67E22]" }, // Dark Orange
              { bg: "bg-[#16A085]", line: "bg-[#16A085]" }, // Teal
            ];

            const sColor = sectionColors[sIdx % sectionColors.length];

            return (
              <div key={sIdx} className="my-4 md:my-6">
                <div className="w-full overflow-x-auto p-2 sm:p-3 md:p-6 custom-scrollbar bg-slate-50/50 dark:bg-zinc-800/10 rounded-xl border border-slate-200 dark:border-zinc-700">
                  <div className="flex flex-col items-center py-4 md:py-6 w-max min-w-full px-2 sm:px-4 md:px-8">
                    {/* Root Node */}
                    <div className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-white rounded-full shadow-md font-bold text-[11px] sm:text-[13px] md:text-lg mb-4 md:mb-6 relative z-10 text-center cursor-default ${sColor.bg}`}>
                      {section.title || section.label || section.concept}
                      {/* Vertical line from root */}
                      <div className={`absolute -bottom-4 md:-bottom-6 left-1/2 w-0.5 h-4 md:h-6 ml-[-1px] ${sColor.line}`}></div>
                    </div>
                    
                    <div className="flex justify-center w-full relative mt-2">
                      {/* Horizontal Spine connecting children */}
                      {(section.nodes || section.subTopics || section.children || section.relations || []).length > 1 && (
                        <div className={`absolute top-0 h-1 rounded-full ${sColor.line}`} 
                             style={{ left: `${50 / (section.nodes || section.subTopics || section.children || section.relations || []).length}%`, right: `${50 / (section.nodes || section.subTopics || section.children || section.relations || []).length}%` }}></div>
                      )}
                      
                      {(section.nodes || section.subTopics || section.children || section.relations || []).map((node: any, nIdx: number) => {
                        const nColor = nodeColors[nIdx % nodeColors.length];
                        let leafPoints = node.points || node.children || [];
                        if (leafPoints.length === 0 && node.description) {
                          leafPoints = typeof node.description === 'string' ? node.description.split('\n') : [node.description];
                        }
                        return (
                          <div key={nIdx} className="flex-1 px-1 sm:px-1.5 md:px-4 min-w-[130px] sm:min-w-[160px] md:min-w-[260px]">
                            <div className="flex flex-col items-center w-full relative h-full">
                              {/* Vertical line from horizontal spine down to child node */}
                              <div className={`absolute top-0 w-0.5 h-4 md:h-6 ${sColor.line}`}></div>
                              
                              {/* Child Node */}
                              <div className={`px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2.5 rounded-full shadow-md text-center w-max max-w-[95%] mx-auto cursor-default relative z-10 mt-4 md:mt-6 ${nColor.bg}`}>
                                <div className={`font-bold text-[10px] sm:text-[11px] md:text-[14px] whitespace-pre-wrap text-white`}>{node.title || node.label || (typeof node === 'string' ? node : '')}</div>
                              </div>

                              {/* Points (Leaf Nodes) */}
                              {leafPoints.length > 0 && (
                                <div className="flex flex-col items-center w-full mt-3 md:mt-5 relative">
                                  {/* Line from child node down to first point */}
                                  <div className={`absolute -top-3 md:-top-5 w-0.5 h-3 md:h-5 ${nColor.line}`}></div>
                                  
                                  <div className="flex flex-col gap-2 md:gap-3 w-full items-center">
                                    {leafPoints.map((pt: any, pIdx: number) => (
                                      <div key={pIdx} className="flex flex-col items-center relative w-full px-1 sm:px-1.5">
                                        {/* Line between points */}
                                        {pIdx > 0 && <div className={`absolute -top-1.5 md:-top-3 w-0.5 h-1.5 md:h-3 ${nColor.line}`}></div>}
                                        
                                        {/* Point Box */}
                                        <div className={`px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-4 md:py-2 rounded-md sm:rounded-lg md:rounded-2xl w-full max-w-[125px] sm:max-w-[150px] md:max-w-[220px] text-center shadow-sm border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 relative z-10 transition-transform hover:-translate-y-0.5 duration-200`}>
                                          <span className={`text-[9px] sm:text-[10px] md:text-[13px] leading-snug block ${pt.isBold ? 'font-extrabold' : 'font-semibold'}`}>
                                            {pt.title || pt.label || pt.text || (typeof pt === 'string' ? pt : JSON.stringify(pt))}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main ref={mainRef} className="relative flex-1 min-h-screen px-4 py-6 lg:p-10 transition-colors overflow-hidden bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] dark:from-zinc-950 dark:to-black">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] sm:blur-[130px]"
          style={{ backgroundColor: "rgba(99,102,241,0.10)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] sm:blur-[130px]"
          style={{ backgroundColor: "rgba(236,72,153,0.08)" }}
        />
      </div>

      <div className="mb-6 max-w-4xl mx-auto">
        {/* Modern Header Navigation Bar */}
        <div className="flex items-center gap-3 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/60 dark:border-zinc-800/60 rounded-2xl p-2 sm:p-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]">
          {/* Back button integrated inside */}
          <Link href={`/subjects/${subjectId}`}>
            <button className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-b from-[#f24c4c] to-[#d92b2b] border-b-[3px] border-[#9b1c1c] hover:brightness-110 active:translate-y-[1.5px] active:border-b-[1.5px] active:shadow-none transition-all duration-75 cursor-pointer shadow-[0_3px_10px_rgba(239,68,68,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 text-white">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          </Link>

          {/* Title Context */}
          <div className="flex-1 flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
            <span className="shrink-0 px-2.5 py-1 sm:px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] sm:text-xs font-black shadow-[0_4px_14px_-4px_rgba(236,72,153,0.5)]">
              {(() => {
                let num = "";
                const matchTitle = (theory.chapterTitle || "").match(/પ્રકરણ\s*([૧૨૩૪૫૬૭૮૯૦\d]+)/);
                if (matchTitle) {
                  const gujToEng: Record<string, string> = {
                    '૧': '1', '૨': '2', '૩': '3', '૪': '4', '૫': '5', '૬': '6', '૭': '7', '૮': '8', '૯': '9', '૦': '0'
                  };
                  num = matchTitle[1].split('').map(c => gujToEng[c] || c).join('');
                } else {
                  const matchId = (theory.chapterId || "").match(/ch-(\d+)/);
                  if (matchId) {
                    num = matchId[1];
                  }
                }
                return num ? `Ch. ${num}` : "Ch";
              })()}
            </span>
            <div className="h-4 w-[1.5px] bg-slate-200 dark:bg-zinc-700"></div>
            <h1 className="text-[13px] sm:text-base font-black text-slate-800 dark:text-zinc-100 truncate">
              {(theory.chapterTitle || "").replace(/પ્રકરણ\s*[૧૨૩૪૫૬૭૮૯૦\d]+\s*→\s*/g, "")}
            </h1>
          </div>
        </div>
      </div>

      <div className="space-y-2 md:space-y-3 px-0 max-w-4xl mx-auto">
        {/* Intro Description Card */}
        {theory.description && (
          <div className="relative overflow-hidden bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/60 dark:border-zinc-800/60 rounded-2xl shadow-[0_10px_35px_-14px_rgba(99,102,241,0.2)] dark:shadow-[0_10px_35px_-14px_rgba(0,0,0,0.4)] mb-6 sm:mb-8 p-5 sm:p-6 transition-all duration-300">
            {/* Left Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l-2xl"></div>

            <div className="flex items-start gap-4 relative z-10 pl-1">
              {/* Icon Container with subtle color */}
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] sm:text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/40">
                    પ્રકરણ પરિચય • Overview
                  </span>
                </div>
                <p className="text-[14px] sm:text-[15.5px] text-slate-700 dark:text-zinc-300 leading-relaxed font-bold">
                  {theory.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section Cards */}
        {theory.sections.map((section, idx) => {
          const theme = sectionThemes[idx % sectionThemes.length];
          const isSmartConcept = section.title.includes('Smart Concepts') || section.title.includes('સ્માર્ટ થીયરી');

          return (
            <div
              key={idx}
              className={`bg-white dark:bg-zinc-900/80 border ${isSmartConcept ? 'border-amber-300/70 dark:border-amber-700/50' : theme.border} rounded-3xl ${isSmartConcept ? 'shadow-[0_10px_35px_-14px_rgba(245,158,11,0.35)] dark:shadow-[0_10px_35px_-14px_rgba(245,158,11,0.2)]' : theme.glow} mb-6 md:mb-8 overflow-hidden`}
            >
              {/* Header */}
              <div className={`py-3 sm:py-4 px-4 sm:px-6 md:px-8 flex items-center gap-3 md:gap-4 ${isSmartConcept ? 'bg-gradient-to-r from-amber-500 to-orange-400' : theme.header}`}>
                {isSmartConcept ? (
                  <div className="p-1.5 md:p-2 bg-white/20 rounded-xl backdrop-blur-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-md">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                ) : (
                  <div className="p-1.5 md:p-2 bg-white/20 rounded-xl backdrop-blur-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-md">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                  </div>
                )}
                <h3 className="text-[17px] md:text-[22px] font-black text-white tracking-wide drop-shadow-sm flex-1">
                  {section.title}
                </h3>
                {isSmartConcept && (
                  <div className="ml-auto px-2.5 py-1 bg-white/25 rounded-full text-[10px] md:text-[11px] font-extrabold text-white uppercase tracking-widest backdrop-blur-md border border-white/30 shadow-inner">
                    Premium
                  </div>
                )}
              </div>

              {/* Body Content */}
              <div className={`px-4 sm:px-6 md:px-8 py-5 sm:py-7 ${isSmartConcept ? 'bg-amber-50/30 dark:bg-amber-950/10' : theme.bg}`}>
                {(section.content || []).map((subtopic: any, subIdx: number) => {
                  if (typeof subtopic === 'string') {
                    return (
                      <div key={subIdx} className={`space-y-3 md:space-y-4 ml-3 sm:ml-5 border-l-2 border-slate-200/60 dark:border-zinc-800 pl-4 md:pl-5 relative ${subIdx === 0 ? '' : 'mt-4'}`}>
                        <div className="flex gap-3 md:gap-4 items-start group relative">
                          <span className={`absolute -left-[23px] sm:-left-[27px] md:-left-[29px] top-2 md:top-2.5 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${theme.dot} ring-4 ring-white dark:ring-zinc-900/80`}></span>
                          <div className="flex-1 pt-0.5 leading-relaxed md:leading-loose text-[14px] md:text-[15.5px] text-slate-700 dark:text-zinc-300">
                            {formatPointText(subtopic)}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  
                  if (subtopic.type === 'text') {
                    return (
                      <div key={subIdx} className="mb-4 mt-2 text-[14.5px] md:text-[16px] text-slate-700 dark:text-zinc-300 leading-relaxed md:leading-loose">
                        {formatPointText(subtopic.text)}
                      </div>
                    );
                  }
                  
                  if (subtopic.type === 'bullet-list') {
                    return (
                      <div key={subIdx} className="space-y-3 md:space-y-4 ml-3 sm:ml-5 border-l-2 border-slate-200/60 dark:border-zinc-800 pl-4 md:pl-5 relative mb-6 mt-4">
                        {(subtopic.items || []).map((point: string, pIdx: number) => (
                          <div key={pIdx} className="flex gap-3 md:gap-4 items-start group relative">
                            <span className={`absolute -left-[23px] sm:-left-[27px] md:-left-[29px] top-2 md:top-2.5 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${theme.dot} ring-4 ring-white dark:ring-zinc-900/80`}></span>
                            <div className="flex-1 pt-0.5 leading-relaxed md:leading-loose text-[14px] md:text-[15.5px] text-slate-700 dark:text-zinc-300">
                              {formatPointText(point, subtopic.items)}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  
                  if (subtopic.type === 'highlight') {
                    return (
                      <div key={subIdx} className="my-5 p-4 md:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/60 dark:from-indigo-900/25 dark:to-purple-900/15 border border-indigo-100/80 dark:border-indigo-800/40 text-indigo-900 dark:text-indigo-300 font-bold text-center text-base md:text-lg shadow-[0_6px_20px_-8px_rgba(99,102,241,0.25)] dark:shadow-[0_6px_20px_-8px_rgba(99,102,241,0.15)]">
                        {formatPointText(subtopic.text)}
                      </div>
                    );
                  }
                  
                  if (subtopic.type === 'table') {
                    return (
                      <div key={subIdx} className="mt-4 mb-2 overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_-8px_rgba(0,0,0,0.3)]">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-zinc-800">
                          <thead className="bg-slate-100/80 dark:bg-zinc-800/80 backdrop-blur-sm">
                            <tr>
                              {(subtopic.headers || []).map((header: string, hIdx: number) => (
                                <th key={hIdx} scope="col" className="px-3.5 py-2 md:px-4 md:py-2.5 text-left text-xs md:text-sm font-black text-slate-700 dark:text-zinc-300 uppercase tracking-widest border-b-[2px] border-slate-200 dark:border-zinc-700">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-slate-100 dark:divide-zinc-800/50">
                            {(subtopic.rows || []).map((row: any, rIdx: number) => (
                              <tr key={rIdx} className={`transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800/50 ${rIdx % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-slate-50/40 dark:bg-zinc-900/80"}`}>
                                {(Array.isArray(row) ? row : (row.cells || [])).map((cell: any, cIdx: number) => (
                                  <td key={cIdx} className="px-3.5 py-2 md:px-4 md:py-2.5 text-[13px] md:text-sm text-slate-700 dark:text-zinc-300 font-medium whitespace-pre-wrap leading-normal">
                                    {renderBold(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  
                  return (
                  <div key={subIdx}>
                    {/* Numbered Subtopic Title with modern styling */}
                    {subtopic.title && (
                      <div className="mb-4 mt-1 flex items-start sm:items-center gap-3 md:gap-4">
                        <span className={`flex items-center justify-center shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-xl md:rounded-2xl text-white text-[13px] md:text-sm font-black shadow-md ${theme.header} shadow-inner`}>
                          {subIdx + 1}
                        </span>
                        <h4 className={`text-[17px] md:text-[20px] font-black text-slate-800 dark:text-zinc-100 tracking-wide mt-1 sm:mt-0`}>
                          {subtopic.title}
                        </h4>
                      </div>
                    )}

                    <div className="space-y-3 md:space-y-4 ml-3 sm:ml-5 border-l-2 border-slate-200/60 dark:border-zinc-800 pl-4 md:pl-5 relative">
                      {subtopic.points && subtopic.points.map((point: string, pIdx: number) => (
                        <div key={pIdx} className="flex gap-3 md:gap-4 items-start group relative">
                          <span className={`absolute -left-[23px] sm:-left-[27px] md:-left-[29px] top-2 md:top-2.5 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${theme.dot} ring-4 ring-white dark:ring-zinc-900/80`}></span>
                          <div className="flex-1 pt-0.5 leading-relaxed md:leading-loose text-[14px] md:text-[15.5px] text-slate-700 dark:text-zinc-300">
                            {formatPointText(point, subtopic.points)}
                          </div>
                        </div>
                      ))}
                    </div>

                {/* Divider between subtopics */}
                    {subIdx < (section.content || []).length - 1 && (
                      <hr className="border-t border-slate-200 dark:border-zinc-800/80 my-5 sm:my-7 ml-4" />
                    )}
                  </div>
                  );
                })}

                {/* Section level points if any */}
                {section.points && section.points.length > 0 && (
                  <div className={`space-y-3 md:space-y-4 ml-3 sm:ml-5 border-l-2 border-slate-200/60 dark:border-zinc-800 pl-4 md:pl-5 relative ${(section.content && section.content.length > 0) ? 'mt-6' : ''}`}>
                    {section.points.map((point: string, pIdx: number) => (
                      <div key={pIdx} className="flex gap-3 md:gap-4 items-start group relative">
                        <span className={`absolute -left-[23px] sm:-left-[27px] md:-left-[29px] top-2 md:top-2.5 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${theme.dot} ring-4 ring-white dark:ring-zinc-900/80`}></span>
                        <div className="flex-1 pt-0.5 leading-relaxed md:leading-loose text-[14px] md:text-[15.5px] text-slate-700 dark:text-zinc-300">
                          {formatPointText(point, section.points)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Table if exists inside section */}
                {section.table && (
                  <div className="mt-4 mb-2 overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_-8px_rgba(0,0,0,0.3)]">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-zinc-800">
                      <thead className="bg-slate-100/80 dark:bg-zinc-800/80 backdrop-blur-sm">
                        <tr>
                          {section.table.headers.map((header, hIdx) => (
                            <th
                              key={hIdx}
                              scope="col"
                              className="px-3.5 py-2 md:px-4 md:py-2.5 text-left text-xs md:text-sm font-black text-slate-700 dark:text-zinc-300 uppercase tracking-widest border-b-[2px] border-slate-200 dark:border-zinc-700"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-zinc-900 divide-y divide-slate-100 dark:divide-zinc-800/50">
                        {section.table.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={`transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800/50 ${rIdx % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-slate-50/40 dark:bg-zinc-900/80"}`}
                          >
                            {(Array.isArray(row) ? row : row.cells).map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="px-3.5 py-2 md:px-4 md:py-2.5 text-[13px] md:text-sm text-slate-700 dark:text-zinc-300 font-medium whitespace-pre-wrap leading-normal"
                              >
                                {renderBold(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Image Illustration if exists inside section */}
                {section.imageUrl && (
                  <div className="mt-6 mb-2 w-full flex justify-center items-center">
                    <div className="bg-white dark:bg-zinc-900/50 p-3 md:p-4 rounded-3xl shadow-lg border border-slate-200 dark:border-zinc-800 w-full md:w-3/4 flex justify-center items-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={section.imageUrl} 
                        alt="Theory Illustration" 
                        loading="lazy"
                        className="w-full h-auto rounded-2xl object-contain max-h-[450px] hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </div>
                )}

                {/* SVG/HTML Illustration if exists inside section */}
                {section.illustration && (
                  <div className="mt-5 mb-2 w-full flex justify-center items-center">
                    <div 
                      className="bg-white dark:bg-zinc-900/50 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-800 w-full md:w-3/4 lg:w-2/3 flex justify-center items-center overflow-x-auto custom-scrollbar [&>svg]:max-w-full [&>svg]:h-auto"
                      dangerouslySetInnerHTML={{ __html: section.illustration }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Mind Map */}
        {renderMindMap()}

        {/* Bottom Practice Test CTA */}
        <div className="pt-5 pb-6 md:pt-8 md:pb-8 flex flex-col items-center justify-center space-y-3 px-4">
          <p className="text-slate-500 dark:text-zinc-400 italic text-sm md:text-base">શું તમે આ વિષયમાં નિપુણતા મેળવી લીધી છે?</p>
          <Link href={`/subjects/${subjectId}/${topicId}/test`} prefetch={true}>
            <button className="relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold px-6 h-10 md:px-8 md:h-12 text-sm md:text-lg rounded-full text-white bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#f97316] shadow-[0_8px_24px_-6px_rgba(124,58,237,0.45)] cursor-pointer hover:shadow-[0_12px_32px_-6px_rgba(124,58,237,0.55)] hover:scale-[1.02] active:scale-95 transition-all duration-300">
              <span className="home-cta-shimmer" />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list mr-1.5 w-4 h-4 md:mr-2 md:w-5 md:h-5">
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
                <path d="M3 6h.01" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M8 6h13" />
              </svg>
              Start Practice Test
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1.5 w-4 h-4 md:ml-2 md:w-5 md:h-5">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
