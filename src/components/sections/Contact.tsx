"use client";

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Web Development",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("Missing API URL");

      const res = await fetch(`${apiUrl}/admin/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "Web Development",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-shell relative overflow-hidden bg-black">
      <div className="container relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32 space-y-6">
          <span className="section-kicker mx-auto">Get In Touch</span>
          <h2 className="section-title !mb-0">
            Let&apos;s <span className="text-accent">Connect.</span>
          </h2>
          <p className="section-copy mx-auto">
            Have a project in mind or want to discuss an idea? 
            I&apos;m always open to new opportunities and collaborations.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT: INFO */}
          <div className="lg:col-span-4 space-y-6 lg:space-y-8">
            <div className="premium-card p-8 flex items-center gap-6 border-white/5 bg-white/[0.01]">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 mb-1.5">Email</p>
                <p className="text-[15px] text-white/80 font-bold break-all">salahuddinkadrappy@gmail.com</p>
              </div>
            </div>

            <div className="premium-card p-8 flex items-center gap-6 border-white/5 bg-white/[0.01]">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 mb-1.5">Location</p>
                <p className="text-[15px] text-white/80 font-bold">Cox&apos;s Bazar, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="premium-card p-8 md:p-12 border-white/10 bg-white/[0.02]"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* INPUTS ROW */}
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/10 focus:border-accent/40 focus:bg-white/[0.05] outline-none transition-all duration-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/10 focus:border-accent/40 focus:bg-white/[0.05] outline-none transition-all duration-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* SUBJECT SELECT */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-1">Interested In</label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white appearance-none focus:border-accent/40 focus:bg-white/[0.05] outline-none transition-all duration-500 cursor-pointer"
                    >
                      <option className="bg-[#111]">Web Development</option>
                      <option className="bg-[#111]">UI/UX Design</option>
                      <option className="bg-[#111]">Full Stack Application</option>
                      <option className="bg-[#111]">Other Collaboration</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-1">Message</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/10 focus:border-accent/40 focus:bg-white/[0.05] outline-none transition-all duration-500 resize-none"
                    placeholder="Tell me more about your goals..."
                  />
                </div>

                {/* SUBMIT */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full group py-5 disabled:opacity-50"
                  >
                    <span className="text-[11px] font-black tracking-[0.4em] uppercase">
                      {status === "sending" ? "Dispatching..." : status === "success" ? "Message Dispatched" : "Dispatch Message"}
                    </span>
                    <Send size={18} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>

                  {status === "error" && (
                    <p className="mt-6 text-center text-sm font-bold text-accent/80 uppercase tracking-widest animate-pulse">
                      Connection Failed. Please try again.
                    </p>
                  )}
                  {status === "success" && (
                    <p className="mt-6 text-center text-sm font-bold text-green-400 uppercase tracking-widest">
                      Message Received. I&apos;ll be in touch soon.
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;