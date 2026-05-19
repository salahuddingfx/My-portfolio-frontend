"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ContactCTA = () => {
  return (
    <section
      id="contact-cta"
      className="section-shell bg-[var(--surface)] border-t border-[var(--border)] !pt-12 md:!pt-16"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl"
        >
          <span className="section-eyebrow">Let&apos;s work together</span>
          <h2 className="section-heading mt-1 mb-4">
            Got a project in mind?
          </h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed max-w-md mb-10">
            I&apos;m currently open to selected projects, collaborations, and
            interesting opportunities. If you have something in mind, I&apos;d
            love to hear about it.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4" style={{ marginTop: "20px" }}>
            <Link href="/contact" className="btn-primary">
              Start a project
              <ArrowRight size={15} />
            </Link>
            <a
              href="mailto:salahuddinkaderappy@gmail.com"
              className="text-sm text-[var(--muted)] hover:text-white transition-colors duration-200"
            >
              salahuddinkaderappy@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;