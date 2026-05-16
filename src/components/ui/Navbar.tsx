"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-0 left-0 w-full z-[100] transition-all duration-700
        ${scrolled ? "py-10 bg-black/90 backdrop-blur-3xl border-b border-white/5 shadow-2xl" : "py-24 lg:py-48 bg-transparent"}
      `}
    >
      <div className="container px-8 lg:px-16 flex items-center justify-between lg:grid lg:grid-cols-3">
        
        {/* LEFT: LOGO */}
        <div className="flex items-center">
          <Link href="/" className="group flex flex-col">
            <span className="text-[14px] lg:text-[16px] font-black tracking-tighter text-white uppercase leading-none">
              Saka.dev
            </span>
            <span className="text-[9px] text-accent font-mono font-bold uppercase tracking-[0.2em] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Creative Engineer
            </span>
          </Link>
        </div>

        {/* CENTER: EMAIL (Desktop Only) */}
        <div className="hidden lg:flex justify-center items-center">
          <a 
            href="mailto:connect@salahuddin.dev" 
            className="text-[11px] font-bold text-white/40 hover:text-white transition-colors tracking-[0.1em]"
          >
            connect@salahuddin.dev
          </a>
        </div>

        {/* RIGHT: LINKS & TOGGLE */}
        <div className="flex items-center justify-end gap-10">
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group"
                >
                  <span className={`
                    text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300
                    ${active ? "text-white" : "text-white/30 group-hover:text-white"}
                  `}>
                    {link.name}
                  </span>
                  {active && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 w-full h-px bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all bg-white/5 backdrop-blur-lg"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black z-[90] lg:hidden flex flex-col justify-center items-center px-6"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-5xl font-black text-white/20 hover:text-white transition-all duration-500 uppercase tracking-tighter"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-12 flex flex-col gap-4"
              >
                <a href="mailto:connect@salahuddin.dev" className="text-sm font-mono text-white/40">
                  connect@salahuddin.dev
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;