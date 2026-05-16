"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const SOCIALS = [
  { 
    name: "GitHub", 
    href: "https://github.com", 
    icon: Github,
  },
  { 
    name: "LinkedIn", 
    href: "https://linkedin.com", 
    icon: Linkedin,
  },
  { 
    name: "Twitter", 
    href: "https://twitter.com", 
    icon: Twitter,
  },
  { 
    name: "Instagram", 
    href: "https://instagram.com", 
    icon: Instagram,
  },
];

const SocialSidebar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 2, ease: "circOut" }}
      className="fixed left-8 bottom-0 z-[100] hidden xl:flex flex-col items-center gap-10"
    >
      <div className="flex flex-col gap-8">
        {SOCIALS.map((social, i) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 + (i * 0.1) }}
            className="text-white/20 transition-all duration-500 hover:text-accent hover:scale-110 active:scale-95 group relative"
            aria-label={social.name}
          >
            <social.icon size={18} strokeWidth={2.5} />
            
            {/* Tooltip */}
            <span className="absolute left-10 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap">
              {social.name}
            </span>
          </motion.a>
        ))}
      </div>
      
      {/* Decorative Line */}
      <div className="w-px h-32 bg-gradient-to-t from-accent/60 via-white/10 to-transparent relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent animate-pulse" />
      </div>
    </motion.div>
  );
};

export default SocialSidebar;
