"use client";

import { useState } from "react";
import { Mail, MapPin, Send, MessageSquare, Phone } from "lucide-react";
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
    rounded-xl px-4 py-3
    text-sm text-white placeholder:text-[var(--muted-soft)]
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
    <section id="contact" className="section-shell pt-32 pb-32 bg-[var(--background)]">
      <div className="container max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-eyebrow mb-3 block">Get in touch</span>
          <h2 className="section-heading text-4xl md:text-5xl mt-1 mb-5">
            Let&apos;s build something <span className="text-[var(--accent)] italic">legendary.</span>
          </h2>
          <p className="section-subtext text-base mx-auto opacity-70">
            Have a project in mind? Reach out via the form or my direct channels.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            {infoCards.map((card) => (
              <div key={card.label} className="bg-[var(--surface)] border border-[var(--border)] p-5 rounded-xl flex items-center gap-4 hover:border-[var(--accent)]/30 transition-all group flex-1">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0 border border-[var(--accent)]/20">
                  <card.icon size={18} className="text-[var(--accent)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-[var(--muted)] mb-0.5">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-sm font-bold text-white hover:text-[var(--accent)] transition-colors truncate block"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-white truncate">{card.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8"
          >
            <div className="bg-[var(--surface)] border border-[var(--border)] p-7 md:p-10 rounded-2xl shadow-xl h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent)]/5 blur-[80px] rounded-full pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass('name')}
                      placeholder="Salah Uddin"
                    />
                    {errors.name && <span className="text-[9px] text-red-500 ml-1 font-bold uppercase">{errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass('email')}
                      placeholder="hello@example.com"
                    />
                    {errors.email && <span className="text-[9px] text-red-500 ml-1 font-bold uppercase">{errors.email}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold ml-1">
                    Service Required
                  </label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`${inputClass('subject')} appearance-none cursor-pointer pr-10`}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s} className="bg-[#111] p-4 text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold ml-1">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass('message')} resize-none min-h-[100px]`}
                    placeholder="Tell me about your vision..."
                  />
                  {errors.message && <span className="text-[9px] text-red-500 ml-1 font-bold uppercase">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-white text-black py-3.5 rounded-lg font-bold uppercase tracking-tighter text-sm flex items-center justify-center gap-2 hover:bg-[var(--accent)] hover:text-white transition-all group disabled:opacity-50 mt-2"
                >
                  <span>
                    {status === "sending"
                      ? "Transmitting..."
                      : status === "success"
                      ? "Success!"
                      : "Send Message"}
                  </span>
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {status === "error" && (
                  <p className="text-[10px] font-bold text-red-500 text-center uppercase tracking-widest">
                    Transmission failed. Please retry.
                  </p>
                )}
                {status === "success" && (
                  <p className="text-[10px] font-bold text-emerald-500 text-center uppercase tracking-widest">
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