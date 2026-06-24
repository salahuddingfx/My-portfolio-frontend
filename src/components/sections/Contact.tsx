"use client";

import { useState } from "react";
import { Mail, MapPin, Send, MessageSquare, Phone, ArrowRight } from "lucide-react";
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
    setErrors({});

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
        const data = await res.json().catch(() => ({}));
        if (data?.errors) {
          setErrors(data.errors);
        }
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
    <section id="contact" className="section-shell bg-[var(--background)] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-200 h-200 bg-(--accent)/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-150 h-150 bg-(--accent)/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4" />
      
      <div className="container relative z-10">

        {/* Header - Editorial Style */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-eyebrow mb-6 block">Inquiries</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              Let&apos;s build <br />
              <span className="text-stroke">something</span> <br />
              <span className="text-[var(--neo-yellow)] italic">legendary.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md lg:text-right lg:ml-auto"
          >
            <p className="text-lg text-[var(--muted)] leading-relaxed italic border-l-2 lg:border-l-0 lg:border-r-2 border-[var(--accent)]/30 pl-8 lg:pl-0 lg:pr-8">
              {'"Design is not just what it looks like and feels like. Design is how it works."'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                  style={{ display: 'inline-block', marginRight: '0.25em' }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="block mt-4 text-xs font-mono uppercase tracking-widest text-[var(--foreground)] opacity-30 not-italic"
              >
                — Steve Jobs
              </motion.span>
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-stretch">

          {/* Contact Details Column */}
          <div className="lg:col-span-4 flex flex-col justify-between py-6">
            <div className="flex flex-col" style={{ gap: "clamp(1.5rem, 3vw, 2rem)" }}>
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="contact-info-item flex items-center gap-5 group min-w-0"
                >
                  <div className="contact-info-icon shrink-0">
                    <card.icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col gap-1 overflow-hidden min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-(--muted-soft)">
                      {card.label}
                    </p>
                    {card.href ? (
                      <a href={card.href} className="text-sm sm:text-base font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-all break-words block" style={{ wordBreak: "break-word" }}>
                        {card.value}
                      </a>
                    ) : (
                      <p className="text-sm sm:text-base font-bold text-[var(--foreground)] break-words" style={{ wordBreak: "break-word" }}>{card.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 pt-8"
              style={{ borderTop: "3px solid #000000" }}
            >
              <p className="text-xs font-mono uppercase tracking-widest text-(--muted-soft) mb-5">Social Networks</p>
              <div className="flex flex-wrap" style={{ gap: "clamp(1rem, 2.5vw, 2rem)" }}>
                {['LinkedIn', 'Github', 'Twitter', 'Instagram'].map(social => (
                  <a key={social} href="#" className="text-xs font-bold hover:text-(--accent) transition-all uppercase tracking-widest text-[var(--foreground)] opacity-60">
                    {social}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 w-full min-w-0"
          >
            <div 
              className="contact-card flex flex-col h-full w-full max-w-full"
            >
              {status === "success" ? (
                <div 
                  className="flex flex-col items-center justify-center text-center my-auto py-10"
                  style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  {/* Spatial Brutalist Success Icon */}
                  <div className="w-20 h-20 bg-[var(--neo-green)] border-[3px] border-[#000000] text-[#000000] flex items-center justify-center mb-8 relative shadow-[4px_4px_0px_#000000]" style={{ borderRadius: "var(--radius-md)" }}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="absolute inset-0 border-[2px] border-[var(--neo-green)] animate-ping" style={{ animationDuration: '2s', borderRadius: "var(--radius-md)" }} />
                  </div>

                  <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-3">Delivered.</h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-8">Transmission Complete</p>

                  <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm mb-10">
                    Salah has received your request. The response sequence has been queued and will initialize shortly.
                  </p>

                  <button
                    onClick={() => setStatus("idle")}
                    className="contact-btn w-full py-5 flex items-center justify-center gap-3"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-2xl font-black uppercase tracking-tighter italic">Send a Message.</h3>
                      <div className="w-12 h-1 bg-[var(--neo-yellow)]" style={{ borderRadius: "var(--radius-sm)" }} />
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-[var(--neo-yellow)]" style={{ borderRadius: "var(--radius-sm)" }} />)}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: "clamp(2rem, 4vw, 2.5rem)" }}>
                    <div className="grid md:grid-cols-2" style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                      <div className="contact-input-group">
                        <input
                          type="text"
                          placeholder=" "
                          required
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors(prev => { const c = { ...prev }; delete c.name; return c; });
                          }}
                          className={`contact-input ${errors.name ? '!border-red-500/50' : ''}`}
                        />
                        <label className="contact-label">Your Full Name</label>
                        {errors.name && (
                          <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mt-2">{errors.name}</p>
                        )}
                      </div>

                      <div className="contact-input-group">
                        <input
                          type="email"
                          placeholder=" "
                          required
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors(prev => { const c = { ...prev }; delete c.email; return c; });
                          }}
                          className={`contact-input ${errors.email ? '!border-red-500/50' : ''}`}
                        />
                        <label className="contact-label">Email Address</label>
                        {errors.email && (
                          <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mt-2">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="contact-input-group">
                      <select
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({ ...formData, subject: e.target.value });
                          if (errors.subject) setErrors(prev => { const c = { ...prev }; delete c.subject; return c; });
                        }}
                        className="contact-input cursor-pointer"
                        style={{
                          paddingRight: "48px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                        }}
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s} className="bg-[var(--surface)] text-[var(--foreground)] p-4">
                            {s}
                          </option>
                        ))}
                      </select>
                      <label className="contact-label">Inquiry Subject</label>
                      <div
                        className="pointer-events-none"
                        style={{
                          position: "absolute",
                          right: "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--muted-soft)",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ArrowRight size={16} className="rotate-90" />
                      </div>
                      {errors.subject && (
                        <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mt-2">{errors.subject}</p>
                      )}
                    </div>

                    <div className="contact-input-group">
                      <textarea
                        placeholder=" "
                        required
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors(prev => { const c = { ...prev }; delete c.message; return c; });
                        }}
                        className={`contact-input resize-none min-h-35 ${errors.message ? '!border-red-500/50' : ''}`}
                      />
                      <label className="contact-label">Project Details</label>
                      {errors.message && (
                        <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mt-2">{errors.message}</p>
                      )}
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="contact-btn w-full group flex items-center justify-center gap-4 py-5"
                      >
                        <span className="text-sm">
                          {status === "sending" ? "Sending..." : "Initialize Transmission"}
                        </span>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>

                      {status === "error" && (
                        <p className="text-center mt-6 text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                          Transmission failed. Please try again.
                        </p>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;