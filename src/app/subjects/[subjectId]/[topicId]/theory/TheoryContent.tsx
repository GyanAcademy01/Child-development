"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { TheoryData } from "@/types";

const sectionThemes = [
  { header: "bg-teal-500", border: "border-teal-400", text: "text-teal-500" },
  { header: "bg-rose-500", border: "border-rose-400", text: "text-rose-500" },
  { header: "bg-amber-500", border: "border-amber-400", text: "text-amber-500" },
  { header: "bg-fuchsia-500", border: "border-fuchsia-400", text: "text-fuchsia-500" },
  { header: "bg-cyan-500", border: "border-cyan-400", text: "text-cyan-500" },
  { header: "bg-emerald-500", border: "border-emerald-400", text: "text-emerald-500" },
  { header: "bg-orange-500", border: "border-orange-400", text: "text-orange-500" },
];

export default function TheoryContent({
  subjectId,
  topicId,
  subject,
  theory,
}: {
  subjectId: string;
  topicId: string;
  subject: any;
  theory: TheoryData | undefined;
}) {
  const mainRef = useRef<HTMLElement>(null);

  if (!subject || !theory) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4 bg-slate-50 dark:bg-zinc-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-3xl">
            📝
          </div>
          <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-1">Theory ઉપલબ્ધ નથી</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">આ પ્રકરણ માટે હજુ content ઉમેરાયું નથી.</p>
          <Link href={`/subjects/${subjectId}`}>
            <button className="px-6 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer">
              ← પાછા જાઓ
            </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  // Formatting points to separate terms before '→' or ':' and style them beautifully
  const formatPointText = (point: string, allPoints: string[] = []) => {
    let processed = point;

    // Split by → if present
    if (processed.includes("→")) {
      const parts = processed.split("→");
      const heading = parts[0].trim();
      const description = parts.slice(1).join("→").trim();
      return (
        <span className="text-[15px] md:text-base text-slate-700 dark:text-zinc-300 leading-snug">
          <span className="font-bold text-indigo-900 dark:text-indigo-400">{heading}:</span> {description}
        </span>
      );
    }

    const renderDescription = (text: string, isKoniVachche: boolean = false) => {
      if (!isKoniVachche || !text.includes("vs")) {
        if (!text.includes("vs")) return text;
        const parts = text.split(/(vs)/i);
        return parts.map((part, i) => {
          if (part.toLowerCase() === "vs") {
            return <span key={i} className="text-red-500 dark:text-red-400 font-bold mx-1">{part}</span>;
          }
          return <span key={i}>{part}</span>;
        });
      }

      // It is "કોની વચ્ચે" AND has "vs"
      let cleanText = text.trim();
      if (cleanText.startsWith('(') && cleanText.endsWith(')')) {
        cleanText = cleanText.substring(1, cleanText.length - 1);
      }

      const parties = cleanText.split(/vs/i);
      
      // Find winner
      let winner = "";
      const winnerPoint = allPoints.find(p => p.includes("વિજેતા:"));
      if (winnerPoint) {
        winner = winnerPoint.split("વિજેતા:")[1].trim().toLowerCase();
      }

      const isDraw = winner.includes("અનિર્ણિત");
      
      let winnerIdx = -1;
      if (!isDraw && winner) {
        const calculateScore = (p: string) => {
          let score = 0;
          const pLower = p.toLowerCase();
          
          if (pLower === winner) score += 100;
          if (pLower.includes(winner) || winner.includes(pLower)) score += 50;
          
          const ignoreWords = ["સેના", "સામ્રાજ્ય", "રાજ્ય", "જોડાણ", "કંપની", "સંગઠન", "અને", "તથા", "સાથે", "વચ્ચે", "વ્યૂહાત્મક", "વિજય", "આર્મી", "ફોર્સ"];
          const wTokens = winner.replace(/[()]/g, '').split(/\s+/).filter(t => t.length > 2 && !ignoreWords.includes(t.toLowerCase()));
          
          for (const token of wTokens) {
            if (pLower.includes(token) || token.includes(pLower)) {
              score += 10;
            }
          }
          
          if (winner.includes("મુઘલ") && pLower.includes("અકબર")) score += 20;
          if (winner.includes("અંગ્રેજ") && pLower.includes("બ્રિટિશ")) score += 20;
          if (winner.includes("ભારત") && pLower.includes("ભારતીય")) score += 20;
          
          return score;
        };

        const scores = parties.map(p => calculateScore(p.trim()));
        let maxScore = 0;
        for (let i = 0; i < scores.length; i++) {
          if (scores[i] > maxScore) {
            maxScore = scores[i];
            winnerIdx = i;
          }
        }
      }

      return (
        <span className="inline-flex items-center flex-wrap">
          {parties.map((party, idx) => {
            const p = party.trim();
            
            let isWinner = false;
            let isLoser = false;
            
            if (!isDraw && winnerIdx !== -1) {
               if (idx === winnerIdx) {
                 isWinner = true;
               } else {
                 isLoser = true;
               }
            }

            let badgeClass = "bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
            if (isWinner) badgeClass = "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
            if (isLoser) badgeClass = "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";

            return (
              <span key={`party-${idx}`} className="flex items-center my-0.5">
                <span className={`px-2.5 py-0.5 rounded-full border text-[13px] md:text-[14px] font-extrabold shadow-sm ${badgeClass}`}>
                  {p}
                </span>
                {idx < parties.length - 1 && (
                  <span className="text-red-500 dark:text-red-400 font-extrabold mx-1.5 text-[13px]">VS</span>
                )}
              </span>
            );
          })}
        </span>
      );
    };

    // Split by colon if it represents a heading prefix
    const colonIndex = processed.indexOf(":");
    if (colonIndex > 0 && colonIndex < 35) {
      const heading = processed.substring(0, colonIndex).trim();
      const description = processed.substring(colonIndex + 1).trim();
      const isKoniVachche = heading.includes("કોની વચ્ચે");
      
      return (
        <span className="text-[15px] md:text-base text-slate-700 dark:text-zinc-300 leading-snug">
          <span className="font-bold text-indigo-900 dark:text-indigo-400">{heading}:</span> {renderDescription(description, isKoniVachche)}
        </span>
      );
    }

    return <span className="text-[15px] md:text-base text-slate-700 dark:text-zinc-300 leading-snug">{renderDescription(processed)}</span>;
  };

  
  const renderMindMap = () => {
    if (!theory.mindMap || theory.mindMap.length === 0) return null;

    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.13),0_2px_6px_-1px_rgba(0,0,0,0.08)] mx-2 mb-8 overflow-hidden">
        <div className="py-4 px-5 flex items-center gap-3 bg-fuchsia-500 rounded-t-2xl">
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
                      {section.title}
                      {/* Vertical line from root */}
                      <div className={`absolute -bottom-4 md:-bottom-6 left-1/2 w-0.5 h-4 md:h-6 ml-[-1px] ${sColor.line}`}></div>
                    </div>
                    
                    <div className="flex justify-center w-full relative">
                      {/* Horizontal Spine connecting children */}
                      {section.nodes.length > 1 && (
                        <div className={`absolute top-0 h-0.5 rounded-full ${sColor.line}`} 
                             style={{ left: `${50 / section.nodes.length}%`, right: `${50 / section.nodes.length}%` }}></div>
                      )}
                      
                      {section.nodes.map((node, nIdx) => {
                        const nColor = nodeColors[nIdx % nodeColors.length];
                        return (
                          <div key={nIdx} className="flex-1 px-1 sm:px-1.5 md:px-4 min-w-[130px] sm:min-w-[160px] md:min-w-[260px]">
                            <div className="flex flex-col items-center w-full relative h-full">
                              {/* Vertical line from horizontal spine down to child node */}
                              <div className={`absolute top-0 w-0.5 h-4 md:h-6 ${sColor.line}`}></div>
                              
                              {/* Child Node */}
                              <div className={`px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2.5 rounded-full shadow-md text-center w-max max-w-[95%] mx-auto cursor-default relative z-10 mt-4 md:mt-6 ${nColor.bg}`}>
                                <div className={`font-bold text-[10px] sm:text-[11px] md:text-[14px] whitespace-pre-wrap text-white`}>{node.title}</div>
                              </div>

                              {/* Points (Leaf Nodes) */}
                              {node.points && node.points.length > 0 && (
                                <div className="flex flex-col items-center w-full mt-3 md:mt-5 relative">
                                  {/* Line from child node down to first point */}
                                  <div className={`absolute -top-3 md:-top-5 w-0.5 h-3 md:h-5 ${nColor.line}`}></div>
                                  
                                  <div className="flex flex-col gap-1.5 md:gap-3 w-full items-center">
                                    {node.points.map((pt, pIdx) => (
                                      <div key={pIdx} className="flex flex-col items-center relative w-full px-1 sm:px-1.5">
                                        {/* Line between points */}
                                        {pIdx > 0 && <div className={`absolute -top-1.5 md:-top-3 w-0.5 h-1.5 md:h-3 ${nColor.line}`}></div>}
                                        
                                        {/* Point Box */}
                                        <div className={`px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-4 md:py-2 rounded-md sm:rounded-lg md:rounded-2xl w-full max-w-[125px] sm:max-w-[150px] md:max-w-[220px] text-center shadow-sm border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 relative z-10 transition-transform hover:-translate-y-0.5 duration-200`}>
                                          <span className={`text-[9px] sm:text-[10px] md:text-[13px] leading-snug block ${pt.isBold ? 'font-extrabold' : 'font-semibold'}`}>
                                            {pt.text}
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
    <main ref={mainRef} className="flex-1 bg-slate-50 dark:bg-zinc-950 min-h-screen pb-6 md:pb-10 transition-colors">
      <div className="py-1.5 sm:py-3">
        {/* Back Button and H1 Header Row */}
        <div className="flex items-center gap-3 mb-1.5 sm:mb-3 px-3 sm:px-4 max-w-4xl mx-auto">
          <Link href={`/subjects/${subjectId}`}>
            <button className="inline-flex items-center justify-center bg-background dark:bg-zinc-900 rounded-xl h-9 w-9 md:h-10 md:w-10 border border-slate-200 dark:border-zinc-800 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 md:h-5 md:w-5 text-red-600 dark:text-red-500">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </button>
          </Link>
          <div className="flex-1 flex justify-center">
            <h1 className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-900 dark:to-zinc-950/90 border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl sm:rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 w-full sm:w-auto max-w-full text-center group transition-all duration-300">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-[0_2px_10px_-2px_rgba(244,63,94,0.4)] text-[11px] sm:text-xs font-extrabold tracking-wider shrink-0 inline-flex items-center justify-center">
                {(() => {
                  const match = (theory.chapterTitle || "").match(/પ્રકરણ\s*([૧૨૩૪૫૬૭૮૯૦\d]+)/);
                  if (!match) return "Ch";
                  const gujToEng: Record<string, string> = {
                    '૧': '1', '૨': '2', '૩': '3', '૪': '4', '૫': '5', '૬': '6', '૭': '7', '૮': '8', '૯': '9', '૦': '0'
                  };
                  const num = match[1].split('').map(c => gujToEng[c] || c).join('');
                  return `Ch. ${num}`;
                })()}
              </span>
              <span className="hidden sm:block w-[2px] h-4 bg-slate-200 dark:bg-zinc-700 rounded-full shrink-0 transition-colors group-hover:bg-rose-200 dark:group-hover:bg-rose-900/50"></span>
              <span className="text-[13px] sm:text-[14px] md:text-[15px] font-black text-slate-800 dark:text-zinc-100 tracking-tight break-words whitespace-normal leading-snug">
                {(theory.chapterTitle || "").replace(/પ્રકરણ\s*[૧૨૩૪૫૬૭૮૯૦\d]+\s*→\s*/g, "")}
              </span>
            </h1>
          </div>
          <div className="w-9 md:w-10" />
        </div>
      </div>

      <div className="space-y-2 md:space-y-3 px-0 max-w-4xl mx-auto">
        {/* Intro Description Card */}
        {theory.description && (
          <div className="relative overflow-hidden bg-gradient-to-br from-teal-50/60 via-emerald-50/40 to-slate-50/60 dark:from-teal-950/40 dark:via-emerald-900/20 dark:to-zinc-900/40 border border-teal-100/80 dark:border-teal-900/50 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.13),0_2px_6px_-1px_rgba(0,0,0,0.08)] mx-2 mb-2.5 sm:mb-3 p-3 sm:p-3.5 group hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.18),0_3px_10px_-2px_rgba(0,0,0,0.1)] hover:border-teal-200/80 dark:hover:border-teal-800/80 transition-all duration-300">
            {/* Ambient glow decoration */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-teal-200/30 dark:from-teal-500/10 to-emerald-200/10 dark:to-emerald-500/5 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-200/25 dark:from-cyan-500/10 to-teal-200/10 dark:to-teal-500/5 rounded-full blur-2xl pointer-events-none -ml-8 -mb-8"></div>
            
            {/* Premium left accent gradient bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-teal-400 via-emerald-500 to-cyan-500 rounded-l-xl"></div>

            <div className="flex items-start gap-3 relative z-10">
              {/* Sparkle icon with modern shadow */}
              <div className="flex-shrink-0 flex items-center justify-center w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-lg bg-gradient-to-br from-teal-400 via-emerald-500 to-cyan-500 text-white shadow-md shadow-teal-200/40 dark:shadow-teal-900/40 mt-0.5 transform group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>

              {/* Content text */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[9.5px] sm:text-[10.5px] font-extrabold text-teal-700 dark:text-teal-400 uppercase tracking-wider bg-teal-50/80 dark:bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-200/60 dark:border-teal-500/20">
                    પ્રકરણ પરિચય • Overview
                  </span>
                </div>
                <p className="text-[13px] sm:text-[14px] md:text-[14.5px] text-slate-700 dark:text-zinc-300 leading-normal font-bold">
                  {theory.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section Cards */}
        {theory.sections.map((section, idx) => {
          const theme = sectionThemes[idx % sectionThemes.length];
          return (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.13),0_2px_6px_-1px_rgba(0,0,0,0.08)] mx-2 mb-4 md:mb-6 overflow-hidden"
            >
              {/* Header */}
              <div className={`py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-3.5 md:px-4 flex items-center gap-2 ${theme.header} rounded-t-2xl`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-[18px] md:h-[18px] text-white/90 shrink-0">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  <path d="M20 3v4" />
                  <path d="M22 5h-4" />
                  <path d="M4 17v2" />
                  <path d="M5 18H3" />
                </svg>
                <h3 className="text-[15px] sm:text-[16px] md:text-[17.5px] font-extrabold text-white tracking-wide">
                  <span>{section.title}</span>
                </h3>
              </div>

              {/* Body Content */}
              <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-gray-700 dark:text-zinc-300">
                {section.content.map((subtopic, subIdx) => (
                  <div key={subIdx}>
                    {/* Numbered Subtopic Title with underline accent */}
                    {subtopic.title && (
                      <div className="mb-2 sm:mb-3 mt-0.5 flex items-start gap-2.5">
                        {(topicId === "chapter-29" || topicId === "chapter-30") && (
                          <span className={`flex items-center justify-center shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white text-[13px] sm:text-sm font-black shadow-md ${theme.header} mt-0.5 border-[2px] border-white dark:border-zinc-900 ring-2 ring-slate-100 dark:ring-zinc-800`}>
                            {topicId === "chapter-30" ? subIdx + 19 : subIdx + 1}
                          </span>
                        )}
                        <h4 className={`text-[15px] sm:text-base md:text-[17px] font-extrabold text-slate-800 dark:text-zinc-100 pb-0.5 border-b-[3px] ${theme.border} inline-block tracking-wide ${(topicId === "chapter-29" || topicId === "chapter-30") ? 'mt-1' : ''}`}>
                          {subtopic.title}
                        </h4>
                      </div>
                    )}

                    <div className="space-y-2 md:space-y-3">
                      {subtopic.points && subtopic.points.map((point, pIdx) => (
                        <div key={pIdx} className="flex gap-2.5 md:gap-3 group">
                          <div className="mt-[6px] shrink-0">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-400 dark:bg-zinc-600 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-400 transition-colors" />
                          </div>
                          <div className="flex-1">{formatPointText(point, subtopic.points)}</div>
                        </div>
                      ))}
                    </div>

                    {/* Divider between subtopics */}
                    {subIdx < section.content.length - 1 && (
                      <hr className="border-t border-dashed border-slate-200 dark:border-zinc-800 my-3 sm:my-4" />
                    )}
                  </div>
                ))}

                {/* Table if exists inside section */}
                {section.table && (
                  <div className="mt-3 sm:mt-4 overflow-x-auto rounded-xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-zinc-800">
                      <thead className="bg-slate-50 dark:bg-zinc-800/50">
                        <tr>
                          {section.table.headers.map((header, hIdx) => (
                            <th
                              key={hIdx}
                              scope="col"
                              className="px-3 py-2 md:px-4 md:py-3 text-left text-[11px] md:text-xs font-bold text-slate-700 dark:text-zinc-400 uppercase tracking-wider bg-slate-100 dark:bg-zinc-800"
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
                            className={rIdx % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-slate-50/30 dark:bg-zinc-800/30"}
                          >
                            {(Array.isArray(row) ? row : row.cells).map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-slate-700 dark:text-zinc-300 font-medium whitespace-pre-wrap"
                              >
                                {cell}
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
                  <div className="mt-5 mb-2 w-full flex justify-center items-center">
                    <div className="bg-white dark:bg-zinc-900/50 p-2 md:p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-800 w-full md:w-3/4 lg:w-2/3 flex justify-center items-center overflow-hidden">
                      <img 
                        src={section.imageUrl} 
                        alt="Theory Illustration" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto rounded-xl object-contain max-h-[400px] hover:scale-[1.02] transition-transform duration-300"
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
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium px-6 h-10 md:px-8 md:h-12 text-sm md:text-lg rounded-full bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md cursor-pointer hover:bg-slate-800 dark:hover:bg-white active:scale-95 transition-all duration-150">
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
