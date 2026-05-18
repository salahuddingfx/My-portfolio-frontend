import type { Metadata } from "next";
import Script from "next/script";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
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

/* =============================================================================
   METADATA
   ============================================================================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://salahuddin.codes"),

  title: {
    default: "Salah Uddin Kader — Full Stack Developer",
    template: "%s | Salah Uddin Kader",
  },

  description:
    "Portfolio of Salah Uddin Kader — Full Stack Developer focused on modern interfaces, interactive experiences, and thoughtful digital products.",

  keywords: [
    "salahuddingfx",
    "Salah Uddin Kader",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Frontend Developer",
    "MERN Stack Developer",
    "Cox's Bazar",
    "Cox's Bazar web developer",
    "Chittagong",
    "Chittagong web developer",
    "Bangladesh",
    "Bangladeshi web developer",
    "Web Developer",
    "TypeScript Developer",
    "Three.js Developer",
    "Portfolio",
    "Web Development",
  ],

  authors: [{ name: "Salah Uddin Kader" }],



  openGraph: {
    title: "Salah Uddin Kader — Full Stack Developer",
    description:
      "Modern portfolio built with Next.js, React, and thoughtful interaction design.",
    url: "https://salahuddin.codes",
    siteName: "Salah Uddin Kader",
    images: [{ url: "/mine-photo.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Salah Uddin Kader — Full Stack Developer",
    description: "Modern portfolio built with Next.js and React.",
    images: ["/mine-photo.png"],
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
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {/* Preconnect to external CDNs used by the Spline 3D runtime.
          These hints fire as soon as the HTML is parsed — TCP+TLS handshake
          completes in the background so Spline loads faster when it defers. */}
      <head>
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="preconnect" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
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
        <Script id="google-tag-manager" strategy="afterInteractive">
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
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
                name: "Salah Uddin Kader",
                alternateName: "salahuddingfx",
                url: "https://salahuddin.codes",
                image: "https://salahuddin.codes/mine-photo.png",
                jobTitle: "Full Stack Developer",
                knowsAbout: [
                  "React", "Next.js", "TypeScript", "Node.js",
                  "MongoDB", "Express", "Three.js", "Web Development",
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
                name: "Salah Uddin Kader",
                alternateName: "salahuddingfx",
                url: "https://salahuddin.codes",
                description:
                  "Portfolio of Salah Uddin Kader — Full Stack Developer from Cox's Bazar, Bangladesh.",
              }),
            }}
          />

          {/* GLOBAL EFFECTS */}
          <ScrollProgress />
          <ScrollEffects />

          {/* CURSOR */}
          <CustomCursor />

          {/* NAVBAR */}
          <Navbar />

          {/* SIDEBARS */}
          <SocialSidebar />
          <EmailSidebar />

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