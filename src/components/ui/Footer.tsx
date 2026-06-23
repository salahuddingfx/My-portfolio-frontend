"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const socials = [
    { name: "GitHub", href: settings?.socials.github || "https://github.com/salahuddingfx", icon: GithubIcon },
    { name: "LinkedIn", href: settings?.socials.linkedin || "https://linkedin.com/in/salahuddingfx", icon: LinkedinIcon },
    { name: "Twitter", href: settings?.socials.twitter || "https://x.com/salahuddingfx", icon: TwitterIcon },
    { name: "Instagram", href: settings?.socials.instagram || "https://instagram.com/salahuddingfx", icon: InstagramIcon },
    { name: "Facebook", href: settings?.socials.facebook || "https://facebook.com/salahuddingfx", icon: FacebookIcon },
  ].filter(s => s.href && s.href !== "#" && s.href !== "");

  return (
    <footer className="relative overflow-hidden isolate bg-[var(--background)]">
      {/* Divider */}
      <div className="border-t-[4px] border-[#000000]" />

      <div className="container relative z-10 max-w-7xl">
        {/* Top Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-[3px] border-[#000000] gap-8 py-12"
        >

          {/* Brand Column */}
          <div className="flex flex-col lg:pr-10 gap-8">
            {/* Logo */}
            <Link href="/" aria-label="Home" className="group flex w-fit items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#000000] border-[3px] border-[#000000] shadow-[3px_3px_0px_#000000] transition-all duration-200 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[5px_5px_0px_#000000]">
                <span className="text-base font-extrabold text-[#FFFFFF]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  S
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[16px] font-extrabold text-[var(--foreground)] uppercase tracking-wide transition-colors duration-200 group-hover:text-[var(--foreground)]/80" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Salah Uddin Kader
                </span>
                <span className="mt-1 text-[11px] text-[var(--muted-soft)] uppercase tracking-widest font-bold">
                  Creative Developer
                </span>
              </div>
            </Link>

            <p className="max-w-[440px] text-sm leading-relaxed text-[var(--muted)]">
              {settings?.bio || "Building fast, accessible, and thoughtfully crafted digital experiences with a focus on performance, simplicity, and modern interaction."}
            </p>

            <div className="flex flex-col gap-3">
              <a href={`mailto:${settings?.email || "salahuddinkaderappy@gmail.com"}`} className="group/footer inline-flex items-center gap-3 text-[13px] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center border-[2px] border-[#000000] bg-[var(--surface-2)] shadow-[2px_2px_0px_#000000]">
                  <Mail size={12} className="text-[var(--neo-yellow)]" strokeWidth={2.5} />
                </div>
                {settings?.email || "salahuddinkaderappy@gmail.com"}
              </a>
              <div className="inline-flex items-center gap-3 text-[13px] text-[var(--muted)]">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center border-[2px] border-[#000000] bg-[var(--surface-2)] shadow-[2px_2px_0px_#000000]">
                  <MapPin size={12} className="text-[var(--neo-yellow)]" strokeWidth={2.5} />
                </div>
                {settings?.location || "Cox's Bazar, Bangladesh"}
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 border-[2px] border-[#000000] bg-[var(--neo-green)] px-3 py-1.5 shadow-[3px_3px_0px_#000000]" style={{ padding: "10px" }}>
              <span className="h-2 w-2 bg-[#000000] animate-pulse" style={{ borderRadius: "var(--radius-sm)" }} />
              <span className="text-[11px] text-[#000000] pr-4 pl-2 md:pl-4 font-bold uppercase tracking-widest">Open to new projects</span>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-12">
            {/* Pages */}
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)] mb-5">
                Pages
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 items-start">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link text-[13px]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)] mb-5">
                Social
              </p>
              <ul className="flex flex-col items-start gap-3">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="footer-link text-[13px] flex items-center gap-2">
                      <social.icon className="h-3.5 w-3.5 shrink-0" />
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div className="flex flex-col">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)] mb-5">
                Hire Me
              </p>
              <div
                className="flex flex-col border-[3px] border-[#000000] bg-[var(--surface)] shadow-[4px_4px_0px_#000000] p-6 gap-4"
                style={{ borderRadius: "var(--radius-lg)" }}
              >
                <p className="text-[13px] leading-relaxed text-[var(--muted)]">
                  Available for freelance projects, collaborations, and creative web work.
                </p>
                <Link href="/contact" className="group/cta inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--foreground)] uppercase tracking-wider transition-colors duration-200 hover:text-[var(--neo-yellow)]" style={{ gap: '0.375rem' }}>
                  Start a project
                  <ArrowUpRight size={13} strokeWidth={2.5} className="transition-transform duration-200 group-hover/cta:translate-x-[1px] group-hover/cta:-translate-y-[1px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col items-center justify-between text-center sm:flex-row sm:text-left gap-6 py-6 pb-12"
        >
          <p className="text-center text-[12px] text-[var(--muted-soft)] font-bold uppercase tracking-wider">
            © {year} Salah Uddin Kader (@salahuddingfx) — All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-[var(--muted-soft)]">
            <Link href="/privacy-policy" className="footer-link text-[12px]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link text-[12px]">
              Terms
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="footer-social">
                <social.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
