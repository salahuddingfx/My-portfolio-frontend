"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

/* =============================================================================
   NAVIGATION LINKS
============================================================================== */

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

/* =============================================================================
   COMPONENT
============================================================================== */

const Navbar = () => {
  const pathname = usePathname();
  const { settings } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTheme = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  /* ===========================================================================
     GSAP SCROLL NAVBAR
  =========================================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ===========================================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  =========================================================================== */

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /* ===========================================================================
     CLOSE ON OUTSIDE CLICK
  =========================================================================== */

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

  /* ===========================================================================
     BODY LOCK
  =========================================================================== */

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* =========================================================================
         HEADER
      ========================================================================= */}
      <header
        ref={headerRef}
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[var(--z-navbar)] transition-all duration-200 ${
          scrolled
            ? "h-[72px] bg-[var(--navbar-bg)] border-b-[3px] border-[#000000] shadow-[0_4px_0px_#000000]"
            : "h-[84px] bg-transparent"
        }`}
      >
        <div className="container h-full">
          <div className="flex h-full items-center justify-between">
            {/* LOGO */}
            <Link href="/" aria-label="Homepage" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex h-11 w-11 items-center justify-center bg-[#000000] text-[#FFFFFF] border-[3px] border-[#000000] shadow-[3px_3px_0px_#000000] transition-all duration-200 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[5px_5px_0px_#000000]">
                <span className="text-[17px] font-extrabold" style={{ fontFamily: "var(--font-space-grotesk)" }}>S</span>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[16px] font-extrabold text-[var(--foreground)] uppercase tracking-wide" style={{ fontFamily: "var(--font-space-grotesk)" }}>Salah Uddin Kader</span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)] font-bold">Developer</span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-4">
              <div className={`flex h-11 items-center border-[3px] border-[#000000] px-1.5 transition-all duration-200 ${
                scrolled ? "bg-[var(--surface)] shadow-[3px_3px_0px_#000000]" : "border-transparent bg-transparent shadow-none"
              }`}>
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative nav-link ${active ? "text-[#000000]" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="absolute inset-0 bg-[var(--neo-yellow)] border-[2px] border-[#000000]"
                          style={{ borderRadius: "var(--radius-md)" }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* CTA BUTTON */}
              <Link
                href="/contact"
                className="nav-cta group inline-flex h-11 items-center justify-center gap-2.5 border-[3px] border-[#000000] bg-[#000000] px-6 text-[13px] font-bold leading-none text-[#FFFFFF] uppercase tracking-wider transition-all duration-200 hover:bg-[var(--neo-yellow)] hover:text-[#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000000] shadow-[3px_3px_0px_#000000]"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                <span className="relative top-[0.5px]">Let&apos;s Talk</span>
                <ArrowUpRight size={15} strokeWidth={2.5} className="shrink-0 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
              </Link>

              {/* THEME TOGGLE BUTTON */}
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="flex h-11 w-11 items-center justify-center border-[3px] border-[#000000] bg-[var(--surface)] text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--neo-yellow)] hover:text-[#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000000] shadow-[3px_3px_0px_#000000] cursor-pointer"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                {theme === "dark" ? <Sun size={16} strokeWidth={2.5} /> : <Moon size={16} strokeWidth={2.5} />}
              </button>
            </nav>

            {/* MOBILE THEME TOGGLE + HAMBURGER */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="flex h-11 w-11 items-center justify-center border-[3px] border-[#000000] bg-[var(--surface)] text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--neo-yellow)] shadow-[3px_3px_0px_#000000] cursor-pointer"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                {theme === "dark" ? <Sun size={16} strokeWidth={2.5} /> : <Moon size={16} strokeWidth={2.5} />}
              </button>

              <button
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-11 w-11 items-center justify-center border-[3px] border-[#000000] bg-[var(--surface)] text-[var(--muted)] transition-all duration-200 hover:bg-[var(--neo-yellow)] hover:text-[#000000] shadow-[3px_3px_0px_#000000] cursor-pointer"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[var(--z-overlay)] bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* DRAWER */}
            <motion.div
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-y-0 right-0 z-[var(--z-overlay)] flex h-full w-full max-w-[360px] flex-col border-l-[4px] border-[#000000] bg-[var(--background)] overflow-hidden lg:hidden"
            >
              {/* DRAWER HEADER */}
              <div className="flex items-center justify-between border-b-[3px] border-[#000000] p-5 h-[72px] mx-2.5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#000000] border-[3px] border-[#000000] shadow-[3px_3px_0px_#000000]">
                    <span className="text-sm font-extrabold text-[#FFFFFF]">S</span>
                  </div>
                  <span className="text-[15px] font-extrabold text-[var(--foreground)] uppercase tracking-wide" style={{ fontFamily: "var(--font-space-grotesk)" }}>Salah Uddin Kader</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center border-[3px] border-[#000000] bg-[var(--surface)] text-[var(--muted)] transition-all duration-200 hover:bg-[var(--neo-yellow)] hover:text-[#000000] shadow-[3px_3px_0px_#000000] cursor-pointer"
                  style={{ borderRadius: "var(--radius-md)" }}
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* MOBILE NAV LINKS */}
              <nav className="flex-1 overflow-y-auto flex flex-col gap-1.5 p-5">
                {navLinks.map((link, index) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.04 }}
                      className="shrink-0"
                    >
                      <Link
                        href={link.href}
                        className={`mobile-nav-link border-[3px] border-[#000000] ${
                          active
                            ? "bg-[var(--neo-yellow)] text-[#000000] shadow-[3px_3px_0px_#000000]"
                            : "bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--neo-yellow)] hover:text-[#000000] shadow-[3px_3px_0px_#000000]"
                        }`}
                      >
                        <span>{link.name}</span>
                        {active && <span className="h-2 w-2 bg-[#000000]" style={{ borderRadius: "var(--radius-sm)" }} />}
                      </Link>
                    </motion.div>
                  );
                })}
                {/* Spacer to guarantee padding-bottom is respected in overflow scrolling */}
                <div className="h-4 shrink-0" />
              </nav>

              {/* FOOTER CTA */}
              <div className="border-t-[3px] border-[#000000] p-5 shrink-0 flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="group flex h-12 w-full items-center justify-center gap-2 border-[3px] border-[#000000] bg-[#000000] text-[14px] font-bold text-[#FFFFFF] uppercase tracking-wider transition-all duration-200 hover:bg-[var(--neo-yellow)] hover:text-[#000000] shadow-[4px_4px_0px_#000000]"
                  style={{ borderRadius: "var(--radius-md)" }}
                >
                  Let&apos;s Talk
                  <ArrowUpRight size={15} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
                </Link>
                <p className="text-center text-[11px] text-[var(--muted-soft)] font-mono uppercase tracking-widest">
                  {settings?.email || "salauddinkaderappy@gmail.com"}
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
