"use client";
import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { FontSizeControl } from "@/components/common/FontSizeControl";
import { usePWA } from "@/hooks/usePWA";

export function Topbar() {
  const { installPrompt, isInstalled, triggerInstallPrompt } = usePWA();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-border/40 shadow-sm dark:shadow-none">
      <div className="flex h-8 sm:h-9 items-center justify-between px-3 sm:px-4">

        {/* ── Left: Logo + Name ── */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <Image
            src="/logo-transparent.png"
            alt="Child Development Logo"
            width={20}
            height={20}
            className="rounded-sm"
          />
          <span className="text-xs sm:text-sm font-extrabold gradient-text tracking-tight">
            TAT GK
          </span>
        </Link>

        {/* ── Right: Install + FontSize + Theme ── */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Font Size Control */}
          <FontSizeControl />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Install App Button */}
          {installPrompt && !isInstalled && (
            <button
              onClick={triggerInstallPrompt}
              className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-sm rounded-full h-6 sm:h-7 px-2 sm:px-2.5 transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Install App"
              title="Install App"
            >
              <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline text-[10px] sm:text-[11px] font-bold">Install</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
