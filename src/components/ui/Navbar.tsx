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
        ${scrolled ? "py-6 bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl" : "py-12 lg:py-20 bg-transparent"}
      `}
    >
      <div className="container px-6 lg:px-16 flex items-center justify-between">
        
        {/* LEFT: LOGO */}
        <div className="flex items-center">
          <Link href="/" className="group flex flex-col">
            <span className="text-[16px] lg:text-[20px] font-black tracking-tighter text-white uppercase leading-none">
              Saka.dev
            </span>
            <span className="text-[8px] text-accent font-mono font-bold uppercase tracking-[0.3em] mt-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
              Digital Experience
            </span>
          </Link>
        </div>

        {/* RIGHT: LINKS & TOGGLE */}
        <div className="flex items-center gap-12">
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group py-2"
                >
                  <span className={`
                    text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300
                    ${active ? "text-white" : "text-white/40 group-hover:text-white"}
                  `}>
                    {link.name}
                  </span>
                  {active && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all bg-white/5 backdrop-blur-lg"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-2xl z-[90] lg:hidden flex flex-col px-8 py-24"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`text-6xl font-black transition-all duration-500 uppercase tracking-tighter ${pathname === link.href ? "text-white" : "text-white/10 hover:text-white"}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto border-t border-white/5 pt-12 flex flex-col gap-2"
            >
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Contact</span>
              <a href="mailto:connect@salahuddin.dev" className="text-2xl font-bold text-white hover:text-accent transition-colors">
                connect@salahuddin.dev
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;