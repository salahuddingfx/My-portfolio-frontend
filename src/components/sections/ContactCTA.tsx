"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ContactCTA = () => {
  return (
    <section
      id="contact-cta"
      className="section-shell bg-[var(--surface-2)] border-t-[4px] border-[#000000]"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="section-eyebrow">Let&apos;s work together</span>
          <h2 className="section-heading mt-1 mb-4 text-center">
            Got a project in mind?
          </h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed max-w-md mb-10 text-center mx-auto">
            I&apos;m currently open to selected freelance projects, client collaborations, and
            agency contracts. If you have a project in mind for a full-stack AI engineer, I&apos;d
            love to connect.
          </p>
 
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 mx-auto w-fit">
            <Link href="/contact" className="btn-primary">
              Start a project
              <ArrowRight size={15} />
            </Link>
            <a
              href="mailto:salahuddinkaderappy@gmail.com"
              className="text-sm !text-[var(--muted)] hover:!text-[var(--foreground)] text-center transition-colors duration-200"
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