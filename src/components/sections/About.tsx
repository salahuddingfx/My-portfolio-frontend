"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    label: "Projects",
    value: "50+",
    icon: Rocket,
  },
  {
    label: "Code Written",
    value: "250K+",
    icon: Code2,
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="
        section-shell
        relative
        overflow-hidden
        bg-black
      "
    >
      <div className="container relative z-10">

        <div
          className="
            grid
            lg:grid-cols-2
            gap-16
            xl:gap-24
            items-center
          "
        >

          {/* IMAGE */}
          <motion.div
            className="relative"
          >

            <div
              className="
                relative
                aspect-[4/5]
                max-w-md
                mx-auto
                overflow-hidden
                rounded-3xl
                border
                border-white/5
                bg-white/[0.02]
              "
            >

              <Image
                src="/mine-photo.png"
                alt="Salah Uddin Kader"
                fill
                className="
                  object-cover
                  grayscale
                  hover:grayscale-0
                  transition-all
                  duration-700
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/50
                  via-transparent
                  to-transparent
                "
              />

            </div>

          </motion.div>

          {/* CONTENT */}
          <motion.div
            className="max-w-xl"
          >

            <span className="section-kicker">
              About Me
            </span>

            <h2 className="section-title">
              The Mind Behind
              <span className="text-accent"> The Work.</span>
            </h2>

            <p
              className="
                text-white/60
                leading-8
                text-[15px]
                max-w-lg
              "
            >
              I’m Salah Uddin Kader, a developer focused on
              building clean interfaces, interactive experiences,
              and modern digital products using thoughtful design
              and scalable technologies.
            </p>

            {/* STATS */}
            <div
              className="
                grid
                grid-cols-2
                gap-8
                mt-12
              "
            >

              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="
                    border
                    border-white/5
                    rounded-2xl
                    p-6
                    bg-white/[0.02]
                  "
                >

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      border
                      border-white/5
                      flex
                      items-center
                      justify-center
                      text-white/50
                      mb-5
                    "
                  >
                    <stat.icon size={18} />
                  </div>

                  <h4
                    className="
                      text-3xl
                      font-bold
                      tracking-tight
                      text-white
                    "
                  >
                    {stat.value}
                  </h4>

                  <p
                    className="
                      text-white/40
                      text-sm
                      mt-2
                    "
                  >
                    {stat.label}
                  </p>

                </div>
              ))}

            </div>

            {/* BUTTON */}
            <div className="mt-12">

              <Link
                href="/about"
                className="btn-primary"
              >
                Read Full Story

                <ArrowRight size={16} />
              </Link>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;