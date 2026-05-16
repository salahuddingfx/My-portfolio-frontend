"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";

const navLinks = [
  { name: "Home",     href: "/" },
  { name: "About",    href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog",     href: "/blog" },
  { name: "Contact",  href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen]     = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close on route change */
  useEffect(() => { setIsOpen(false); }, [pathname]);

  /* Close on outside click */
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

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`
          fixed top-0 left-0 w-full z-[100]
          transition-all duration-300
          ${scrolled
            ? "py-3 backdrop-blur-md bg-[rgba(8,8,8,0.85)] border-b border-white/[0.06]"
            : "py-5 bg-transparent"
          }
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex flex-col leading-none group"
            aria-label="Home"
          >
            <span
              className="text-lg font-semibold text-white tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Salah.
            </span>
            <span className="text-[10px] text-[var(--muted)] tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0.5">
              Full Stack Dev
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    relative px-3 py-2 text-sm font-medium rounded-md
                    transition-colors duration-200
                    ${active
                      ? "text-white"
                      : "text-[var(--muted)] hover:text-white"
                    }
                  `}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-3 right-3 h-px bg-[var(--accent)]"
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  )}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="btn-primary ml-4"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-[var(--muted)] hover:text-white transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              ref={drawerRef}
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 h-full w-[280px] z-[95] bg-[var(--surface)] border-l border-[var(--border)] flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
                <span
                  className="text-base font-semibold text-white"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Navigation
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-md text-[var(--muted)] hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col px-3 py-4 gap-1 flex-1">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={`
                          flex items-center px-3 py-2.5 rounded-md text-sm font-medium
                          transition-colors duration-200
                          ${active
                            ? "text-white bg-white/[0.06]"
                            : "text-[var(--muted)] hover:text-white hover:bg-white/[0.04]"
                          }
                        `}
                      >
                        {active && (
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)] mr-2.5" />
                        )}
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-6 border-t border-[var(--border)]">
                <Link
                  href="/contact"
                  className="btn-primary w-full justify-center"
                >
                  Let&apos;s Talk
                </Link>
                <p className="mt-4 text-[11px] text-[var(--muted-soft)] text-center">
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