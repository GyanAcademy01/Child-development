import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="relative flex-1 flex flex-col min-h-[100dvh] overflow-hidden bg-background px-4 py-4 sm:py-6">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[40%] rounded-full bg-cyan-500/20 dark:bg-cyan-500/10 blur-[80px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen hero-blob-animate" />
                <div className="absolute top-[20%] -right-[10%] w-[45%] h-[45%] rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-[80px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen hero-blob-animate" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[50%] rounded-full bg-pink-500/15 dark:bg-pink-500/5 blur-[80px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen hero-blob-animate" style={{ animationDelay: '4s' }} />
            </div>

            <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 sm:gap-6 relative z-10">
                {/* Header Section */}
                <div className="flex items-center justify-between w-full relative">
                    <Link href="/" className="btn-back flex items-center justify-center w-10 h-10 rounded-full bg-card shadow-sm border border-border text-foreground hover:bg-muted transition-colors">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                    </Link>
                    <div className="flex-1 flex justify-center">
                        <h1 className="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400 m-0 flex items-center gap-2">
                            <span>ℹ️</span> App Info
                        </h1>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 mt-2">
                    
                    {/* Top/Left Section: Logo and Purpose */}
                    <div className="md:col-span-5 flex flex-col gap-5 sm:gap-6">
                        {/* Logo Card */}
                        <div className="glass-card rounded-2xl border-t-4 border-t-cyan-500 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 hero-shimmer pointer-events-none opacity-50" />
                            <div className="relative mb-2 flex items-center justify-center gap-5">
                                {/* App Logo */}
                                <div className="relative w-[85px] h-[85px] flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 shadow-md border border-border/40 p-1.5">
                                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-400/30 blur-xl animate-pulse" />
                                    <Image
                                        src="/logo-cropped.png"
                                        alt="Child Development App Logo"
                                        width={75}
                                        height={75}
                                        className="relative object-contain"
                                        priority
                                    />
                                </div>
                                
                                {/* Divider */}
                                <span className="text-muted-foreground/30 text-lg font-light select-none">|</span>

                                {/* Gyan Academy Logo */}
                                <div className="relative w-[85px] h-[85px] flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 shadow-md border border-border/40 p-1.5">
                                    <Image
                                        src="/gyan-logo.png"
                                        alt="Gyan Academy Logo"
                                        width={75}
                                        height={75}
                                        className="relative object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold mt-4 text-foreground mb-1">Child Development</h2>
                        </div>

                        {/* Purpose Card */}
                        <div className="glass-card rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-card/80 to-muted/80">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-3">
                                <span>🎯</span> હેતુ (Purpose)
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                આ એપ ખાસ કરીને <b className="text-foreground">બાળ વિકાસ અને શિક્ષણના સિદ્ધાંતો</b> ની તૈયારી કરતા વિદ્યાર્થીઓ માટે બનાવવામાં આવી છે. 
                                આ વિષયને સરળતાથી સમજવા અને તેની પ્રેક્ટિસ કરવા માટે આ એક ઉત્તમ પ્લેટફોર્મ છે.
                            </p>
                        </div>
                    </div>

                    {/* Right Section: Features & Dev Info */}
                    <div className="md:col-span-7 flex flex-col gap-5 sm:gap-6">
                        
                        {/* Features Grid */}
                        <div className="glass-card rounded-2xl border-t-4 border-t-blue-500 p-4 sm:p-5">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-3">
                                <span>📋</span> એપની વિશેષતાઓ (Key Features)
                            </h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-card/60 p-3 rounded-xl border border-border/50 hover:bg-card/90 transition-all hover:shadow-md group">
                                    <h4 className="flex items-center gap-2 text-[14px] font-bold text-cyan-600 dark:text-cyan-400 mb-1 group-hover:scale-105 origin-left transition-transform">
                                        <span>📖</span> Theory
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">બાળ વિકાસના દરેક પ્રકરણની ઊંડાણપૂર્વક સમજૂતી અને મુદ્દાસર માહિતી.</p>
                                </div>
                                <div className="bg-card/60 p-3 rounded-xl border border-border/50 hover:bg-card/90 transition-all hover:shadow-md group">
                                    <h4 className="flex items-center gap-2 text-[14px] font-bold text-green-600 dark:text-green-400 mb-1 group-hover:scale-105 origin-left transition-transform">
                                        <span>📝</span> MCQ Tests
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">અગત્યના પ્રશ્નો અને પ્રકરણ મુજબ ઓનલાઇન ટેસ્ટ પ્રેક્ટિસ માટે.</p>
                                </div>
                                <div className="bg-card/60 p-3 rounded-xl border border-border/50 hover:bg-card/90 transition-all hover:shadow-md group">
                                    <h4 className="flex items-center gap-2 text-[14px] font-bold text-pink-600 dark:text-pink-400 mb-1 group-hover:scale-105 origin-left transition-transform">
                                        <span>📄</span> PDF Materials
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">વાંચવા અને રિવિઝન કરવા માટે હાઈ-ક્વોલિટી PDF મટિરિયલ્સ.</p>
                                </div>
                                <div className="bg-card/60 p-3 rounded-xl border border-border/50 hover:bg-card/90 transition-all hover:shadow-md group">
                                    <h4 className="flex items-center gap-2 text-[14px] font-bold text-amber-600 dark:text-amber-500 mb-1 group-hover:scale-105 origin-left transition-transform">
                                        <span>📊</span> Progress
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">તમારા આપેલા ટેસ્ટના સ્કોર અને પ્રગતિની સંપૂર્ણ માહિતી.</p>
                                </div>
                            </div>
                        </div>

                        {/* Developer Info Card */}
                        <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 bg-cyan-500/5">
                            <h3 className="flex items-center gap-2 text-[15px] font-bold text-foreground mb-2">
                                <span>👨‍💻</span> Developer Info
                            </h3>
                            <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                                આ એપ <b className="text-foreground">Gyan Academy</b> ટીમ દ્વારા તૈયાર કરવામાં આવી છે, જેનો મુખ્ય લક્ષ્ય વિદ્યાર્થીઓને શ્રેષ્ઠ શિક્ષણ પૂરું પાડવાનો છે.
                            </p>
                            <div className="flex justify-center mt-2 pt-3 border-t border-cyan-500/10">
                                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground italic font-sans tracking-wide opacity-70 scale-[0.75] origin-center">
                                    <span className="not-italic text-[11px]">⚡</span> Web Dev · <span className="font-semibold text-foreground/80">N.K.Parmar</span>
                                </span>
                            </div>
                        </div>
                        
                    </div>
                </div>

                {/* Bottom Message */}
                <div className="text-center mt-4 mb-2">
                    <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-foreground/70 font-medium bg-muted/50 px-4 py-2 rounded-full border border-border/50">
                        <span>✨</span> જો તમને આ એપ પસંદ આવી હોય તો તમારા મિત્રો સાથે જરૂર શેર કરજો!
                    </p>
                </div>
                
                <div className="h-4"></div> {/* Bottom Spacer */}
            </div>
        </div>
    );
}
