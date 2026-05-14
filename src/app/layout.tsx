import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Outfit,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

import { LenisProvider } from "@/components/providers/LenisProvider";
import { ScrollEffects } from "@/components/providers/ScrollEffects";

import CustomCursor from "@/components/ui/cursor/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import SocialSidebar from "@/components/ui/SocialSidebar";
import Footer from "@/components/ui/Footer";

/* =============================================================================
   FONTS
   ============================================================================= */

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* =============================================================================
   METADATA
   ============================================================================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://salahuddin.codes"),

  title: "Saka Chowdhury",

  description:
    "Portfolio of Salah Uddin Kader — focused on modern interfaces, interactive experiences, and thoughtful digital products.",

  keywords: [
    "Salah Uddin Kader",
    "Saka Chowdhury",
    "Next.js Developer",
    "React Developer",
    "Frontend Developer",
    "Portfolio",
  ],

  authors: [
    {
      name: "Salah Uddin Kader",
    },
  ],

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "Saka Chowdhury",

    description:
      "Modern portfolio built with Next.js, React, and thoughtful interaction design.",

    url: "https://salahuddin.codes",

    siteName: "Saka Chowdhury",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Saka Chowdhury",

    description:
      "Modern portfolio built with Next.js and React.",

    images: ["/og-image.jpg"],
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
      className="dark"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`
          ${plusJakartaSans.variable}
          ${outfit.variable}
          ${jetbrainsMono.variable}

          bg-background
          text-foreground
          antialiased
          overflow-x-hidden
          selection:bg-[#dc2626]
          selection:text-white
        `}
      >

        <LenisProvider>

          {/* GLOBAL EFFECTS */}
          <ScrollEffects />

          {/* CURSOR */}
          <CustomCursor />

          {/* NAVBAR */}
          <Navbar />

          {/* LEFT SOCIAL SIDEBAR */}
          <SocialSidebar />

          {/* PAGE CONTENT */}
          <main className="relative min-h-screen">
            {children}
          </main>

          {/* FOOTER */}
          <Footer />

        </LenisProvider>

      </body>
    </html>
  );
}