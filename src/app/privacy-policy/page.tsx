import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Salah Uddin Kader portfolio website.",
  openGraph: {
    title: "Privacy Policy | Salah Uddin Kader",
    description: "Privacy policy for the Salah Uddin Kader portfolio website.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="section-shell bg-[var(--background)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="section-eyebrow">Legal</p>
            <h1 className="section-heading">Privacy Policy</h1>
            <p className="section-subtext">
              This page explains what information is collected on this portfolio site, how it is used, and the choices
              you have.
            </p>

            <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-[var(--muted)]">
              <div>
                <h2 className="text-base font-semibold text-white mb-3">Overview</h2>
                <p>
                  This site is a personal portfolio. It collects limited information to respond to inquiries, publish
                  reviews, and understand site usage.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-white mb-3">Information we collect</h2>
                <ul className="mt-4 list-disc pl-5 space-y-2">
                  <li>Contact details (name, email, message) when you use the contact form.</li>
                  <li>Review details you submit through the review form, including optional image uploads.</li>
                  <li>Usage data via analytics tools (pages viewed, device, browser, and approximate location).</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold text-white mb-3">How we use information</h2>
                <ul className="mt-4 list-disc pl-5 space-y-2">
                  <li>Respond to messages and project inquiries.</li>
                  <li>Display approved reviews and improve site content.</li>
                  <li>Maintain site security and performance.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold text-white mb-3">Analytics and cookies</h2>
                <p>
                  This site uses analytics (such as Google Analytics) to measure traffic and improve the experience.
                  Analytics may set cookies or similar technologies. You can disable cookies in your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-white mb-3">Sharing and retention</h2>
                <p>
                  Information is not sold. It may be processed by trusted service providers (hosting, analytics, email)
                  only as needed to operate the site. Data is kept only for as long as necessary for the purposes above.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-white mb-3">Your choices</h2>
                <p>
                  You can request access, correction, or deletion of your information by reaching out via the
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
