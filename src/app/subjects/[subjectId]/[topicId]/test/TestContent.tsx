"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import type { Subject, TestData } from "@/types";
import { playCorrectSound, playWrongSound } from "@/lib/sounds";

interface TestContentProps {
  subject: Subject;
  test: TestData;
  subjectId: string;
  topicId: string;
}

export default function TestContent({ subject, test, subjectId, topicId }: TestContentProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (isComplete && test) {
      const percentage = Math.round((score / test.questions.length) * 100);
      localStorage.setItem(`test_result_${subjectId}_${topicId}`, percentage.toString());
    }
  }, [isComplete, score, test, subjectId, topicId]);

  const toggleReview = (idx: number) => {
    setExpandedReviews(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (isAnswered || !test) return;
      setSelectedAnswer(optionIndex);
      setIsAnswered(true);
      const isCorrect = optionIndex === test.questions[currentQ].correctAnswer;
      if (isCorrect) {
        setScore((prev) => prev + 1);
        playCorrectSound();
      } else {
        playWrongSound();
      }
      
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQ] = optionIndex;
        return newAnswers;
      });
    },
    [isAnswered, test, currentQ]
  );

  const handleNext = useCallback(() => {
    if (!test) return;
    setIsExplanationOpen(false);
    if (currentQ < test.questions.length - 1) {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      if (answers[nextQ] !== undefined) {
        setSelectedAnswer(answers[nextQ]);
        setIsAnswered(answers[nextQ] !== null);
      } else {
        setSelectedAnswer(null);
        setIsAnswered(false);
      }
    } else {
      setIsComplete(true);
    }
  }, [currentQ, test, answers]);

  const handlePrev = useCallback(() => {
    if (currentQ > 0) {
      setIsExplanationOpen(false);
      const prevQ = currentQ - 1;
      setCurrentQ(prevQ);
      if (answers[prevQ] !== undefined) {
        setSelectedAnswer(answers[prevQ]);
        setIsAnswered(answers[prevQ] !== null);
      } else {
        setSelectedAnswer(null);
        setIsAnswered(false);
      }
    }
  }, [currentQ, answers]);

  const handleSkip = useCallback(() => {
    if (!test) return;
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQ] = null;
      return newAnswers;
    });
    setIsExplanationOpen(false);
    if (currentQ < test.questions.length - 1) {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      if (answers[nextQ] !== undefined) {
        setSelectedAnswer(answers[nextQ]);
        setIsAnswered(answers[nextQ] !== null);
      } else {
        setSelectedAnswer(null);
        setIsAnswered(false);
      }
    } else {
      setIsComplete(true);
    }
  }, [currentQ, test, answers]);

  const handleRetry = useCallback(() => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
    setAnswers([]);
    setExpandedReviews({});
  }, []);

  const question = test.questions[currentQ];
  const progressPercent = ((currentQ + (isAnswered ? 1 : 0)) / test.questions.length) * 100;

  if (isComplete) {
    const percentage = Math.round((score / test.questions.length) * 100);
    const correctCount = score;
    const skippedCount = answers.filter(a => a === null || a === undefined).length;
    const wrongCount = test.questions.length - correctCount - skippedCount;
    const emoji =
      percentage >= 80
        ? "🏆"
        : percentage >= 60
        ? "👏"
        : percentage >= 40
        ? "💪"
        : "📚";
    const message =
      percentage >= 80
        ? "ઉત્કૃષ્ટ! તમે ખૂબ સારું કર્યું!"
        : percentage >= 60
        ? "સારું! થોડી વધુ પ્રેક્ટિસ કરો!"
        : percentage >= 40
        ? "ઠીક છે! Theory ફરીથી વાંચો!"
        : "ચિંતા ન કરો! Theory વાંચીને ફરીથી ટ્રાય કરો!";

    return (
      <main className="relative flex-1 flex flex-col items-center px-4 py-6 lg:p-10 overflow-x-hidden overflow-y-auto pb-12 custom-scrollbar">
        {/* Background Blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] sm:blur-[130px]" style={{ backgroundColor: `${subject.color}26` }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] sm:blur-[130px]" style={{ backgroundColor: `${subject.color2}26` }} />
          <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] rounded-full bg-white/50 blur-[80px] sm:blur-[110px] dark:bg-white/5" />
          <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] rounded-full bg-white/40 blur-[80px] sm:blur-[110px] dark:bg-white/5" />
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mb-8 mt-2"
        >
          <div className={`bg-white dark:bg-zinc-900 text-center rounded-2xl overflow-hidden border ${
            percentage >= 60 ? "border-emerald-200 dark:border-emerald-800 shadow-[0_4px_24px_rgba(16,185,129,0.12)]" : "border-zinc-200 dark:border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          }`}>
            <div className="p-4 sm:p-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 180 }}
                className="text-4xl sm:text-5xl mb-2"
              >
                {emoji}
              </motion.div>
              <h2 className="text-lg sm:text-xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-0.5">
                ટેસ્ટ પૂર્ણ!
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-[11px] sm:text-xs mb-4 leading-relaxed">
                {message}
              </p>

              {/* Score Circle */}
              <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="8" className="dark:stroke-zinc-800" />
                  <motion.circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke={percentage >= 60 ? "#10b981" : "#ef4444"}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - percentage / 100) }}
                    transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="text-center z-10">
                  <span className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-100">{score}</span>
                  <span className="text-zinc-400 font-semibold text-xs">/{test.questions.length}</span>
                  <p className="text-[10px] font-bold text-zinc-400 mt-0.5">{percentage}%</p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5">
                <div className="flex flex-col items-center">
                  <div className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-1 shadow-sm border border-emerald-100 dark:border-emerald-500/20">{correctCount}</div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 dark:text-zinc-400">સાચા</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-1 shadow-sm border border-red-100 dark:border-red-500/20">{wrongCount}</div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 dark:text-zinc-400">ખોટા</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-1 shadow-sm border border-zinc-200 dark:border-zinc-700">{skippedCount}</div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 dark:text-zinc-400">છોડ્યા</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={handleRetry}
                  className="flex-1 cursor-pointer rounded-xl border-zinc-200 dark:border-zinc-700 h-11 text-[13px] sm:text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  🔄 ફરીથી આપો
                </Button>
                <Link href={`/subjects/${subjectId}/${topicId}/theory`} prefetch={true} className="flex-1">
                  <Button
                    className="w-full cursor-pointer rounded-xl h-11 text-[13px] sm:text-sm text-white border-0 hover:scale-105 transition-all font-semibold hover:brightness-110"
                    style={{
                      background: `linear-gradient(135deg, #4f7df9, #7c5cf5)`,
                      boxShadow: `0 4px 12px rgba(79,125,249,0.25)`
                    }}
                  >
                    📝 Study Theory
                  </Button>
                </Link>
              </div>
              <Link href={`/subjects/${subjectId}`} className="block mt-2">
                <Button variant="ghost" className="w-full cursor-pointer text-zinc-400 text-xs font-medium hover:text-zinc-600 h-8">
                  ← પ્રકરણો પર પાછા જાઓ
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Answer Review Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-2xl space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-800 dark:text-zinc-100 text-center">
              પ્રશ્નો અને જવાબો
            </h3>
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold">
              Review
            </span>
          </div>

          {test.questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            const isExpanded = expandedReviews[idx] || false;
            
            return (
              <div key={idx} className="bg-white dark:bg-zinc-900/80 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <button 
                  onClick={() => toggleReview(idx)}
                  className="w-full flex items-start gap-3 sm:gap-4 p-4 sm:p-5 text-left focus:outline-none cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold text-white shadow-sm mt-0.5 ${userAnswer === null || userAnswer === undefined ? 'bg-zinc-400' : isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 pr-2">
                    <h4 className="text-[14px] sm:text-[16px] font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                      {q.question}
                    </h4>
                  </div>
                  <ChevronDown className={`shrink-0 w-5 h-5 text-zinc-400 transition-transform duration-300 mt-0.5 ${isExpanded ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-14 sm:pl-[68px] space-y-2.5">
                        <div className="flex items-start gap-2 text-[13px] sm:text-[14.5px]">
                          <span className="font-semibold text-zinc-500 dark:text-zinc-400 shrink-0 w-[90px] sm:w-[100px]">તમારો જવાબ:</span>
                          <span className={`font-bold ${userAnswer === null || userAnswer === undefined ? 'text-zinc-500 dark:text-zinc-400' : isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {userAnswer !== null && userAnswer !== undefined ? q.options[userAnswer] : "Skipped (છોડી દીધો)"}
                          </span>
                        </div>
                        
                        {!isCorrect && (
                          <div className="flex items-start gap-2 text-[13px] sm:text-[14.5px]">
                            <span className="font-semibold text-zinc-500 dark:text-zinc-400 shrink-0 w-[90px] sm:w-[100px]">સાચો જવાબ:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              {q.options[q.correctAnswer]}
                            </span>
                          </div>
                        )}

                        {q.explanation && (
                          <div className="mt-3 bg-blue-50/80 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300 p-3 sm:p-4 rounded-xl text-xs sm:text-[13px] leading-relaxed border border-blue-100 dark:border-blue-900/30">
                            <span className="font-bold mr-1">સમજૂતી:</span> {q.explanation}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative flex-1 px-4 py-6 lg:p-10 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] sm:blur-[130px]" style={{ backgroundColor: `${subject.color}26` }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] sm:blur-[130px]" style={{ backgroundColor: `${subject.color2}26` }} />
        <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] rounded-full bg-white/50 blur-[80px] sm:blur-[110px] dark:bg-white/5" />
        <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] rounded-full bg-white/40 blur-[80px] sm:blur-[110px] dark:bg-white/5" />
      </div>

      <div className="mx-auto max-w-3xl w-full">
        {/* Header Row (Back Button + Title) */}
        <div className="relative mb-4 flex min-h-[44px] items-center justify-center">
          <div className="absolute left-0">
            <Link href={`/subjects/${subjectId}`}>
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

          {/* Centered Title */}
          <div className="flex flex-col items-center gap-1.5">
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-1.5" style={{ color: subject.color }}>
              <span>{subject.name}</span>
              <span>{subject.icon}</span>
            </h1>
            <div className="flex items-center gap-1.5 px-2.5 py-[3px] bg-slate-100/80 dark:bg-zinc-800/60 rounded-full">
              <span className="text-[10px] font-black text-slate-600 dark:text-zinc-400 tracking-wide uppercase">TEST</span>
              <span className="px-2 py-[1px] rounded-full text-[10px] font-bold bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm">Ch-{topicId.replace("chapter-", "")}</span>
            </div>
          </div>
        </div>

        {/* ALL-IN-ONE Card - matching reference image exactly */}
        <div key={currentQ} className="relative pt-3.5">

            {/* === SINGLE CARD: Question + Options + Progress + Buttons === */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 overflow-hidden" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(148,163,184,0.06)' }}>

              {/* Question Section with Blue Border and Stronger Blue Light Glow */}
              <div className="px-4 sm:px-5 pt-3.5 pb-1.5">
                <div className="relative rounded-xl border-2 border-[#4f7df9] shadow-[0_0_22px_2px_rgba(79,125,249,0.35)] px-4 sm:px-5 pt-4 pb-3 bg-white dark:bg-zinc-900">
                  {/* Question Number Badge (overlapping blue border top-left) */}
                  <div className="absolute -top-3.5 left-4 z-10 px-4 py-1 rounded-full text-xs font-bold text-white bg-blue-600">
                    QUESTION {currentQ + 1}
                  </div>

                  <h2 className="text-lg md:text-xl font-bold text-zinc-800 dark:text-zinc-100 leading-relaxed">
                    {question.question}
                  </h2>
                </div>
              </div>

              {/* Options Section */}
              <div className="px-4 sm:px-5 py-1.5 space-y-1.5">
                {question.options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === question.correctAnswer;
                  const optionLabel = String.fromCharCode(65 + idx);

                  let containerStyle = "border-[1.5px] border-zinc-300/70 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 bg-[#f8f9fa] dark:bg-zinc-800/50 shadow-[0_3px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]";
                  const labelStyle = "text-zinc-500 dark:text-zinc-400 font-bold";
                  const textStyle = "text-zinc-800 dark:text-zinc-200 font-medium";
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  let animationProps: any = {};

                  if (isAnswered) {
                    if (isCorrect) {
                      containerStyle = "border-[1.5px] border-green-500 bg-green-50 dark:bg-green-950/20 shadow-[0_3px_10px_rgba(34,197,94,0.12)]";
                      if (isSelected) {
                        animationProps = { scale: [1, 1.05, 1], transition: { duration: 0.3 } };
                      } else {
                        // The correct answer pulses even if you didn't select it, so it's obvious
                        animationProps = { scale: [1, 1.02, 1], transition: { duration: 0.3 } };
                      }
                    } else if (isSelected && !isCorrect) {
                      containerStyle = "border-[1.5px] border-red-500 bg-red-50 dark:bg-red-950/20 shadow-[0_3px_10px_rgba(239,68,68,0.12)]";
                      animationProps = { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } };
                    } else {
                      containerStyle = "border-[1.5px] border-zinc-200/50 bg-[#f8f9fa] dark:bg-zinc-900 opacity-60 shadow-none";
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={isAnswered}
                      animate={animationProps}
                      className={`w-full flex items-center gap-3 py-2 sm:py-2.5 px-4 rounded-xl border text-left transition-all duration-200 cursor-pointer disabled:cursor-default ${containerStyle}`}
                    >
                      <span className={`text-base md:text-lg shrink-0 ${labelStyle}`}>
                        {optionLabel}.
                      </span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500 shrink-0" />}
                      <span className={`text-base md:text-lg ${textStyle}`}>
                        {option}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation (Accordion Style) */}
              {isAnswered && (
                <div className="px-4 sm:px-5 mt-3">
                  <div className="flex justify-start">
                    <button
                      onClick={() => setIsExplanationOpen(!isExplanationOpen)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors rounded-md border border-slate-200 dark:border-zinc-750 text-amber-600 dark:text-amber-500 font-bold text-xs cursor-pointer"
                    >
                      <span className="text-xs">📖</span>
                      <span>સમજૂતી</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${isExplanationOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {isExplanationOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-1 px-1">
                          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-[12px] sm:text-[13px] font-medium">
                            {question.explanation}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Subtle divider before footer */}
              <div className="mx-5 sm:mx-6 h-px bg-zinc-100 dark:bg-zinc-800" />

              {/* Progress + Navigation (inside card) */}
              <div className="px-4 sm:px-5 pb-3 space-y-2 pt-2">
                {/* Question count text */}
                <div className="text-center text-xs sm:text-sm font-semibold text-blue-400 dark:text-blue-500">
                  Question {currentQ + 1} of {test.questions.length}
                </div>

                {/* Green progress bar */}
                <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>

                {/* 3-Button Navigation Row */}
                <div className="flex items-center gap-2.5 pt-1">
                  {/* Prev */}
                  <button
                    disabled={currentQ === 0}
                    onClick={handlePrev}
                    className="flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-500 dark:text-zinc-300 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="text-zinc-400">←</span>
                    <span>Prev</span>
                  </button>

                  {/* Skip */}
                  <button
                    onClick={handleSkip}
                    disabled={isAnswered}
                    className="flex-[1.2] flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-bold text-zinc-600 dark:text-zinc-300 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="text-zinc-400">⏭</span>
                    <span>Skip</span>
                  </button>

                  {/* Next */}
                  <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className="flex-[1.2] flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-blue-600"
                  >
                    <span>{currentQ < test.questions.length - 1 ? "Next" : "Finish"}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

            </div>
            {/* === END SINGLE CARD === */}

          </div>
      </div>
    </main>
  );
}
