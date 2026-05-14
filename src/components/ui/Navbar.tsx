"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const navRef = useRef<HTMLDivElement>(null);

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

  // GSAP Hover Animation Logic
  const handleHover = (index: number | null) => {
    setHoveredIndex(index);
    
    const links = navRef.current?.querySelectorAll(".nav-link-item");
    if (!links) return;

    links.forEach((link, i) => {
      if (index === null) {
        // Reset
        gsap.to(link, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      } else if (i === index) {
        // Hovered
        gsap.to(link, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out"
        });
      } else {
        // Others
        gsap.to(link, {
          opacity: 0.3,
          filter: "blur(4px)",
          scale: 0.95,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-0 left-0 w-full z-[100] transition-all duration-500
        ${scrolled ? "py-6 bg-black/40 backdrop-blur-3xl border-b border-white/5" : "py-16"}
      `}
    >
      <div className="container flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-6 group">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 group-hover:border-accent/50 transition-all duration-500 shadow-2xl">
            <Image src="/salah-uddin.webp" alt="Saka" fill className="object-cover" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[18px] font-black tracking-tight text-white uppercase leading-tight">Saka Chowdhury</span>
            <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-[0.2em] mt-1 opacity-80">Creative Engineer</span>
          </div>
        </Link>

        {/* CENTER NAVIGATION (GSAP ENHANCED) */}
        <div className="hidden lg:block">
          <div 
            ref={navRef}
            onMouseLeave={() => handleHover(null)}
            className="flex items-center gap-2 px-2 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => handleHover(i)}
                  className="nav-link-item relative px-8 py-3 transition-all duration-300"
                >
                  <span className={`
                    text-[14px] font-bold uppercase tracking-[0.15em]
                    ${active ? "text-accent" : "text-white/40"}
                  `}>
                    {link.name}
                  </span>
                  
                  {active && (
                    <motion.div 
                      layoutId="nav-active-bg"
                      className="absolute inset-0 bg-white/[0.05] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT AREA */}
        <div className="flex items-center gap-8">
          <Link 
            href="/contact" 
            className="hidden md:flex btn-primary !rounded-full px-7 py-3 text-[11px] font-bold tracking-widest border border-accent/10 hover:border-accent transition-all uppercase"
          >
            Let&apos;s Talk <ArrowUpRight size={14} className="ml-2" />
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="container py-12 flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-bold text-white/40 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;