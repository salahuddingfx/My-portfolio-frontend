"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Github, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const socials = [
    { name: "GitHub", href: settings?.socials.github, icon: Github },
    { name: "LinkedIn", href: settings?.socials.linkedin, icon: Linkedin },
    { name: "Twitter", href: settings?.socials.twitter, icon: Twitter },
    { name: "Instagram", href: settings?.socials.instagram, icon: Instagram },
    { name: "Facebook", href: settings?.socials.facebook, icon: Facebook },
  ].filter(s => s.href && s.href !== "#" && s.href !== "");

  return (
    <footer className="relative pt-24 overflow-hidden bg-[#080808]">
      {/* Divider */}
      <div className="border-t border-white/[0.05]" />

      <div className="container relative z-10 max-w-7xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 border-b border-white/[0.06] pt-20 pb-14 lg:gap-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-8 lg:pr-10">
            {/* Logo */}
            <Link href="/" aria-label="Home" className="group flex w-fit items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]">
                <span className="text-base font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  S
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[16px] font-semibold text-white transition-colors duration-200 group-hover:text-white/80" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Salah Uddin Kader
                </span>
                <span className="mt-1 text-[11px] text-[var(--muted-soft)]">
                  Creative Developer
                </span>
              </div>
            </Link>

            <p className="max-w-[440px] text-sm leading-relaxed text-[var(--muted)]">
              {settings?.bio || "Building fast, accessible, and thoughtfully crafted digital experiences with a focus on performance, simplicity, and modern interaction."}
            </p>

            <div className="flex flex-col gap-3">
              <a href={`mailto:${settings?.email || "salahuddinkaderappy@gmail.com"}`} className="group/footer inline-flex items-center gap-3 text-[13px] text-[var(--muted)] transition-colors duration-200 hover:text-white">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.04]">
                  <Mail size={12} className="text-[var(--accent)]" />
                </div>
                {settings?.email || "salahuddinkaderappy@gmail.com"}
              </a>
              <div className="inline-flex items-center gap-3 text-[13px] text-[var(--muted)]">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.04]">
                  <MapPin size={12} className="text-[var(--accent)]" />
                </div>
                {settings?.location || "Cox's Bazar, Bangladesh"}
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-[var(--muted)]">Open to new projects</span>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:col-span-3">
            {/* Pages */}
            <div>
              <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                Pages
              </h4>
              <ul className="flex flex-col gap-3 items-start">
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
              <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                Social
              </h4>
              <ul className="flex flex-col gap-3 items-start">
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
              <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                Hire Me
              </h4>
              <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                <p className="text-[13px] leading-relaxed text-[var(--muted)]">
                  Available for freelance projects, collaborations, and creative web work.
                </p>
                <Link href="/contact" className="group/cta inline-flex items-center gap-1.5 text-[13px] font-medium text-white transition-colors duration-200 hover:text-[var(--accent)]">
                  Start a project
                  <ArrowUpRight size={13} className="transition-transform duration-200 group-hover/cta:translate-x-[1px] group-hover/cta:-translate-y-[1px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-5 py-7 text-center sm:flex-row sm:text-left">
          <p className="text-center text-[12px] text-[var(--muted-soft)]">
            © {year} Salah Uddin Kader — All rights reserved.
          </p>

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