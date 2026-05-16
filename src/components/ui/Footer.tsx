"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";

/* =============================================================================
   NAV LINKS
============================================================================= */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/* =============================================================================
   SOCIAL LINKS
============================================================================= */

const SOCIALS = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      p: React.SVGProps<SVGSVGElement>
    ) => (
      <svg
        {...p}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },

  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      p: React.SVGProps<SVGSVGElement>
    ) => (
      <svg
        {...p}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect
          width="4"
          height="12"
          x="2"
          y="9"
        />
        <circle
          cx="4"
          cy="4"
          r="2"
        />
      </svg>
    ),
  },

  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      p: React.SVGProps<SVGSVGElement>
    ) => (
      <svg
        {...p}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },

  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      p: React.SVGProps<SVGSVGElement>
    ) => (
      <svg
        {...p}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          width="20"
          height="20"
          x="2"
          y="2"
          rx="5"
        />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line
          x1="17.5"
          x2="17.51"
          y1="6.5"
          y2="6.5"
        />
      </svg>
    ),
  },
];

/* =============================================================================
   COMPONENT
============================================================================= */

const Footer = () => {
  const year =
    new Date().getFullYear();

  return (
<footer
  className="
    relative
    mt-24
    overflow-hidden
    border-t
    border-white/[0.05]
    bg-[#080808]
  "
>

      {/* ================================================================
         TOP ACCENT LINE
      ================================================================= */}

      <div
        className="
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-[var(--accent)]/40
          to-transparent
        "
      />

      {/* ================================================================
         BACKGROUND GLOW
      ================================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -top-40
          left-1/2
          h-[300px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          opacity-[0.04]
        "
        style={{
          background:
            "radial-gradient(ellipse at center, #dc2626, transparent 70%)",
        }}
      />

      {/* ================================================================
         CONTAINER
      ================================================================= */}

      <div className="container relative z-10 max-w-7xl">

        {/* ================================================================
           TOP SECTION
        ================================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-14
            border-b
            border-white/[0.06]
            pt-32
            pb-14
            lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr]
            lg:gap-16
          "
        >

          {/* ============================================================
             BRAND COLUMN
          ============================================================= */}

          <div
            className="
              flex
              flex-col
              gap-8
            "
          >

            {/* LOGO */}
            <Link
              href="/"
              aria-label="Home"
              className="
                group
                flex
                w-fit
                items-center
                gap-3
              "
            >

              {/* ICON */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--accent)]
                "
              >

                <span
                  className="
                    text-base
                    font-bold
                    text-white
                  "
                  style={{
                    fontFamily:
                      "var(--font-space-grotesk)",
                  }}
                >
                  S
                </span>

              </div>

              {/* TEXT */}
              <div
                className="
                  flex
                  flex-col
                  leading-none
                "
              >

                <span
                  className="
                    text-[16px]
                    font-semibold
                    text-white
                    transition-colors
                    duration-200
                    group-hover:text-white/80
                  "
                  style={{
                    fontFamily:
                      "var(--font-space-grotesk)",
                  }}
                >
                  Salah Uddin Kader
                </span>

                <span
                  className="
                    mt-1
                    text-[11px]
                    text-[var(--muted-soft)]
                  "
                >
                  Creative Developer
                </span>

              </div>

            </Link>

            {/* DESCRIPTION */}
            <p
              className="
                max-w-[420px]
                text-sm
                leading-relaxed
                text-[var(--muted)]
              "
            >
              Building fast,
              accessible, and
              thoughtfully crafted
              digital experiences
              with a focus on
              performance,
              simplicity, and
              modern interaction.
            </p>

            {/* CONTACT */}
            <div
              className="
                flex
                flex-col
                gap-3
              "
            >

              {/* EMAIL */}
              <a
                href="mailto:salahuddinkaderappy@gmail.com"
                className="
                  group/footer
                  inline-flex
                  items-center
                  gap-3
                  text-[13px]
                  text-[var(--muted)]
                  transition-colors
                  duration-200
                  hover:text-white
                "
              >

                <div
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/[0.07]
                    bg-white/[0.04]
                  "
                >

                  <Mail
                    size={12}
                    className="
                      text-[var(--accent)]
                    "
                  />

                </div>

                salahuddinkaderappy@gmail.com

              </a>

              {/* LOCATION */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  text-[13px]
                  text-[var(--muted)]
                "
              >

                <div
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/[0.07]
                    bg-white/[0.04]
                  "
                >

                  <MapPin
                    size={12}
                    className="
                      text-[var(--accent)]
                    "
                  />

                </div>

                Cox&apos;s Bazar,
                Bangladesh

              </div>

            </div>

            {/* STATUS BADGE */}
            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.07]
                bg-white/[0.04]
                px-3
                py-1.5
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-400
                  animate-pulse
                "
              />

              <span
                className="
                  text-[11px]
                  text-[var(--muted)]
                "
              >
                Open to new projects
              </span>

            </div>

          </div>

          {/* ============================================================
             RIGHT COLUMNS
          ============================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-12
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {/* ==========================================================
               PAGES
            =========================================================== */}

            <div>

              <h4
                className="
                  mb-5
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-[var(--muted-soft)]
                "
              >
                Pages
              </h4>

              <ul
                className="
                  flex
                  flex-col
                  gap-3
                  items-start
                "
              >

                {NAV_LINKS.map(
                  (link) => (
                    <li
                      key={link.label}
                    >

                      <Link
                        href={link.href}
                        className="
                          footer-link
                          text-[13px]
                        "
                      >
                        {link.label}
                      </Link>

                    </li>
                  )
                )}

              </ul>

            </div>

            {/* ==========================================================
               SOCIALS
            =========================================================== */}

            <div>

              <h4
                className="
                  mb-5
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-[var(--muted-soft)]
                "
              >
                Social
              </h4>

              <ul
                className="
                  flex
                  flex-col
                  gap-3
                  items-start
                "
              >

                {SOCIALS.map(
                  (social) => (
                    <li
                      key={
                        social.name
                      }
                    >

                      <a
                        href={
                          social.href
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={
                          social.name
                        }
                        className="
                          footer-link
                          text-[13px]
                        "
                      >

                        <social.icon
                          className="
                            h-3.5
                            w-3.5
                            shrink-0
                          "
                        />

                        {
                          social.name
                        }

                      </a>

                    </li>
                  )
                )}

              </ul>

            </div>

            {/* ==========================================================
               CTA CARD
            =========================================================== */}

            <div
              className="
                flex
                flex-col
              "
            >

              <h4
                className="
                  mb-5
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-[var(--muted-soft)]
                "
              >
                Hire Me
              </h4>

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.03]
                  p-5
                "
              >

                <p
                  className="
                    text-[13px]
                    leading-relaxed
                    text-[var(--muted)]
                  "
                >
                  Available for
                  freelance projects,
                  collaborations, and
                  creative web work.
                </p>

                <Link
                  href="/contact"
                  className="
                    group/cta
                    inline-flex
                    items-center
                    gap-1.5
                    text-[13px]
                    font-medium
                    text-white
                    transition-colors
                    duration-200
                    hover:text-[var(--accent)]
                  "
                >

                  Start a project

                  <ArrowUpRight
                    size={13}
                    className="
                      transition-transform
                      duration-200
                      group-hover/cta:translate-x-[1px]
                      group-hover/cta:-translate-y-[1px]
                    "
                  />

                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* ================================================================
           BOTTOM BAR
        ================================================================= */}

        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-5
            py-7
            text-center
            sm:flex-row
            sm:text-left
          "
        >

          {/* COPYRIGHT */}
          <p
            className="
              text-center
              text-[12px]
              text-[var(--muted-soft)]
            "
          >
            © {year} Salah Uddin
            Kader — All rights
            reserved.
          </p>

          {/* SOCIAL ICONS */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            {SOCIALS.map(
              (social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    social.name
                  }
                  className="
                    footer-social
                  "
                >

                  <social.icon
                    className="
                      h-3.5
                      w-3.5
                    "
                  />

                </a>
              )
            )}

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;