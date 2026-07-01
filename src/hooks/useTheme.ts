"use client";

import { useState, useEffect, useCallback } from "react";
import { siteConfig } from "@/config/site";

/**
 * Theme management hook
 * localStorage માંથી theme read/write કરે છે
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(siteConfig.themeStorageKey);
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(siteConfig.themeStorageKey, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(siteConfig.themeStorageKey, "light");
    }
  }, [isDark]);

  return { isDark, mounted, toggleTheme };
}
