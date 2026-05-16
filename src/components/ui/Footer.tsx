"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 pt-32 pb-14 overflow-hidden bg-black">

      {/* Background Hero Text */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none">
        <span className="text-[18vw] font-black tracking-[-0.08em] text-white/[0.02] leading-none translate-y-1/3 whitespace-nowrap uppercase">
          Salah Uddin
        </span>
      </div>

      <div className="container relative z-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-b border-white/5">

          {/* Left: Branding */}
          <div className="lg:col-span-5 space-y-10">
            <Link href="/" className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent font-black text-2xl group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-2xl">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white uppercase">Salah Uddin Kader</span>
                <span className="text-[10px] text-white/30 font-mono font-bold uppercase tracking-[0.3em] mt-1">Creative Engineer</span>
              </div>
            </Link>

            <p className="max-w-md text-white/40 leading-relaxed text-[17px] font-medium">
              Designing and engineering high-end digital solutions for the next 
              generation of web experiences. Focused on performance, aesthetics, 
              and user interaction.
            </p>

            {/* Availability Status */}
            <div className="inline-flex items-center gap-4 rounded-full border border-white/5 bg-white/[0.02] px-6 py-4 shadow-xl">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent shadow-[0_0_10px_rgba(225,29,72,0.5)]"></span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/50">
                Open for collaboration
              </span>
            </div>
          </div>

          {/* Right: Quick Links */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Sitemap */}
            <div>
              <h4 className="mb-8 text-[11px] uppercase tracking-[0.4em] font-black text-white/20">Sitemap</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="group flex items-center justify-between text-[15px] font-bold text-white/40 hover:text-white transition-all duration-300">
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="mb-8 text-[11px] uppercase tracking-[0.4em] font-black text-white/20">Contact</h4>
              <div className="space-y-6">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.3em] font-black text-white/20 mb-2">Direct</span>
                  <a href="mailto:salahuddinkadrappy@gmail.com" className="text-[15px] font-bold text-white/50 hover:text-accent transition-colors break-all leading-relaxed">
                    salahuddinkadrappy@gmail.com
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.3em] font-black text-white/20 mb-2">Location</span>
                  <p className="text-[15px] font-bold text-white/50 uppercase tracking-widest">Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div>
              <h4 className="mb-8 text-[11px] uppercase tracking-[0.4em] font-black text-white/20">Connect</h4>
              <div className="flex flex-wrap gap-4 mb-10">
                {SOCIALS.map((social) => (
                  <Magnetic key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all duration-500 shadow-xl"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
              <Link href="/contact" className="btn-primary w-full !text-[10px] !tracking-[0.3em]">
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10">
          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 order-2 md:order-1">
            © {currentYear} SALAH UDDIN KADER. All rights reserved.
          </p>

          <div className="flex items-center gap-10 order-1 md:order-2">
            <Link href="/privacy" className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 hover:text-white transition-colors">Terms</Link>
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/10 order-3 text-center md:text-right">
            Curated with passion and precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
;