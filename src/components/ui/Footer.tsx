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
    icon: "in",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: "gh",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "ig",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 pt-32 pb-14 overflow-hidden">

      {/* Background Word */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none">
        <span
          className="
            text-[14vw]
            font-black
            tracking-[-0.08em]
            text-white/[0.03]
            leading-none
            translate-y-1/4
            whitespace-nowrap
          "
        >
          SALAHUDDIN
        </span>
      </div>

      <div className="container relative z-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 pb-20 border-b border-white/5">

          {/* Left */}
          <div className="lg:col-span-5">

            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-lg">
                S
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Salah Uddin Kader
                </h3>

                <p className="text-sm text-white/40 mt-1">
                  Saka Chowdhury
                </p>
              </div>
            </Link>

            <p className="max-w-md text-white/50 leading-8 text-[15px]">
              Software Engineer focused on modern interfaces,
              interactive experiences, and thoughtful digital products.
            </p>

            {/* Status */}
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3">

              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70"></span>

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent"></span>
              </span>

              <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                Available for selected projects
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-14">

            {/* Navigation */}
            <div>
              <h4 className="mb-6 text-[11px] uppercase tracking-[0.14em] text-white/30">
                Navigation
              </h4>

              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        text-white/50
                        hover:text-white
                        transition-colors
                      "
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight
                        size={14}
                        className="
                          opacity-0
                          translate-y-1
                          group-hover:opacity-100
                          group-hover:translate-y-0
                          transition-all
                          text-accent
                        "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-6 text-[11px] uppercase tracking-[0.14em] text-white/30">
                Contact
              </h4>

              <div className="space-y-5">

                <div>
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-white/25 mb-2">
                    Email
                  </span>

                  <a
                    href="mailto:salahuddinkadrappy@gmail.com"
                    className="text-white/60 hover:text-white transition-colors break-all"
                  >
                    salahuddinkadrappy@gmail.com
                  </a>
                </div>

                <div>
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-white/25 mb-2">
                    Location
                  </span>

                  <p className="text-white/60">
                    Bangladesh
                  </p>
                </div>

              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="mb-6 text-[11px] uppercase tracking-[0.14em] text-white/30">
                Social
              </h4>

              <div className="flex flex-wrap gap-3 mb-8">

                {SOCIALS.map((social) => (
                  <Magnetic key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="
                        w-11
                        h-11
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.02]
                        flex
                        items-center
                        justify-center
                        text-white/50
                        hover:text-white
                        hover:border-white/20
                        transition-all
                      "
                    >
                      <span className="text-xs uppercase font-bold tracking-wide">
                        {social.icon}
                      </span>
                    </a>
                  </Magnetic>
                ))}

              </div>

              <Link
                href="/contact"
                className="btn-primary w-full"
              >
                Start a Project
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">

          <p className="text-[11px] uppercase tracking-[0.14em] text-white/30 text-center md:text-left">
            © {currentYear} Salah Uddin Kader
          </p>

          <div className="flex items-center gap-6">

            <Link
              href="/privacy"
              className="text-[11px] uppercase tracking-[0.14em] text-white/30 hover:text-white transition-colors"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-[11px] uppercase tracking-[0.14em] text-white/30 hover:text-white transition-colors"
            >
              Terms
            </Link>

          </div>

          <p className="text-[11px] uppercase tracking-[0.14em] text-white/20 text-center md:text-right">
            Designed and developed by Salah Uddin Kader
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;