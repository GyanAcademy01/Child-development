"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useFontSize,
  FONT_SIZE_ORDER,
  FONT_SIZE_CONFIG,
} from "@/hooks/useFontSize";

export function FontSizeControl() {
  const { fontSize, mounted, changeFontSize } = useFontSize();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Topbar Button ── */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.08 }}
        className="flex h-[22px] w-[22px] sm:h-[25px] sm:w-[25px] items-center justify-center rounded-full
          bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-zinc-700/80 cursor-pointer
          hover:border-primary/50 transition-colors duration-200"
        aria-label="Text size settings"
        title="Text Size"
      >
        {/* Two-size "Aa" icon */}
        <span className="flex items-end gap-[1px] leading-none select-none">
          <span className="text-[7px] sm:text-[8px] font-black text-foreground/70">A</span>
          <span className="text-[10px] sm:text-[11px] font-black text-foreground/90 -mb-[1px]">A</span>
        </span>
      </motion.button>

      {/* ── Dropdown Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 z-50"
            style={{ width: "220px" }}
          >
            {/* Card with pink border – matches image */}
            <div
              className="rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden"
              style={{
                border: "2px solid #f9a8d4",
                boxShadow:
                  "0 8px 32px -4px rgba(249,168,212,0.25), 0 2px 8px -2px rgba(0,0,0,0.08)",
              }}
            >
              {/* ── Header ── */}
              <div className="flex items-center gap-2.5 px-4 pt-4 pb-3 border-b border-pink-100 dark:border-zinc-800">
                {/* abc icon badge */}
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-white text-xs font-black"
                  style={{
                    background: "linear-gradient(135deg, #818cf8, #a78bfa)",
                    boxShadow: "0 2px 6px rgba(129,140,248,0.4)",
                  }}
                >
                  abc
                </div>
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
                  Text Size
                </span>
              </div>

              {/* ── Options ── */}
              <div className="px-2 py-2 space-y-0.5">
                {FONT_SIZE_ORDER.map((level) => {
                  const cfg = FONT_SIZE_CONFIG[level];
                  const isActive = fontSize === level;

                  // progressive font size for the label
                  const labelSize =
                    level === "xsmall"
                      ? "text-sm"
                      : level === "small"
                      ? "text-base"
                      : level === "medium"
                      ? "text-[17px]"
                      : level === "large"
                      ? "text-xl"
                      : "text-2xl";

                  return (
                    <motion.button
                      key={level}
                      onClick={() => {
                        changeFontSize(level);
                        setIsOpen(false);
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-between
                        px-3 py-2.5 rounded-xl cursor-pointer
                        transition-all duration-150 text-left
                        ${
                          isActive
                            ? "bg-violet-100 dark:bg-violet-950/40"
                            : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                        }`}
                    >
                      {/* Label - grows in size to show effect */}
                      <span
                        className={`font-semibold leading-none
                          ${labelSize}
                          ${
                            isActive
                              ? "text-violet-700 dark:text-violet-300 font-bold"
                              : "text-zinc-700 dark:text-zinc-300"
                          }`}
                      >
                        {cfg.label}
                      </span>

                      {/* px badge */}
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ml-2 shrink-0
                          ${
                            isActive
                              ? "bg-violet-200 text-violet-700 dark:bg-violet-800 dark:text-violet-200"
                              : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                          }`}
                      >
                        {cfg.pxNum}px
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* bottom padding */}
              <div className="h-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
