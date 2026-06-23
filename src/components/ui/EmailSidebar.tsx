"use client";

import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

const EmailSidebar = () => {
  const { settings } = useSettings();
  const email = settings?.email || "salauddinkaderappy@gmail.com";

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
      className="fixed right-6 bottom-0 z-[var(--z-sidebar)] hidden xl:flex flex-col items-center gap-6"
    >
      <a
        href={`mailto:${email}`}
        className="text-[11px] text-[var(--muted-soft)] hover:text-[var(--foreground)] transition-colors duration-200 tracking-widest font-bold uppercase"
        style={{ writingMode: "vertical-rl", fontFamily: "var(--font-jetbrains-mono)" }}
        aria-label="Send email"
      >
        {email}
      </a>

      <div className="w-1 h-20 bg-[#000000]" />
    </motion.div>
  );
};

export default EmailSidebar;
