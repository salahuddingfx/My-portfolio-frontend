import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Salah Uddin Kader portfolio website.",
  openGraph: {
    title: "Terms | Salah Uddin Kader",
    description: "Terms of use for the Salah Uddin Kader portfolio website.",
  },
};

export default function TermsPage() {
  return (
    <main style={{ paddingTop: "var(--navbar-height, 120px)" }}>
      <section className="section-shell bg-[var(--background)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="section-eyebrow">Legal</p>
            <h1 className="section-heading">Terms</h1>
            <p className="section-subtext">
              By accessing this website, you agree to the terms below. Please read them carefully.
            </p>

            <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-[var(--muted)]">
              <div>
                <h2 className="text-base font-semibold text-white mb-3">Use of the site</h2>
                <p>
                  This portfolio is provided for personal and informational use. You agree not to misuse the site,
                  attempt to access restricted areas, or disrupt services.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-white mb-3">Intellectual property</h2>
                <p>
                  All content on this site, including text, images, and code samples, is owned by Salah Uddin Kader or
                  used with permission. You may not copy or redistribute content without written consent.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-white mb-3">Links to third parties</h2>
                <p>
                  This site may link to external websites. Those sites are not controlled by this portfolio, and their
                  content or policies are not the responsibility of the site owner.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-white mb-3">Disclaimer</h2>
                <p>
                  This site is provided on an "as is" basis without warranties of any kind. While efforts are made to
                  keep information accurate, no guarantees are provided.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-white mb-3">Changes to these terms</h2>
                <p>
                  Terms may be updated from time to time. Continued use of the site means you accept the latest
                  version.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-white mb-3">Contact</h2>
                <p>
                  For questions about these terms, reach out via the
                  {" "}
                  <Link href="/contact" className="text-white hover:text-[var(--accent)] transition-colors">
                    contact page
                  </Link>
                  .
                </p>
              </div>
            </div>

            <p className="mt-12 text-xs text-[var(--muted-soft)]">Last updated: May 18, 2026</p>
          </div>
        </div>
      </section>
    </main>
  );
}
