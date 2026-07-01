import type { Metadata } from "next";
import Script from "next/script";
import { Geist_Mono } from "next/font/google";
import { Noto_Sans_Gujarati } from "next/font/google";
import { Topbar } from "@/components/layout/Topbar";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";
import "./globals.css";

const notoGujarati = Noto_Sans_Gujarati({
  variable: "--font-sans",
  subsets: ["gujarati", "latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TAT GK - ગુજરાત TAT પરીક્ષા તૈયારી",
  description:
    "ગુજરાત TAT (Teacher Aptitude Test) પરીક્ષાની તૈયારી માટે GK Theory અને Test. ઇતિહાસ, ભૂગોળ અને વધુ.",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="gu"
      className={`${notoGujarati.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('tat-gk-theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                  var fsSizes = {xsmall:'14px',small:'15px',medium:'16px',large:'18px',xlarge:'22px'};
                  var fs = localStorage.getItem('tat-gk-font-size');
                  if (fs && fsSizes[fs]) {
                    document.documentElement.setAttribute('data-font-size', fs);
                    document.documentElement.style.setProperty('--content-font-size', fsSizes[fs]);
                  } else {
                    document.documentElement.setAttribute('data-font-size', 'medium');
                    document.documentElement.style.setProperty('--content-font-size', '16px');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gradient-main transition-colors duration-300">
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `}
        </Script>
        <Topbar />
        {/* content-wrap: font-size CSS var apply - topbar ની બહાર */}
        <div
          style={{ fontSize: "var(--content-font-size, 16px)" }}
          className="content-wrap flex-1 flex flex-col"
        >
          {children}
        </div>
        <FirebaseAnalytics />
        <Script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "4f68ecb50d71456599c355addc2ee114"}' />
      </body>
    </html>
  );
}
