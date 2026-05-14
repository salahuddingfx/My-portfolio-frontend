"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

import Magnetic from "@/components/ui/Magnetic";

const ContactCTA = () => {
  return (
    <section
      id="contact-cta"
      className="
        section-shell
        relative
        overflow-hidden
        bg-black
      "
    >

      {/* SOFT BACKGROUND */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[500px]
          h-[500px]
          rounded-full
          bg-accent/5
          blur-[90px]
          pointer-events-none
        "
      />

      <div
        className="
          container
          relative
          z-10
        "
      >

        <motion.div
          className="
            max-w-3xl
            mx-auto
            text-center
          "
        >

          {/* KICKER */}
          <span className="section-kicker">
            Let&apos;s Work Together
          </span>

          {/* HEADING */}
          <h2 className="section-title mt-6 mx-auto">
            Have an
            <span className="text-accent">
              {" "}
              Idea
            </span>
            {" "}in Mind?
          </h2>

          {/* TEXT */}
          <p
            className="
              mt-8
              text-[15px]
              leading-8
              text-white/60
              max-w-2xl
              mx-auto
            "
          >
            I’m currently open to selected
            projects, collaborations, and
            thoughtful digital work.
          </p>

          {/* BUTTONS */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-5
              mt-12
            "
          >

            <Magnetic>

              <Link
                href="/contact"
                className="
                  btn-primary
                  px-8
                  py-4
                "
              >
                Start a Project

                <ArrowRight size={16} />
              </Link>

            </Magnetic>

            <a
              href="mailto:salahuddinkaderappy@gmail.com"
              className="
                text-[15px]
                font-medium
                text-white/60
                hover:text-white
                transition-colors
              "
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