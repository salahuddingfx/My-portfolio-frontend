"use client";

import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const SocialSidebar = () => {
  const { settings } = useSettings();

  const socials = [
    { name: "GitHub", href: settings?.socials.github || "https://github.com/salahuddingfx", icon: GithubIcon },
    { name: "LinkedIn", href: settings?.socials.linkedin || "https://linkedin.com/in/salahuddingfx", icon: LinkedinIcon },
    { name: "Twitter", href: settings?.socials.twitter || "https://x.com/salahuddingfx", icon: TwitterIcon },
    { name: "Instagram", href: settings?.socials.instagram || "https://instagram.com/salahuddingfx", icon: InstagramIcon },
    { name: "Facebook", href: settings?.socials.facebook || "https://facebook.com/salahuddingfx", icon: FacebookIcon },
  ].filter(s => s.href && s.href !== "#" && s.href !== "");

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
      className="fixed left-6 bottom-0 z-[var(--z-sidebar)] hidden xl:flex flex-col items-center gap-6"
    >
      <div className="flex flex-col gap-5">
        {socials.map((social, i) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 + i * 0.08 }}
            className="text-[var(--muted-soft)] hover:text-[var(--foreground)] transition-colors duration-200 group relative"
            aria-label={social.name}
          >
            <social.icon className="w-[18px] h-[18px]" />

            {/* Tooltip */}
            <span 
              className="absolute left-9 top-1/2 -translate-y-1/2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] opacity-0 group-hover:opacity-100 -translate-x-1.5 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-2xl"
              style={{ padding: "8px 16px" }}
            >
              {social.name}
            </span>
          </motion.a>
        ))}
      </div>

      <div className="w-px h-20 bg-[var(--border)]" />
    </motion.div>
  );
};

export default SocialSidebar;
