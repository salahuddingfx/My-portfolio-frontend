'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Partner {
  _id: string;
  name: string;
  logo: string;
  website: string;
}

/**
 * TrustedBy — "Companies I've worked with" infinite marquee section.
 *
 * Fetches partner logos from the backend API. If none exist yet, renders nothing
 * so the section doesn't appear with empty space.
 *
 * The marquee is CSS-only (no JS scroll) for zero performance overhead.
 */
export default function TrustedBy() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) return;
        const res = await fetch(`${apiUrl}/admin/partners`);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setPartners(data);
      } catch { /* silent fail — section just won't render */ }
      finally { setLoaded(true); }
    };
    fetch_();
  }, []);

  // Don't render anything until we know if partners exist
  if (!loaded || partners.length === 0) return null;

  // Duplicate the list so the marquee loop is seamless
  const items = [...partners, ...partners, ...partners];

  return (
    <section
      className="section-shell bg-[var(--surface)] border-y-[4px] border-[#000000] overflow-hidden"
      aria-label="Companies and partners"
    >
      <div className="container mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="section-header-center mb-0"
        >
          <span className="section-eyebrow">Trusted by</span>
          <h2 className="section-heading mt-1">Companies I&apos;ve worked with.</h2>
        </motion.div>
      </div>

      {/* Marquee track — fades at the edges via mask */}
      <div
        className="relative w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="flex gap-6 trusted-by-marquee">
          {items.map((partner, i) => {
            const logo = (
              <div
                key={`${partner._id}-${i}`}
                className="flex-shrink-0 flex items-center justify-center gap-3 px-8 py-5 bg-[var(--background)] border-[3px] border-[#000000] group hover:bg-[var(--neo-yellow)] transition-all duration-200 min-w-[160px] shadow-[3px_3px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000000]"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="32px"
                  />
                </div>
                <span className="text-xs font-bold text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors whitespace-nowrap tracking-wide">
                  {partner.name}
                </span>
              </div>
            );

            return partner.website ? (
              <Link
                key={`link-${partner._id}-${i}`}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={i < partners.length ? 0 : -1}
                aria-hidden={i >= partners.length}
              >
                {logo}
              </Link>
            ) : (
              <div key={`div-${partner._id}-${i}`} aria-hidden={i >= partners.length}>
                {logo}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
