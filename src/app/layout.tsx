import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ScrollEffects } from "@/components/providers/ScrollEffects";
import CustomCursor from "@/components/ui/cursor/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import SocialSidebar from "@/components/ui/SocialSidebar";
import Footer from "@/components/ui/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://salahuddin.codes"),
  title: "Salah Uddin Kader | Full Stack Web Developer",
  description: "Official portfolio of Salah Uddin Kader. Specializing in high-performance websites and modern web design using Next.js and React.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["Web Developer", "React Developer", "Next.js", "Portfolio", "Salah Uddin Kader", "Bangladesh", "Full Stack Developer"],
  authors: [{ name: "Salah Uddin Kader" }],
  openGraph: {
    title: "Salah Uddin Kader | Web Developer",
    description: "Building fast, reliable, and beautiful websites for brands worldwide.",
    url: "https://salahuddin.codes",
    siteName: "Salah Portfolio",
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
    title: "Salah Uddin Kader | Web Developer",
    description: "Building fast, reliable, and beautiful websites for brands worldwide.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <LenisProvider>
          <ScrollEffects />
          <CustomCursor />
          <Navbar />
          <SocialSidebar />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
