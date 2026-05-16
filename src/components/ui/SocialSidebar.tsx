"use client";

import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";
import { Github, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

const SocialSidebar = () => {
  const { settings } = useSettings();

  const socials = [
    { name: "GitHub", href: settings?.socials.github, icon: Github },
    { name: "LinkedIn", href: settings?.socials.linkedin, icon: Linkedin },
    { name: "Twitter", href: settings?.socials.twitter, icon: Twitter },
    { name: "Instagram", href: settings?.socials.instagram, icon: Instagram },
    { name: "Facebook", href: settings?.socials.facebook, icon: Facebook },
  ].filter(s => s.href && s.href !== "#" && s.href !== "");

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
      className="fixed left-6 bottom-0 z-[100] hidden xl:flex flex-col items-center gap-6"
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
            className="text-[var(--muted-soft)] hover:text-white transition-colors duration-200 group relative"
            aria-label={social.name}
          >
            <social.icon className="w-[18px] h-[18px]" />

            {/* Tooltip */}
            <span className="
              absolute left-8 top-1/2 -translate-y-1/2
              px-3 py-1.5 rounded-lg
              bg-[var(--surface-2)] border border-[var(--border)]
              text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]
              opacity-0 group-hover:opacity-100
              translate-x-[-6px] group-hover:translate-x-0
              transition-all duration-200
              pointer-events-none whitespace-nowrap
              shadow-2xl
            ">
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
