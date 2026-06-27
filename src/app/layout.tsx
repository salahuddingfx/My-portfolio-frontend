import type { Metadata } from "next";
import Script from "next/script";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  Jersey_25,
} from "next/font/google";

import "./globals.css";

import { LenisProvider } from "@/components/providers/LenisProvider";
import { ScrollEffects } from "@/components/providers/ScrollEffects";
import { SettingsProvider } from "@/context/SettingsContext";
import VisitorTracker from "@/components/utils/VisitorTracker";

import CustomCursor from "@/components/ui/cursor/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import SocialSidebar from "@/components/ui/SocialSidebar";
import EmailSidebar from "@/components/ui/EmailSidebar";
import Footer from "@/components/ui/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import IntroLoader from "@/components/ui/IntroLoader";
import dynamic from "next/dynamic";

const ScrollToTop = dynamic(
  () => import("@/components/ui/ScrollToTop").then((mod) => mod.ScrollToTop),
  { ssr: false }
);

/* =============================================================================
   FONTS
   ============================================================================= */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

const jersey25 = Jersey_25({
  subsets: ["latin"],
  variable: "--font-jersey-25",
  weight: "400",
  display: "swap",
});


/* =============================================================================
   METADATA
   ============================================================================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://salahuddin.codes"),

  title: {
    default: "Salah Uddin Kader (Saka Chowdhury) — Full Stack AI Engineer & Creative Developer",
    template: "%s | Salah Uddin Kader (Saka Chowdhury)",
  },

  description:
    "Portfolio of Salah Uddin Kader (Saka Chowdhury / @salahuddingfx) — Full Stack AI Engineer, Creative Developer, and Database Designer in Cox's Bazar, Bangladesh. Specialist in Next.js, React, Node.js, GSAP, Three.js, LLMs, and secure database designs.",

  keywords: [
    "Full Stack AI Engineer",
    "AI Developer",
    "Database Designer",
    "Database Design Bangladesh",
    "SQL Injection Prevention",
    "LLM Developer",
    "AI Engineer Bangladesh",
    "Saka Chowdhury",
    "Saka Chowdhury Developer",
    "salahuddingfx",
    "Salah Uddin Kader",
    "Salahuddin Kader",
    "Salah Uddin",
    "salahuddin.codes",
    "Frontend Developer Bangladesh",
    "Creative Developer Bangladesh",
    "Next.js Developer",
    "GSAP Developer",
    "Three.js Portfolio",
    "Interactive Web Developer",
    "Modern Web Designer",
    "Full Stack Developer Bangladesh",
    "Creative Frontend Engineer",
    "Full Stack Developer",
    "Full Stack Engineer",
    "Creative Developer",
    "Frontend Engineer",
    "Interactive Web Designer",
    "Digital Experience Builder",
    "Modern UI Designer",
    "Web Interface Engineer",
    "Motion & Interaction Designer",
    "Next.js Developer",
    "React Developer",
    "Frontend Developer",
    "MERN Stack Developer",
    "MERN Developer",
    "MERN Developer Cox's Bazar",
    "MERN Developer Bangladesh",
    "MERN Developer Chittagong",
    "MERN Developer Nationwide",
    "MERN Developer International",
    "Node.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Three.js Developer",
    "Web App Developer",
    "UI/UX Developer",
    "Backend Developer",
    "Backend Engineer",
    "Python Developer",
    "Django Developer",
    "PHP Developer",
    "Laravel Developer",
    "MySQL Developer",
    "Cox's Bazar",
    "Cox's Bazar web developer",
    "Cox's Bazar MERN developer",
    "Cox's Bazar backend developer",
    "Chittagong",
    "Chittagong web developer",
    "Chittagong MERN developer",
    "Chittagong backend developer",
    "Bangladesh",
    "Bangladeshi web developer",
    "Bangladesh MERN developer",
    "Bangladesh backend developer",
    "Remote web developer",
    "Worldwide web developer",
    "Global web developer",
    "International clients",
    "Global clients",
    "Portfolio",
    "Web Development",
  ],

  authors: [{ name: "Salah Uddin Kader" }],

  openGraph: {
    title: "Salah Uddin Kader (Saka Chowdhury) — Creative Developer & Frontend Engineer",
    description:
      "Creative portfolio of Salah Uddin Kader (Saka Chowdhury). Premium interactive web experiences built with Next.js, React, TypeScript, GSAP, and Three.js. Based in Cox's Bazar, Bangladesh.",
    url: "https://salahuddin.codes",
    siteName: "Salah Uddin Kader (Saka Chowdhury)",
    images: [{ url: "/CV-Images.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Salah Uddin Kader (Saka Chowdhury) — Creative Developer & Frontend Engineer",
    description:
      "Creative portfolio of Salah Uddin Kader (Saka Chowdhury). Premium interactive web experiences built with Next.js, React, TypeScript, GSAP, and Three.js.",
    images: ["/CV-Images.png"],
  },

  verification: {
    google: "WJxBg6PfsLLZco7402kiWpUazOhNS1XIvAxQE8PMVxU",
  },
};

/* =============================================================================
   ROOT LAYOUT
   ============================================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${jersey25.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {/* Preconnect to external CDNs used by the Spline 3D runtime.
          These hints fire as soon as the HTML is parsed — TCP+TLS handshake
          completes in the background so Spline loads faster when it defers. */}
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <script
          id="theme-loader"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <meta
          name="description"
          content="Portfolio of Salah Uddin Kader (salahuddingfx) — Full Stack Developer in Cox's Bazar, Bangladesh. Builds modern web apps, interactive experiences, and scalable products with Next.js, React, TypeScript, Node.js, Python, Django, PHP, Laravel, and MySQL for local and global clients."
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-background text-foreground antialiased overflow-x-hidden"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDHBRFJS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KDHBRFJS');
          `}
        </Script>

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SV5CCYTWG5"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SV5CCYTWG5');
          `}
        </Script>

        <IntroLoader />
        <LenisProvider>
          <SettingsProvider>
            <VisitorTracker />
            <div className="noise-overlay" />

          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://salahuddin.codes/#person",
                name: "Salah Uddin Kader",
                alternateName: ["Saka Chowdhury", "salahuddingfx", "Salahuddin Kader", "Salah Uddin"],
                description:
                  "Salah Uddin Kader (known as Saka Chowdhury / @salahuddingfx) is a Creative Developer, Frontend Engineer, and Full Stack Developer based in Cox's Bazar, Bangladesh. Specialist in Next.js, React, TypeScript, GSAP, and Three.js.",
                url: "https://salahuddin.codes",
                image: "https://salahuddin.codes/CV-Images.png",
                jobTitle: ["Creative Developer", "Frontend Engineer", "Full Stack Developer"],
                knowsAbout: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "JavaScript",
                  "GSAP",
                  "Three.js",
                  "Creative Development",
                  "Motion Design",
                  "Frontend Architecture",
                  "Node.js",
                  "MongoDB",
                  "Express",
                  "Python",
                  "Django",
                  "PHP",
                  "Laravel",
                  "MySQL",
                  "Web Development",
                  "UI/UX",
                ],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Cox's Bazar",
                  addressRegion: "Chittagong",
                  addressCountry: "Bangladesh",
                },
                sameAs: [
                  "https://github.com/salahuddingfx",
                  "https://linkedin.com/in/salahuddingfx",
                  "https://twitter.com/salahuddingfx",
                  "https://x.com/salahuddingfx",
                ],
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://salahuddin.codes/#website",
                name: "Salah Uddin Kader (Saka Chowdhury)",
                alternateName: ["salahuddingfx", "Saka Chowdhury"],
                url: "https://salahuddin.codes",
                description:
                  "Portfolio of Salah Uddin Kader (Saka Chowdhury) — Creative Developer and Frontend Engineer from Cox's Bazar, Bangladesh.",
                publisher: { "@id": "https://salahuddin.codes/#person" },
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://salahuddin.codes/#home",
                url: "https://salahuddin.codes",
                name: "Salah Uddin Kader (Saka Chowdhury) — Creative Developer & Frontend Engineer",
                description:
                  "Portfolio site for Salah Uddin Kader (Saka Chowdhury / @salahuddingfx), a Creative Developer and Frontend Engineer based in Cox's Bazar, Bangladesh.",
                inLanguage: "en",
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: "https://salahuddin.codes/CV-Images.png",
                },
                about: { "@id": "https://salahuddin.codes/#person" },
                isPartOf: { "@id": "https://salahuddin.codes/#website" },
              }),
            }}
          />

          {/* GLOBAL EFFECTS */}
          <ScrollProgress />
          <ScrollEffects />
          <ScrollToTop />

          {/* CURSOR */}
          <CustomCursor />

          {/* NAVBAR */}
          <Navbar />

          {/* SIDEBARS */}
          <div className="global-sidebar">
            <SocialSidebar />
          </div>
          <div className="global-sidebar">
            <EmailSidebar />
          </div>

          {/* PAGE CONTENT */}
          <main className="relative min-h-screen">
            {children}
            {/* FOOTER */}
            <Footer />
          </main>

          </SettingsProvider>
        </LenisProvider>
      </body>
    </html>
  );
}