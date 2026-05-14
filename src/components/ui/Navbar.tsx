"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        fixed
        top-0
        left-0
        w-full
        z-[100]
        transition-all
        duration-500
        ${
          scrolled
            ? "bg-black/70 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }
      `}
    >
      <div className="container flex items-center justify-between">

        {/* LEFT */}
        <Link
          href="/"
          className="flex items-center gap-4 group"
          aria-label="Homepage"
        >

          {/* IMAGE */}
          <div
            className="
              relative
              w-11
              h-11
              rounded-xl
              overflow-hidden
              border
              border-white/5
              transition-transform
              duration-300
              group-hover:scale-[1.03]
            "
          >
            <Image
              src="/salah-uddin.webp"
              alt="Salah Uddin Kader"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="hidden sm:flex flex-col">

            <span
              className="
                text-[15px]
                font-semibold
                tracking-[-0.02em]
                text-white
                leading-none
              "
            >
              Saka Chowdhury
            </span>

            <span
              className="
                text-[11px]
                text-white/35
                mt-1
              "
            >
              Salah Uddin Kader
            </span>

          </div>
        </Link>

        {/* CENTER */}
        <div className="hidden lg:flex items-center">

          <div
            className="
              flex
              items-center
              gap-8
              px-6
              py-3
              rounded-full
              border
              border-white/5
              bg-white/[0.02]
              backdrop-blur-md
            "
          >

            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="
                    relative
                    group
                    transition-colors
                    duration-300
                  "
                >

                  <span
                    className={`
                      text-[13px]
                      font-medium
                      tracking-[0.08em]
                      transition-colors
                      duration-300
                      ${
                        active
                          ? "text-white"
                          : "text-white/45 group-hover:text-white"
                      }
                    `}
                  >
                    {link.name}
                  </span>

                  {/* ACTIVE LINE */}
                  {active && (
                    <motion.div
                      layoutId="navbar-active"
                      className="
                        absolute
                        left-0
                        right-0
                        -bottom-2
                        h-[2px]
                        rounded-full
                        bg-[#dc2626]
                      "
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 28,
                      }}
                    />
                  )}

                </Link>
              );
            })}

          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4">

          <a
            href="mailto:salahuddinkadrappy@gmail.com"
            className="
              text-[13px]
              text-white/40
              hover:text-white
              transition-colors
            "
          >
            Contact
          </a>

          <Link
            href="/contact"
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-3
              rounded-full
              bg-[#dc2626]
              text-white
              text-[12px]
              font-medium
              tracking-[0.08em]
              transition-all
              duration-300
              hover:translate-y-[-2px]
              hover:bg-[#ef4444]
            "
          >
            Let&apos;s Talk

            <ArrowUpRight size={14} />
          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            md:hidden
            w-11
            h-11
            rounded-full
            border
            border-white/10
            bg-white/[0.02]
            flex
            items-center
            justify-center
            text-white/60
            hover:text-white
            transition-colors
          "
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="
              md:hidden
              absolute
              top-full
              left-0
              w-full
              border-b
              border-white/5
              bg-black/80
              backdrop-blur-md
            "
          >

            <div className="container py-8 flex flex-col gap-6">

              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                      text-[22px]
                      font-semibold
                      tracking-[-0.03em]
                      transition-colors
                      duration-300
                      ${
                        active
                          ? "text-white"
                          : "text-white/45 hover:text-white"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* MOBILE CTA */}
              <div className="pt-6">

                <Link
                  href="/contact"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    rounded-2xl
                    bg-[#dc2626]
                    px-6
                    py-4
                    text-white
                    text-[13px]
                    font-medium
                    tracking-[0.08em]
                    transition-all
                    duration-300
                    hover:bg-[#ef4444]
                  "
                >
                  Start a Conversation

                  <ArrowUpRight size={16} />
                </Link>

              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;