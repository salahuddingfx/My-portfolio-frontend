"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
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
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <rect width="20" height="20" x="2" y="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t-2 border-white/10 pt-32 pb-12 overflow-hidden bg-background">

      {/* Massive Background Typography */}
      <div className="absolute inset-x-0 top-10 flex justify-center pointer-events-none select-none opacity-20">
        <span className="text-[20vw] font-black tracking-tighter text-transparent outline-text leading-none whitespace-nowrap uppercase">
          SYSTEM.END
        </span>
      </div>

      <div className="container relative z-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24 border-b-2 border-white/10">

          {/* Left: Branding */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-12">
              <Link href="/" className="group flex flex-col">
                <span className="text-4xl font-black tracking-tighter text-white uppercase leading-none">
                  SAKA.
                </span>
                <span className="kicker mt-2">
                  [ DIGITAL EXPERIENCE ]
                </span>
              </Link>

              <p className="max-w-md text-white/50 leading-relaxed text-xl font-bold tracking-tight">
                Architecting high-performance digital spaces. Form follows function.
              </p>
            </div>

            {/* Availability Status */}
            <div className="mt-16 inline-flex items-center gap-4 border-2 border-accent bg-transparent px-6 py-4">
              <span className="w-3 h-3 bg-accent animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white">
                SYSTEM ONLINE: READY
              </span>
            </div>
          </div>

          {/* Right: Quick Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Sitemap */}
            <div className="space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/30 border-b-2 border-white/10 pb-4">Index</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="group flex items-center justify-between text-xl font-black text-white/40 hover:text-white transition-all duration-300 uppercase tracking-tighter">
                      <span>{link.label}</span>
                      <ArrowUpRight size={20} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get In Touch */}
            <div className="space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/30 border-b-2 border-white/10 pb-4">Comm</h4>
              <div className="space-y-8">
                <div>
                  <span className="kicker block mb-2">[ DIRECT ]</span>
                  <a href="mailto:connect@salahuddin.dev" className="text-xl font-black text-white hover:text-accent transition-colors break-all uppercase tracking-tighter">
                    CONNECT@ SALAHUDDIN.DEV
                  </a>
                </div>
                <div>
                  <span className="kicker block mb-2">[ LOC ]</span>
                  <p className="text-xl font-black text-white uppercase tracking-tighter">GLOBAL / BD</p>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/30 border-b-2 border-white/10 pb-4">Nodes</h4>
              <div className="flex flex-col gap-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-xl font-black text-white/40 hover:text-accent transition-colors uppercase tracking-tighter group"
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {social.name}
                  </a>
                ))}
              </div>
              <div className="pt-8">
                <Link href="/contact" className="btn-raw w-full">
                  INITIALIZE
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">
            © {currentYear} SALAH UDDIN.
          </p>

          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 hover:text-white transition-colors">[ PRIVACY ]</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 hover:text-white transition-colors">[ TERMS ]</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
;