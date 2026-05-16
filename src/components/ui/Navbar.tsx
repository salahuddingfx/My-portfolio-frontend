"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-0 left-0 w-full z-[100] transition-all duration-500
          ${scrolled ? "py-4 bg-background border-b-2 border-white/10" : "py-8 lg:py-12 bg-transparent"}
        `}
      >
        <div className="container px-6 lg:px-12 flex items-center justify-between">
          
          {/* LEFT: LOGO */}
          <Link href="/" className="group flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none">
              SAKA.
            </span>
            <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-[0.4em] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              [SYSTEM.ONLINE]
            </span>
          </Link>

          {/* RIGHT: DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-300
                    ${active ? "text-accent" : "text-white/40 hover:text-white"}
                  `}
                >
                  [{link.name}]
                </Link>
              );
            })}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[11px] font-bold uppercase tracking-[0.4em] text-white hover:text-accent transition-colors"
          >
            {isOpen ? "[CLOSE]" : "[MENU]"}
          </button>
        </div>
      </motion.nav>

      {/* FULL SCREEN OVERLAY MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-screen bg-background z-[90] flex flex-col px-6 py-32 overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
            
            <div className="flex flex-col gap-4 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`block text-6xl sm:text-8xl font-black uppercase tracking-tighter hover:translate-x-4 transition-all duration-300 ${pathname === link.href ? "text-white" : "outline-text hover:text-white"}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-auto pt-12 border-t-2 border-white/10 relative z-10"
            >
              <span className="block text-[10px] font-mono text-accent uppercase tracking-[0.3em] mb-2">[ DIRECT_LINE ]</span>
              <a href="mailto:connect@salahuddin.dev" className="text-xl sm:text-3xl font-black text-white hover:text-accent transition-colors">
                CONNECT@SALAHUDDIN.DEV
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;