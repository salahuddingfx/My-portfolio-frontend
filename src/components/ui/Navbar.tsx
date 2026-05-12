"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Magnetic from "@/components/ui/Magnetic";

const navLinks = [
  { name: "Home",     href: "/" },
  { name: "About",    href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery",  href: "/#gallery" },
  { name: "Projects", href: "/projects" },
  { name: "Reviews",  href: "/reviews" },
  { name: "Contact",  href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 1, 
        ease: [0.23, 1, 0.32, 1] as any,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        scrolled ? "bg-black/90 backdrop-blur-2xl border-b border-white/[0.05] py-8 shadow-2xl shadow-black/50" : "bg-transparent py-16"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container flex items-center justify-between">
        {/* Left: Brand */}
        <motion.div variants={itemVariants}>
          <Link href="/" className="flex items-center gap-4 group" aria-label="Salah portfolio home">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:scale-105 transition-all duration-300 shadow-lg">
              <Image
                src="/salah-uddin.webp"
                alt="Salah Uddin"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-base font-black tracking-tight text-white uppercase hidden sm:block">SALAHUDDIN.DEV</span>
          </Link>
        </motion.div>

        {/* Center: Contact Email (Hidden on mobile) */}
        <motion.div variants={itemVariants} className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <a 
            href="mailto:contact@salahuddin.codes" 
            className="font-mono text-[11px] font-bold text-white/40 hover:text-[#e11d48] transition-colors tracking-widest uppercase"
          >
            contact@salahuddin.codes
          </a>
        </motion.div>

        {/* Right: Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <motion.div key={link.name} variants={itemVariants}>
                <Link
                  href={link.href}
                  className="relative group py-2"
                  aria-current={active ? "page" : undefined}
                >
                  <span className={`font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active ? "text-[#e11d48]" : "text-white/40 hover:text-white"
                  }`}>
                    {link.name}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#e11d48] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/5 p-8 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-display font-bold text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
