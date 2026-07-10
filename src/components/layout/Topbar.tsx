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
    <header className="sticky top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-border/40 shadow-sm transition-all">
      <div className="flex h-10 md:h-8 items-center justify-between px-3 sm:px-4 max-w-7xl mx-auto">

        {/* ── Left: Logo + Name ── */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-cropped.png"
            alt="Child Development Logo"
            width={24}
            height={24}
            className="rounded-sm"
          />
        </Link>

        {/* ── Right: Install + FontSize + Theme ── */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Font Size Control */}
          <FontSizeControl />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Install App Button */}
          {installPrompt && !isInstalled && (
            <button
              onClick={triggerInstallPrompt}
              className="flex items-center gap-1 sm:gap-1.5 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 shadow-sm rounded-full h-[22px] sm:h-[25px] px-2 sm:px-2.5 transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Install App"
              title="Install App"
            >
              <Download className="h-3 w-3 sm:h-[13px] sm:w-[13px]" />
              <span className="hidden sm:inline text-[10.5px] sm:text-[11.5px] font-medium leading-none mt-[1px]">Install</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
