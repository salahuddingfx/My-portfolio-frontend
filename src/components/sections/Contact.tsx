"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

const INFO_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: "salahuddinkaderappy@gmail.com",
    href: "mailto:salahuddinkaderappy@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Cox's Bazar, Bangladesh",
    href: null,
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Open to new projects",
    href: null,
  },
];

const SUBJECTS = [
  "Web Development",
  "UI/UX Design",
  "Full Stack Application",
  "Other Collaboration",
];

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
        setFormData({ name: "", email: "", subject: "Web Development", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = `
    w-full bg-white/[0.03] border border-[var(--border)]
    rounded-[var(--radius-md)] px-4 py-3
    text-sm text-white placeholder:text-[var(--muted-soft)]
    focus:border-[var(--accent)]/40 focus:bg-white/[0.05]
    focus:outline-none
    transition-colors duration-200
  `;

  return (
    <section id="contact" className="section-shell pt-32 bg-[var(--background)]">
      <div className="container">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14"
        >
          <span className="section-eyebrow">Get in touch</span>
          <h1 className="section-heading mt-1 mb-3">
            Let&apos;s connect.
          </h1>
          <p className="section-subtext text-sm">
            Have a project in mind or want to discuss an idea? I&apos;m always open
            to new opportunities and conversations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            {INFO_CARDS.map((card) => (
              <div key={card.label} className="card flex items-start gap-4 p-5">
                <div className="w-9 h-9 rounded-[var(--radius-md)] bg-white/[0.04] border border-[var(--border)] flex items-center justify-center shrink-0">
                  <card.icon size={16} className="text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-medium text-[var(--muted-soft)] mb-0.5">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-sm text-white hover:text-[var(--accent)] transition-colors duration-200 break-all"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-sm text-white">{card.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="lg:col-span-8"
          >
            <div className="card p-7 md:p-9">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Name + Email row */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-[var(--muted-soft)] font-medium">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-[var(--muted-soft)] font-medium">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-[var(--muted-soft)] font-medium">
                    Interested in
                  </label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} className="bg-[#111]">{s}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-[var(--muted-soft)] font-medium">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {status === "sending"
                      ? "Sending..."
                      : status === "success"
                      ? "Message sent!"
                      : "Send message"}
                  </span>
                  <Send size={15} />
                </button>

                {/* Status messages */}
                {status === "error" && (
                  <p role="alert" className="text-sm text-[var(--accent)] text-center">
                    Something went wrong. Please try again.
                  </p>
                )}
                {status === "success" && (
                  <p role="status" className="text-sm text-emerald-400 text-center">
                    Thanks! I&apos;ll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;