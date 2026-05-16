"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Home",     href: "/" },
  { name: "About",    href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog",     href: "/blog" },
  { name: "Gallery",  href: "/gallery" },
  { name: "Contact",  href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen]     = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const showAnim = gsap.from(headerRef.current, { 
        yPercent: -100,
        paused: true,
        duration: 0.3,
        ease: "power2.out"
      }).progress(1);
      
      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          // Set scrolled state for styling
          setScrolled(self.scroll() > 32);
          
          // Hide on scroll down, show on scroll up
          if (self.direction === -1 || self.scroll() <= 0) {
            showAnim.play();
          } else {
            showAnim.reverse();
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`
          fixed top-0 left-0 right-0 z-[100]
          transition-all duration-300
          ${scrolled
            ? "py-3 bg-[rgba(8,8,8,0.92)] border-b border-white/[0.07] shadow-[0_1px_40px_rgba(0,0,0,0.4)]"
            : "py-5 bg-transparent"
          }
        `}
        style={{ backdropFilter: scrolled ? "blur(16px)" : "none" }}
        role="banner"
      >
        <div className="container">
          <div className="flex items-center justify-between">

            {/* ── LOGO ── */}
            <Link href="/" aria-label="Home" className="group flex items-center gap-3">
              {/* Logo mark */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-[6px] bg-[var(--accent)] opacity-90" />
                <span
                  className="relative text-white text-sm font-bold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  S
                </span>
              </div>
              {/* Logo wordmark */}
              <div className="flex flex-col leading-none">
                <span
                  className="text-[15px] font-semibold text-white tracking-tight group-hover:text-white/80 transition-colors duration-200"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Salah Kader
                </span>
                <span className="text-[10px] text-[var(--muted-soft)] tracking-widest mt-0.5 font-mono">
                  Developer
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav
              className="hidden lg:flex items-center"
              aria-label="Main navigation"
            >
              {/* Links pill container */}
              <div className={`
                flex items-center gap-1 px-2 py-1.5 rounded-full
                transition-all duration-300
                ${scrolled
                  ? "bg-white/[0.04] border border-white/[0.07]"
                  : "bg-white/[0.03] border border-white/[0.05]"
                }
              `}>
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`
                        relative px-3.5 py-1.5 rounded-full text-[13px] font-medium
                        transition-all duration-200
                        ${active
                          ? "text-white bg-white/[0.10]"
                          : "text-[var(--muted)] hover:text-white hover:bg-white/[0.06]"
                        }
                      `}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/[0.09]"
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                      )}
                      <span className="relative">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="ml-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold bg-white text-[var(--background)] hover:bg-[var(--accent)] hover:text-white transition-all duration-250 group"
              >
                Let&apos;s Talk
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </Link>
            </nav>

            {/* ── MOBILE TOGGLE ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] text-[var(--muted)] hover:text-white hover:bg-white/[0.10] transition-all duration-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={16} /> : <Menu size={16} />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={drawerRef}
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 h-full w-[300px] z-[95] bg-[#0e0e0e] border-l border-white/[0.07] flex flex-col lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-[5px] bg-[var(--accent)] flex items-center justify-center">
                    <span className="text-white text-xs font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      S
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    Salah Kader
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.05] text-[var(--muted)] hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-0.5 px-4 py-5 flex-1">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        className={`
                          flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium
                          transition-all duration-150
                          ${active
                            ? "text-white bg-white/[0.07]"
                            : "text-[var(--muted)] hover:text-white hover:bg-white/[0.04]"
                          }
                        `}
                      >
                        <span>{link.name}</span>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="px-5 py-6 border-t border-white/[0.06]">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-white text-[var(--background)] text-sm font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
                >
                  Let&apos;s Talk
                  <ArrowUpRight size={14} />
                </Link>
                <p className="mt-4 text-[11px] text-[var(--muted-soft)] text-center font-mono">
                  salahuddinkaderappy@gmail.com
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;