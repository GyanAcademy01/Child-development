import Link from 'next/link';
import Image from 'next/image';

export default function ContactUsPage() {
    const mapLink = "https://maps.app.goo.gl/8E9j5JSvLspXTRKk7";
    const youtubeLink = "https://www.youtube.com/@gyanacademyonline";
    const appLink = "https://play.google.com/store/apps/details?id=com.gyanacademy.com";
    const telegramLink = "https://t.me/gyanacademygandhinagar";
    const instagramLink = "https://instagram.com/gyanacademy_official";
    const websiteLink = "https://gyanacademys.com";

    return (
        <div className="relative flex-1 flex flex-col min-h-[100dvh] overflow-hidden bg-background px-4 py-4 sm:py-6">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[40%] rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-[80px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen hero-blob-animate" />
                <div className="absolute top-[30%] -left-[10%] w-[45%] h-[45%] rounded-full bg-blue-500/15 dark:bg-blue-500/5 blur-[80px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen hero-blob-animate" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-[10%] right-[10%] w-[60%] h-[50%] rounded-full bg-pink-500/15 dark:bg-pink-500/5 blur-[80px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen hero-blob-animate" style={{ animationDelay: '4s' }} />
            </div>

            <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 sm:gap-6 relative z-10">

                {/* Header Section */}
                <div className="flex items-center justify-between w-full relative">
                    <Link href="/" className="btn-back flex items-center justify-center w-10 h-10 rounded-full bg-card shadow-sm border border-border text-foreground hover:bg-muted transition-colors">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                    </Link>
                    <div className="flex-1 flex justify-center">
                        <Image src="/gyan-logo.png" alt="Gyan Academy" width={150} height={60} style={{ objectFit: 'contain' }} priority className="drop-shadow-sm" />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-2">

                    {/* Left: Contact Information Card */}
                    <div className="glass-card rounded-2xl border-t-4 border-t-cyan-500 p-5 sm:p-6 flex flex-col gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                        
                        {/* Address Section */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-600 dark:text-cyan-400 shadow-sm">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
                                <h2 className="text-lg font-bold m-0 text-foreground">ઓફિસનું સરનામું</h2>
                            </div>

                            <div className="bg-card/60 p-4 rounded-xl border border-border/50 shadow-sm">
                                <h3 className="font-bold text-[15px] text-foreground m-0 mb-1.5 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                    Gyan Academy
                                </h3>
                                <p className="text-muted-foreground text-[13px] leading-relaxed m-0 pl-3.5 border-l-2 border-border/50">
                                    Navkar Plaza, near Apna Bazar,<br />
                                    Sector 6, ગાંધીનગર - 382006,<br />
                                    ગુજરાત.
                                </p>
                                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg border border-border text-xs font-bold text-foreground bg-background shadow-sm hover:bg-muted hover:shadow-md transition-all">
                                    📍 Google Map પર જુઓ
                                </a>
                            </div>
                        </div>

                        {/* Contact Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Phone Support */}
                            <div className="bg-blue-500/5 hover:bg-blue-500/10 transition-colors p-4 rounded-xl border border-blue-500/20 flex flex-col justify-center group/phone shadow-sm">
                                <h3 className="flex items-center gap-2 font-bold text-[14px] text-blue-600 dark:text-blue-400 m-0 mb-2">
                                    <span className="bg-blue-500/20 p-1 rounded-md group-hover/phone:scale-110 transition-transform">📞</span>
                                    હેલ્પલાઇન નંબર
                                </h3>
                                <a href="tel:+918758377555" className="block font-black text-blue-600/90 dark:text-blue-400/90 text-[16px] decoration-transparent tracking-wide">
                                    +91 87583 77555
                                </a>
                                <p className="text-[12px] text-blue-600/70 dark:text-blue-400/70 font-medium m-0 mt-1.5 flex items-center gap-1">
                                    <span>🕒</span> સવારે 9 થી સાંજે 6
                                </p>
                            </div>

                            {/* Email Support */}
                            <div className="bg-pink-500/5 hover:bg-pink-500/10 transition-colors p-4 rounded-xl border border-pink-500/20 flex flex-col justify-center group/email shadow-sm">
                                <h3 className="flex items-center gap-2 font-bold text-[14px] text-pink-600 dark:text-pink-400 m-0 mb-2">
                                    <span className="bg-pink-500/20 p-1 rounded-md group-hover/email:scale-110 transition-transform">✉️</span>
                                    ઈમેલ સપોર્ટ
                                </h3>
                                <a href="mailto:web.dev.gyanacademy@gmail.com" className="block font-bold text-pink-600/90 dark:text-pink-400/90 text-[13px] break-all decoration-transparent tracking-tight">
                                    web.dev.gyanacademy@gmail.com
                                </a>
                                <p className="text-[12px] text-pink-600/70 dark:text-pink-400/70 font-medium m-0 mt-1.5 flex items-center gap-1">
                                    <span>🕒</span> 24-48 કલાકમાં જવાબ
                                </p>
                            </div>
                        </div>

                        {/* Developer Credit */}
                        <div className="flex justify-center pt-4 border-t border-border mt-[-4px]">
                            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground italic font-sans tracking-wide opacity-70 scale-[0.75] origin-center">
                                <span className="not-italic text-[11px]">⚡</span> Web Dev · <span className="font-semibold text-foreground/80">N.K.Parmar</span>
                            </span>
                        </div>

                    </div>

                    {/* Right: Social & Feedback Card */}
                    <div className="glass-card rounded-2xl border-t-4 border-t-pink-500 p-5 sm:p-6 flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/5 rounded-br-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                        
                        <div className="mb-5">
                            <div className="flex items-center gap-3 mb-1.5">
                                <div className="bg-pink-500/10 p-2 rounded-lg text-pink-600 dark:text-pink-400 shadow-sm">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                </div>
                                <h2 className="text-lg font-bold m-0 text-foreground">સોશિયલ મીડિયા</h2>
                            </div>
                            <p className="text-xs text-muted-foreground m-0 font-medium">અમારી સાથે જોડાયેલા રહો અને અપડેટ્સ મેળવો</p>
                        </div>

                        <div className="flex-1 flex flex-col justify-between gap-5">

                            {/* Compact Grid for Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-xl border border-red-500/20 text-red-600 dark:text-red-400 bg-red-500/5 hover:bg-red-500 hover:text-white transition-all text-sm font-bold shadow-sm hover:shadow-md group/social">
                                    <span className="text-lg group-hover/social:scale-110 transition-transform">▶️</span> YouTube
                                </a>
                                <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-xl border border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5 hover:bg-blue-500 hover:text-white transition-all text-sm font-bold shadow-sm hover:shadow-md group/social">
                                    <span className="text-lg group-hover/social:scale-110 transition-transform">✈️</span> Telegram
                                </a>
                                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-xl border border-pink-500/20 text-pink-600 dark:text-pink-400 bg-pink-500/5 hover:bg-pink-500 hover:text-white transition-all text-sm font-bold shadow-sm hover:shadow-md group/social">
                                    <span className="text-lg group-hover/social:scale-110 transition-transform">📸</span> Instagram
                                </a>
                                <a href={websiteLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-xl border border-foreground/10 text-foreground bg-foreground/5 hover:bg-foreground hover:text-background transition-all text-sm font-bold shadow-sm hover:shadow-md group/social">
                                    <span className="text-lg group-hover/social:scale-110 transition-transform">🌐</span> Website
                                </a>
                                <div className="col-span-2 mt-2">
                                    <a href={appLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                                        <span className="text-xl">📱</span> Gyan Academy App ડાઉનલોડ કરો
                                    </a>
                                </div>
                            </div>

                            {/* Ultra Compact Feedback Section */}
                            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/10 dark:to-blue-500/10 p-4 rounded-xl border border-cyan-500/20 dark:border-blue-500/20 flex items-start gap-3 mt-auto shadow-sm">
                                <span className="text-2xl mt-0.5 animate-pulse">💡</span>
                                <div>
                                    <h4 className="font-bold text-[14px] text-cyan-700 dark:text-cyan-400 m-0 mb-1">અભિપ્રાય આપો</h4>
                                    <p className="text-xs text-cyan-600/90 dark:text-cyan-400/90 m-0 leading-relaxed font-medium">
                                        એપ્લિકેશન સુધારવા માટે કોઈ વિચાર છે? અમને ઈમેલ દ્વારા ચોક્કસ જણાવો.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
                <div className="h-4"></div> {/* Bottom Spacer */}
            </div>
        </div>
    );
}
