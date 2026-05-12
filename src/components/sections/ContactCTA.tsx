"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";

const ContactCTA = () => {
  return (
    <section id="contact" className="section-shell relative overflow-hidden bg-black">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="space-y-6">
            <span className="section-kicker mx-auto">Work With Me</span>
            <h2 className="section-title text-5xl md:text-7xl lg:text-8xl !mb-0 font-bold tracking-tight">
              Have a <span className="text-accent">Business Idea?</span>
            </h2>
            <p className="section-copy mx-auto text-xl md:text-2xl text-white/60">
              Let&apos;s turn your vision into a high-end digital reality. 
              I&apos;m currently available for new projects and collaborations.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
            <Magnetic>
              <Link 
                href="/contact" 
                className="btn-primary px-12 py-8 text-lg group"
              >
                Get In Touch <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>
            
            <div className="flex items-center gap-4 text-white/40 font-mono text-xs uppercase tracking-widest">
              <div className="w-10 h-[1px] bg-white/10" />
              <span>Or Email Me Directly</span>
              <div className="w-10 h-[1px] bg-white/10" />
            </div>

            <a 
              href="mailto:salauddinkaderappy@gmail.com" 
              className="font-display font-bold text-xl text-white hover:text-accent transition-colors flex items-center gap-3"
            >
              <MessageSquare size={20} className="text-accent" />
              salauddinkaderappy@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
