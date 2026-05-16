"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send, MessageSquare, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

const SUBJECTS = [
  "Web Development",
  "UI/UX Design",
  "Full Stack Application",
  "Other Collaboration",
];

const Contact = () => {
  const { settings } = useSettings();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Web Development",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus("sending");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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

  const inputClass = (name: string) => `
    w-full bg-white/[0.03] border ${errors[name] ? 'border-red-500/50' : 'border-[var(--border)]'}
    rounded-2xl px-6 py-4
    text-base text-white placeholder:text-[var(--muted-soft)]
    focus:border-[var(--accent)]/60 focus:bg-white/[0.06]
    focus:outline-none
    transition-all duration-300
  `;

  const infoCards = [
    {
      icon: Mail,
      label: "Email",
      value: settings?.email || "salahuddinkaderappy@gmail.com",
      href: `mailto:${settings?.email || "salahuddinkaderappy@gmail.com"}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: settings?.location || "Cox's Bazar, Bangladesh",
      href: null,
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: settings?.whatsapp || "Contact on WhatsApp",
      href: settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}` : "#",
    },
    {
      icon: Phone,
      label: "Phone",
      value: settings?.phone || "Open for calls",
      href: settings?.phone ? `tel:${settings.phone}` : "#",
    },
  ];

  return (
    <section id="contact" className="section-shell pt-40 pb-40 bg-[var(--background)]">
      <div className="container max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="section-eyebrow mb-4 block">Get in touch</span>
          <h2 className="section-heading text-5xl md:text-7xl mt-2 mb-6">
            Let&apos;s build something <span className="text-[var(--accent)] italic">legendary.</span>
          </h2>
          <p className="section-subtext text-lg max-w-2xl mx-auto opacity-60">
            Have a game-changing idea? I&apos;m ready to bring it to life. 
            Reach out via the form or through my direct contact channels.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {infoCards.map((card, idx) => (
              <div key={card.label} className="bg-[var(--surface)] border border-[var(--border)] p-8 rounded-[2rem] flex items-start gap-6 hover:border-[var(--accent)]/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0 border border-[var(--accent)]/20 group-hover:scale-110 transition-transform">
                  <card.icon size={24} className="text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-2">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-lg font-bold text-white hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-lg font-bold text-white">{card.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="bg-[var(--surface)] border border-[var(--border)] p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-black ml-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass('name')}
                      placeholder="Salah Uddin"
                    />
                    {errors.name && <span className="text-[10px] text-red-500 ml-2 font-bold uppercase">{errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-black ml-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass('email')}
                      placeholder="hello@example.com"
                    />
                    {errors.email && <span className="text-[10px] text-red-500 ml-2 font-bold uppercase">{errors.email}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-black ml-2">
                    Service Required
                  </label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`${inputClass('subject')} appearance-none cursor-pointer pr-12`}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s} className="bg-[#111] p-4 text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-black ml-2">
                    Message Details
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Tell me about your vision..."
                  />
                  {errors.message && <span className="text-[10px] text-red-500 ml-2 font-bold uppercase">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-white text-black py-6 rounded-2xl font-black uppercase tracking-tighter text-lg flex items-center justify-center gap-4 hover:bg-[var(--accent)] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] group disabled:opacity-50"
                >
                  <span>
                    {status === "sending"
                      ? "Transmitting..."
                      : status === "success"
                      ? "Success!"
                      : "Launch Message"}
                  </span>
                  <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>

                {status === "error" && (
                  <p className="text-xs font-bold text-red-500 text-center uppercase tracking-widest">
                    Transmission failed. Please retry.
                  </p>
                )}
                {status === "success" && (
                  <p className="text-xs font-bold text-emerald-500 text-center uppercase tracking-widest">
                    Message received. I&apos;ll be in touch.
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