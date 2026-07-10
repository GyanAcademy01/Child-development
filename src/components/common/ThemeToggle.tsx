"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { isDark, mounted, toggleTheme } = useTheme();

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="flex h-[22px] w-[22px] sm:h-[25px] sm:w-[25px] items-center justify-center rounded-full
        bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-zinc-700/80 cursor-pointer
        hover:border-primary/50 transition-colors duration-300"
      aria-label={isDark ? "Light mode" : "Dark mode"}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        className="text-[11px] sm:text-[13px]"
      >
        {isDark ? "☀️" : "🌙"}
      </motion.span>
    </motion.button>
  );
}
