"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const socials = [
    { name: "GitHub", href: settings?.socials.github || "https://github.com/salahuddingfx", icon: GithubIcon },
    { name: "LinkedIn", href: settings?.socials.linkedin || "https://linkedin.com/in/salahuddingfx", icon: LinkedinIcon },
    { name: "Twitter", href: settings?.socials.twitter || "https://x.com/salahuddingfx", icon: TwitterIcon },
    { name: "Instagram", href: settings?.socials.instagram || "https://instagram.com/salahuddingfx", icon: InstagramIcon },
    { name: "Facebook", href: settings?.socials.facebook || "https://facebook.com/salahuddingfx", icon: FacebookIcon },
  ].filter(s => s.href && s.href !== "#" && s.href !== "");

  return (
    <footer style={{ position: "relative", overflow: "hidden", background: "var(--background)", borderTop: "3px solid #000000" }}>
      <div 
        className="footer-inner"
        style={{ 
          position: "relative", 
          zIndex: 10, 
          margin: "0 auto", 
          width: "100%", 
          maxWidth: "var(--container-max)",
          paddingTop: "clamp(2.5rem, 5vw, 4rem)", 
          paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
          paddingLeft: "var(--container-pad)", 
          paddingRight: "var(--container-pad)" 
        }}
      >
        
        {/* ─── HERO ROW ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "3px solid #000000" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "36rem" }}>
            <div style={{ display: "inline-flex", width: "fit-content", alignItems: "center", gap: "0.5rem", border: "2px solid #000000", background: "var(--neo-green)", boxShadow: "3px 3px 0px #000000", padding: "6px 10px" }}>
              <span style={{ height: "6px", width: "6px", background: "#000000", borderRadius: "var(--radius-sm)" }} className="animate-pulse" />
              <span style={{ fontSize: "10px", color: "#000000", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Open to new projects</span>
            </div>
            
            <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "var(--foreground)", lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }}>
              Let&apos;s build something <span style={{ color: "var(--neo-yellow)" }}>great</span> together.
            </h2>
            
            <p style={{ maxWidth: "26rem", fontSize: "13px", lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>
              {settings?.bio || "Building fast, accessible, and thoughtfully crafted digital experiences with a focus on performance, simplicity, and modern interaction."}
            </p>
          </div>

          <Link href="/contact" style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0, textDecoration: "none" }}>
            <div className="group" style={{ display: "flex", height: "2.75rem", width: "2.75rem", flexShrink: 0, alignItems: "center", justifyContent: "center", background: "#000000", border: "3px solid #000000", boxShadow: "3px 3px 0px #000000", transition: "all 0.2s" }}>
              <ArrowUpRight size={16} style={{ color: "#FFFFFF", transition: "transform 0.2s" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--muted-soft)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Start a</span>
              <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "14px", fontWeight: 800, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.02em" }}>Project</span>
            </div>
          </Link>
        </div>

        {/* ─── COLUMNS ROW ─── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "3px solid #000000" }}>
          
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <Link href="/" aria-label="Home" style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
              <div style={{ display: "flex", height: "2.75rem", width: "2.75rem", flexShrink: 0, alignItems: "center", justifyContent: "center", background: "#000000", border: "3px solid #000000", boxShadow: "3px 3px 0px #000000" }}>
                <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1rem", fontWeight: 800, color: "#FFFFFF" }}>S</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "15px", fontWeight: 800, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                  Salah Uddin Kader
                </span>
                <span style={{ marginTop: "4px", fontSize: "10px", color: "var(--muted-soft)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>
                  Creative Developer
                </span>
              </div>
            </Link>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a 
                href={`mailto:${settings?.email || "salahuddinkaderappy@gmail.com"}`} 
                style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "13px", color: "var(--muted)", transition: "color 0.2s", textDecoration: "none" }}
              >
                <div style={{ display: "flex", height: "2rem", width: "2rem", flexShrink: 0, alignItems: "center", justifyContent: "center", border: "2px solid #000000", background: "var(--surface-2)", boxShadow: "2px 2px 0px #000000" }}>
                  <Mail size={13} style={{ color: "var(--neo-yellow)" }} strokeWidth={2.5} />
                </div>
                {settings?.email || "salahuddinkaderappy@gmail.com"}
              </a>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "13px", color: "var(--muted)" }}>
                <div style={{ display: "flex", height: "2rem", width: "2rem", flexShrink: 0, alignItems: "center", justifyContent: "center", border: "2px solid #000000", background: "var(--surface-2)", boxShadow: "2px 2px 0px #000000" }}>
                  <MapPin size={13} style={{ color: "var(--neo-yellow)" }} strokeWidth={2.5} />
                </div>
                {settings?.location || "Cox's Bazar, Bangladesh"}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--foreground)", marginBottom: "1rem" }}>
              Navigation
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem", listStyle: "none", padding: 0, margin: 0 }}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link" style={{ fontSize: "13px" }}>{link.label}</Link>
                </li>
              ))}
              <li>
                <a
                  href="https://nextorastudio.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
                >
                  Nextora Studio
                  <ExternalLink size={10} style={{ opacity: 0.5 }} />
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--foreground)", marginBottom: "1rem" }}>
              Connect
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
              {socials.map((social) => (
                <li key={social.name}>
                  <a 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.name} 
                    className="group/social"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "13px", fontWeight: 600, color: "var(--muted)", transition: "color 0.2s", textDecoration: "none" }}
                  >
                    <div className="group-hover/social" style={{ display: "flex", height: "2rem", width: "2rem", flexShrink: 0, alignItems: "center", justifyContent: "center", border: "2px solid #000000", background: "var(--surface)", boxShadow: "2px 2px 0px #000000", transition: "all 0.2s" }}>
                      <social.icon style={{ height: "14px", width: "14px" }} />
                    </div>
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hire Me */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--foreground)", marginBottom: "1rem" }}>
              Hire Me
            </p>
            <div style={{ display: "flex", flexDirection: "column", border: "3px solid #000000", background: "var(--surface)", boxShadow: "4px 4px 0px #000000", borderRadius: "var(--radius-lg)", padding: "clamp(1rem, 2vw, 1.5rem)", gap: "1rem" }}>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>
                Available for freelance, collaborations & creative work.
              </p>
              <Link 
                href="/contact" 
                className="group/cta"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "12px", fontWeight: 700, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.05em", transition: "color 0.2s", textDecoration: "none" }}
              >
                Let&apos;s Talk
                <ArrowRight size={12} strokeWidth={2.5} style={{ transition: "transform 0.2s" }} />
              </Link>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM BAR ─── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <p style={{ fontSize: "11px", color: "var(--muted-soft)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
            © {year} Salah Uddin Kader (@salahuddingfx) — All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "11px", color: "var(--muted-soft)" }}>
            <Link href="/privacy-policy" className="footer-link" style={{ fontSize: "11px" }}>Privacy</Link>
            <span style={{ color: "var(--foreground)", opacity: 0.2 }}>·</span>
            <Link href="/terms" className="footer-link" style={{ fontSize: "11px" }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
