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
        gsap.to(link, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      } else if (i === index) {
        gsap.to(link, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        });
      } else {
        gsap.to(link, {
          opacity: 0.25,
          filter: "blur(2px)",
          scale: 0.98,
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
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-0 left-0 w-full z-[100] transition-all duration-700
        ${scrolled ? "py-4 bg-black/50 backdrop-blur-3xl border-b border-white/5 shadow-2xl" : "py-10 lg:py-16"}
      `}
    >
      <div className="container flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3 lg:gap-5 group relative z-10">
          <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-accent/50 transition-all duration-500 shadow-2xl">
            <Image src="/salah-uddin.webp" alt="Saka" fill className="object-cover" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[13px] lg:text-[15px] font-black tracking-tight text-white uppercase leading-tight">Saka Chowdhury</span>
            <span className="text-[8px] lg:text-[9px] text-accent font-mono font-bold uppercase tracking-[0.2em] mt-0.5 opacity-70">Creative Engineer</span>
          </div>
        </Link>

        {/* CENTER NAVIGATION */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <div 
            ref={navRef}
            onMouseLeave={() => handleHover(null)}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
          >
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => handleHover(i)}
                  className="nav-link-item relative px-8 py-3 transition-all duration-300 group"
                >
                  <span className={`
                    text-[12px] font-black uppercase tracking-[0.25em]
                    ${active ? "text-white" : "text-white/40 group-hover:text-white/80"}
                  `}>
                    {link.name}
                  </span>
                  
                  {active && (
                    <motion.div 
                      layoutId="nav-active-bg"
                      className="absolute inset-0 bg-white/[0.08] rounded-full -z-10 shadow-inner"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT AREA */}
        <div className="flex items-center gap-4 lg:gap-8 relative z-10">
          <Link 
            href="/contact" 
            className="hidden lg:flex btn-primary !py-3 !px-6 !text-[10px] !tracking-[0.2em]"
          >
            Let&apos;s Talk <ArrowUpRight size={14} className="ml-2" />
          </Link>

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-3xl z-[90] lg:hidden flex flex-col justify-center items-center"
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
                    className="text-4xl md:text-6xl font-black text-white/20 hover:text-white transition-all duration-500 uppercase tracking-tighter"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8"
              >
                <Link href="/contact" className="btn-primary">
                  Start a Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;