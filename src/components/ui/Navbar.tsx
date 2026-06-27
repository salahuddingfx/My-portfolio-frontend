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
        className="fixed top-0 left-0 right-0 z-[var(--z-navbar)] h-[76px] bg-[var(--navbar-bg)] border-b-[3px] border-[#000000] shadow-[0_4px_0px_#000000] transition-all duration-200"
      >
        {/* Neon top accent strip */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-[var(--neo-yellow)] z-50" />
        <div className="container h-full">
          <div className="flex h-full items-center justify-between">
            {/* LOGO */}
            <Link href="/" aria-label="Homepage" className="flex items-center gap-3 group shrink-0">
              <div className="relative h-11 w-11 transition-all duration-200 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]">
                <img
                  src="/2.png"
                  alt="Salah Uddin Logo"
                  className="dark:hidden h-full w-full object-contain rounded-full border-[3px] border-[#000000] shadow-[3px_3px_0px_#000000] group-hover:shadow-[5px_5px_0px_#000000] transition-all duration-200"
                />
                <img
                  src="/1.png"
                  alt="Salah Uddin Logo"
                  className="hidden dark:block h-full w-full object-contain rounded-full border-[3px] border-[#FFFFFF] shadow-[3px_3px_0px_#FFFFFF] group-hover:shadow-[5px_5px_0px_#FFFFFF] transition-all duration-200"
                />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[16px] font-extrabold text-[var(--foreground)] uppercase tracking-wide" style={{ fontFamily: "var(--font-space-grotesk)" }}>Salah Uddin Kader</span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)] font-bold">Developer</span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-4">
              <div className="flex h-11 items-center border-[3px] border-[#000000] px-1.5 bg-[var(--surface)] shadow-[3px_3px_0px_#000000] transition-all duration-200 rounded-md">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative nav-link transition-all duration-200 ${
                        active 
                          ? "text-black" 
                          : "text-[var(--muted)] hover:text-[var(--foreground)] hover:-translate-y-0.5"
                      }`}
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
                className="nav-cta group inline-flex h-11 items-center justify-center gap-2.5 border-[3px] border-[#000000] bg-[#000000] px-6 text-[13px] font-bold leading-none !text-[#FFFFFF] uppercase tracking-wider transition-all duration-200 hover:bg-[var(--neo-yellow)] hover:!text-[#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000000] shadow-[3px_3px_0px_#000000]"
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
                className="flex h-11 w-11 items-center justify-center border-[3px] border-[#000000] bg-[var(--surface)] text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--neo-yellow)] hover:text-[#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000000] shadow-[3px_3px_0px_#000000] cursor-pointer"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                {theme === "dark" ? <Sun size={16} strokeWidth={2.5} /> : <Moon size={16} strokeWidth={2.5} />}
              </button>

              <button
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-11 w-11 items-center justify-center border-[3px] border-[#000000] bg-[var(--surface)] text-[var(--muted)] transition-all duration-200 hover:bg-[var(--neo-yellow)] hover:text-[#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000000] shadow-[3px_3px_0px_#000000] cursor-pointer"
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
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[var(--z-overlay)] bg-black/60 lg:hidden"
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
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  zIndex: "var(--z-overlay)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                  maxWidth: "360px",
                  borderLeft: "4px solid #000000",
                  background: "var(--background)",
                  overflow: "hidden",
                }}
                className="lg:hidden"
              >
              {/* DRAWER HEADER */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid #000000", padding: "20px", height: "72px", marginLeft: "10px", marginRight: "10px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <img
                      src="/2.png"
                      alt="Salah Uddin Logo"
                      className="dark:hidden h-full w-full object-contain rounded-full border-[3px] border-[#000000] shadow-[3px_3px_0px_#000000]"
                    />
                    <img
                      src="/1.png"
                      alt="Salah Uddin Logo"
                      className="hidden dark:block h-full w-full object-contain rounded-full border-[3px] border-[#FFFFFF] shadow-[3px_3px_0px_#FFFFFF]"
                    />
                  </div>
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.02em", fontFamily: "var(--font-space-grotesk)" }}>Salah Uddin Kader</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    height: "40px",
                    width: "40px",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "3px solid #000000",
                    background: "var(--surface)",
                    color: "var(--muted)",
                    transition: "all 0.2s",
                    boxShadow: "3px 3px 0px #000000",
                    cursor: "pointer",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* MOBILE NAV LINKS */}
              <nav style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", padding: "20px" }}>
                {navLinks.map((link, index) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "tween", ease: "easeOut", duration: 0.15, delay: index * 0.015 }}
                      style={{ flexShrink: 0 }}
                    >
                      <Link
                        href={link.href}
                        className="mobile-nav-link"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          height: "54px",
                          paddingInline: "1rem",
                          borderRadius: "var(--radius-md)",
                          fontSize: "15px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.02em",
                          border: "3px solid #000000",
                          background: active ? "var(--neo-yellow)" : "var(--surface)",
                          color: active ? "#000000" : "var(--muted)",
                          boxShadow: "3px 3px 0px #000000",
                          transition: "all 0.2s ease",
                          textDecoration: "none",
                        }}
                      >
                        <span>{link.name}</span>
                        {active && <span style={{ height: "8px", width: "8px", background: "#000000", borderRadius: "var(--radius-sm)" }} />}
                      </Link>
                    </motion.div>
                  );
                })}
                {/* Spacer */}
                <div style={{ height: "16px", flexShrink: 0 }} />
              </nav>

              {/* FOOTER CTA */}
              <div style={{ borderTop: "3px solid #000000", padding: "20px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <Link
                  href="/contact"
                  className="group"
                  style={{
                    display: "flex",
                    height: "48px",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    border: "3px solid #000000",
                    background: "#000000",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "4px 4px 0px #000000",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                >
                  Let&apos;s Talk
                  <ArrowUpRight size={15} strokeWidth={2.5} style={{ transition: "transform 0.2s" }} />
                </Link>
                <p style={{ textAlign: "center", fontSize: "11px", color: "var(--muted-soft)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
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
