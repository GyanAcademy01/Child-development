"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect, useCallback } from "react";

export type FontSizeLevel = "xsmall" | "small" | "medium" | "large" | "xlarge";

const STORAGE_KEY = "child-dev-font-size";

export const FONT_SIZE_CONFIG: Record<
  FontSizeLevel,
  { label: string; px: string; pxNum: number }
> = {
  xsmall: { label: "Extra Small", px: "14px", pxNum: 14 },
  small:  { label: "Small",       px: "15px", pxNum: 15 },
  medium: { label: "Default",     px: "16px", pxNum: 16 },
  large:  { label: "Large",       px: "18px", pxNum: 18 },
  xlarge: { label: "X-Large",     px: "22px", pxNum: 22 },
};

export const FONT_SIZE_ORDER: FontSizeLevel[] = [
  "xsmall", "small", "medium", "large", "xlarge",
];

function applyFontSize(level: FontSizeLevel) {
  document.documentElement.setAttribute("data-font-size", level);
  document.documentElement.style.setProperty(
    "--content-font-size",
    FONT_SIZE_CONFIG[level].px
  );
}

export function useFontSize() {
  const [fontSize, setFontSize] = useState<FontSizeLevel>("medium");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as FontSizeLevel | null;
    const defaultLevel = window.innerWidth < 768 ? "small" : "medium";
    const level =
      saved && FONT_SIZE_ORDER.includes(saved) ? saved : defaultLevel;
    setFontSize(level);
    applyFontSize(level);
  }, []);

  const changeFontSize = useCallback((level: FontSizeLevel) => {
    setFontSize(level);
    applyFontSize(level);
    localStorage.setItem(STORAGE_KEY, level);
  }, []);

  return { fontSize, mounted, changeFontSize };
}
