'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

/* ── Animation Variants ── */
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

const spring = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

/* ══════════════════════════════════════════════
   HOME PAGE — TAT-GK Sizing & Logic Integration
   ══════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <main className="relative flex-1 flex flex-col items-center justify-between min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-2rem)] overflow-y-auto overflow-x-hidden px-3 sm:px-4 py-4 custom-scrollbar">
      
      {/* ── Background Decoration ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="home-bg-grid" />
        <div className="home-bg-orb home-orb-coral" />
        <div className="home-bg-orb home-orb-white-tr" />
        <div className="home-bg-orb home-orb-white-bl" />
        <div className="home-bg-orb home-orb-violet" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[370px] flex flex-col gap-3.5 py-4 sm:py-6 mt-10 mb-auto sm:my-auto">

        {/* Logo (Only Image, No Box) */}
        <motion.div
          className="home-logo-container flex justify-center"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={spring}
        >
          <Image
            src="/gyan-logo.png"
            alt="Gyan Academy Logo"
            width={160}
            height={60}
            className="home-logo-img"
            priority
          />
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          className="mt-2.5 sm:mt-1 mb-2 sm:mb-4 text-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ ...spring, delay: 0.1 }}
        >
          <p className="text-[11px] sm:text-xs font-medium text-foreground/70 dark:text-foreground/60 italic leading-relaxed">
            &ldquo;દરેક બાળક એક ફૂલ જેવું છે, તેને ખીલવા માટે પ્રેમ અને યોગ્ય વાતાવરણની જરૂર છે.&rdquo;
          </p>
          <div className="mt-1 mx-auto w-10 h-[1.5px] rounded-full bg-gradient-to-r from-violet-500/60 to-pink-500/60" />
        </motion.div>

        {/* Cards Grid / Subject Card */}
        <motion.div
          className="w-full"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Card Sunrise Glow Wrapper */}
          <motion.div className="relative h-full" variants={fadeInUp} transition={spring}>
            {/* Black Outer Shadow */}
            <div className="absolute -inset-1 sm:-inset-1.5 rounded-2xl sm:rounded-3xl bg-black/10 dark:bg-black/40 blur-md pointer-events-none" />

            {/* Hero Card */}
            <div className="hero-card rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 text-center relative overflow-hidden h-full flex flex-col">
              
              {/* App Name Badge */}
              <div className="flex justify-center mb-1 sm:mb-2 mt-0.5 sm:mt-1">
                <h1 className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-100/80 dark:border-indigo-500/20 shadow-sm backdrop-blur-sm">
                  <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
                    TAT / TET
                  </span>
                </h1>
              </div>

              {/* Category Taglines */}
              <p className="text-[10px] sm:text-xs bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400 text-transparent bg-clip-text font-bold mb-0.5 drop-shadow-sm">
                બાળ વિકાસ અને શિક્ષણના સિદ્ધાંતો
              </p>
              <p className="text-[8px] sm:text-[10px] bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400 text-transparent bg-clip-text font-bold mb-1 sm:mb-3 tracking-wide drop-shadow-sm">
                વિષયવસ્તુ • મનોવિજ્ઞાન
              </p>

              {/* Stats Row */}
              <div className="flex items-stretch justify-center gap-0 mb-1 sm:mb-3 bg-white/40 dark:bg-white/5 rounded-xl p-0.5 sm:p-1.5 backdrop-blur-sm border border-white/30 dark:border-white/10">
                <div className="flex-1 flex flex-col items-center justify-center py-0.5">
                  <span className="text-sm sm:text-lg font-black text-violet-600 dark:text-violet-400 leading-none">1</span>
                  <span className="text-[7px] sm:text-[9px] text-muted-foreground font-bold mt-0.5 tracking-wider uppercase">વિષય</span>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                <div className="flex-1 flex flex-col items-center justify-center py-0.5">
                  <span className="text-sm sm:text-lg font-black text-pink-600 dark:text-pink-400 leading-none">10</span>
                  <span className="text-[7px] sm:text-[9px] text-muted-foreground font-bold mt-0.5 tracking-wider uppercase">પ્રકરણો</span>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                <div className="flex-1 flex flex-col items-center justify-center py-0.5">
                  <span className="text-sm sm:text-lg font-black text-emerald-600 dark:text-emerald-400 leading-none">300+</span>
                  <span className="text-[7px] sm:text-[9px] text-muted-foreground font-bold mt-0.5 tracking-wider uppercase">પ્રશ્નો</span>
                </div>
              </div>

              {/* Feature pills - compact */}
              <p className="text-[8px] sm:text-[10px] text-muted-foreground/80 font-medium mb-1 sm:mb-3">
                Theory  •  Test  •  PDF
              </p>

              <div className="mt-auto">
                {/* Gradient Divider */}
                <div className="w-2/3 mx-auto h-px rounded-full bg-gradient-to-r from-transparent via-violet-500/25 to-transparent mb-1.5 sm:mb-3" />

                {/* CTA Button */}
                <div className="flex justify-center">
                  <Link href="/subjects/child-development" prefetch={true} className="w-full sm:w-auto">
                    <Button
                      className="cursor-pointer w-full px-6 py-1.5 sm:px-10 sm:py-2.5 text-[11px] sm:text-xs font-bold rounded-xl
                        bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#f97316]
                        text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-auto"
                    >
                      🚀 શરૂ કરો
                    </Button>
                  </Link>
                </div>

                {/* Bottom tagline */}
                <div className="mt-1.5 sm:mt-3 flex items-center justify-center gap-1 sm:gap-1.5 text-[7px] sm:text-[9px] text-muted-foreground/70 font-medium tracking-wide">
                  <span className="w-2.5 sm:w-3.5 h-px bg-muted-foreground/20 rounded-full" />
                  વિકાસનો ખ્યાલ • સિદ્ધાંતો • સમાવેશી શિક્ષણ
                  <span className="w-2.5 sm:w-3.5 h-px bg-muted-foreground/20 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer & Brand */}
      <motion.div
        className="relative mt-2 pt-2 pb-1 w-full text-center flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-4 text-xs sm:text-sm font-bold text-foreground/60 dark:text-foreground/50">
          <Link href="/about" className="hover:text-violet-500 transition-colors">About Us</Link>
          <span className="text-muted-foreground/30 font-normal">|</span>
          <Link href="/contact-us" className="hover:text-violet-500 transition-colors">Contact Us</Link>
        </div>
      </motion.div>
    </main>
  );
}
