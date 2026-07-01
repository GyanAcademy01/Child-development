import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="relative flex-1 flex flex-col items-center overflow-y-auto overflow-x-hidden px-3 sm:px-4 pt-4 pb-2 sm:py-4 custom-scrollbar">
      {/* Static Background — Soft Cyan/Blue for Child Development */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-cyan-500/20 blur-[100px] sm:blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-blue-500/20 blur-[100px] sm:blur-[130px]" />
        <div className="home-bg-grid opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-3xl flex-1 flex flex-col justify-center">

        {/* Logo */}
        <div className="home-logo-container flex justify-center">
          <Image
            src="/gyan-logo.png"
            alt="Gyan Academy Logo"
            width={180}
            height={72}
            style={{ objectFit: 'contain' }}
            className="home-logo-img drop-shadow-sm"
            priority
          />
        </div>

        {/* Motivational Quote */}
        <div className="mt-4 sm:mt-6 mb-4 sm:mb-6 text-center">
          <p className="text-[12px] sm:text-sm font-medium text-foreground/70 dark:text-foreground/60 italic">
            &ldquo;દરેક બાળક એક ફૂલ જેવું છે, તેને ખીલવા માટે પ્રેમ અને યોગ્ય વાતાવરણની જરૂર છે.&rdquo;
          </p>
          <div className="mt-2 mx-auto w-12 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
        </div>

        {/* Cards Grid - Single Centered Card */}
        <div className="flex justify-center w-full">
          <div className="relative w-full max-w-md h-full">
            {/* Black Outer Shadow */}
            <div className="absolute -inset-1.5 rounded-3xl bg-black/5 dark:bg-black/20 blur-md pointer-events-none" />

            {/* Hero Card */}
            <div className="hero-card rounded-3xl p-4 sm:p-6 text-center relative overflow-hidden h-full flex flex-col bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-700/50">
              
              {/* App Name Badge */}
              <div className="flex justify-center mb-2 sm:mb-3 mt-1">
                <h1 className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-br from-cyan-50/80 to-blue-50/80 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-100/80 dark:border-cyan-800/30 shadow-sm backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  <span className="text-[12px] sm:text-sm font-black uppercase tracking-widest bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 text-transparent bg-clip-text">
                    બાળ વિકાસ
                  </span>
                </h1>
              </div>
              
              <p className="text-[13px] sm:text-[15px] text-slate-700 dark:text-slate-200 font-bold mb-1 drop-shadow-sm">
                બાળ વિકાસ અને શિક્ષણના સિદ્ધાંતો
              </p>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium mb-3 sm:mb-5 tracking-wide drop-shadow-sm">
                શિક્ષક યોગ્યતા કસોટી (TAT / TET) માટે
              </p>

              {/* Stats Row */}
              <div className="flex items-stretch justify-center gap-0 mb-3 sm:mb-5 bg-white/60 dark:bg-white/5 rounded-xl p-1.5 sm:p-2 backdrop-blur-sm border border-cyan-100 dark:border-white/10">
                <div className="flex-1 flex flex-col items-center justify-center py-1">
                  <span className="text-base sm:text-xl font-black text-cyan-600 dark:text-cyan-400 leading-none">1</span>
                  <span className="text-[8px] sm:text-[10px] text-muted-foreground font-bold mt-1 tracking-wider uppercase">વિષય</span>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                <div className="flex-1 flex flex-col items-center justify-center py-1">
                  <span className="text-base sm:text-xl font-black text-blue-600 dark:text-blue-400 leading-none">1</span>
                  <span className="text-[8px] sm:text-[10px] text-muted-foreground font-bold mt-1 tracking-wider uppercase">પ્રકરણ</span>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                <div className="flex-1 flex flex-col items-center justify-center py-1">
                  <span className="text-base sm:text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none">6+</span>
                  <span className="text-[8px] sm:text-[10px] text-muted-foreground font-bold mt-1 tracking-wider uppercase">પ્રશ્નો</span>
                </div>
              </div>

              {/* Feature pills - compact */}
              <p className="text-[9px] sm:text-[11px] text-muted-foreground/90 font-semibold mb-3 sm:mb-5">
                Theory  •  Test (MCQ)  •  PDF Reading
              </p>

              <div className="mt-auto">
                {/* Gradient Divider */}
                <div className="w-3/4 mx-auto h-px rounded-full bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent mb-3" />

                {/* CTA Button */}
                <div className="flex justify-center">
                  <Link href="/subjects/child-development" prefetch={true} className="w-full">
                    <Button
                      className="cursor-pointer w-full px-8 py-2.5 sm:px-12 sm:py-3 text-[12px] sm:text-[14px] font-bold rounded-xl
                        bg-gradient-to-r from-cyan-500 to-blue-500
                        hover:from-cyan-400 hover:to-blue-400
                        text-white border-0 shadow-[0_4px_14px_0_rgb(6,182,212,0.39)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.23)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-auto"
                    >
                      🚀 શરૂ કરો
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer & Brand */}
      <div className="relative mt-auto pt-6 sm:pt-8 pb-4 w-full text-center flex flex-col items-center gap-2.5 z-20">
        <div className="flex items-center gap-4 text-xs sm:text-sm font-bold text-foreground/60 dark:text-foreground/50">
          <span>Gyan Academy</span>
          <span className="text-muted-foreground/30 font-normal">|</span>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          <span className="text-muted-foreground/30 font-normal">|</span>
          <Link href="/contact-us" className="hover:text-primary transition-colors">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}
