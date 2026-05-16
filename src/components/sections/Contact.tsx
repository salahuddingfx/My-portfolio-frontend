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
    <section id="contact" className="section-shell pt-32 pb-32 bg-[var(--background)] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent)]/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4" />
      
      <div className="container max-w-7xl relative z-10">

        {/* Header - Editorial Style */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-eyebrow text-white/40 mb-6 block">Inquiries</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              Let&apos;s build <br />
              <span className="text-stroke group-hover:text-white transition-all duration-500">something</span> <br />
              <span className="text-[var(--accent)] italic">legendary.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md pb-4"
          >
            <p className="text-lg text-[var(--muted)] leading-relaxed italic border-l-2 border-[var(--accent)]/30 pl-8">
              &quot;Design is not just what it looks like and feels like. Design is how it works.&quot; 
              <span className="block mt-4 text-xs font-mono uppercase tracking-widest text-white/30 not-italic">— Steve Jobs</span>
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-4">
            <div className="space-y-10">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="contact-info-item flex items-center gap-8 group"
                >
                  <div className="contact-info-icon">
                    <card.icon size={22} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--muted-soft)]">
                      {card.label}
                    </p>
                    {card.href ? (
                      <a href={card.href} className="text-lg font-bold text-white hover:text-[var(--accent)] transition-all">
                        {card.value}
                      </a>
                    ) : (
                      <p className="text-lg font-bold text-white">{card.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-20 pt-10 border-t border-[var(--border)]"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted-soft)] mb-6">Social Networks</p>
              <div className="flex gap-6">
                {['LinkedIn', 'Github', 'Twitter', 'Instagram'].map(social => (
                  <a key={social} href="#" className="text-sm font-bold hover:text-[var(--accent)] transition-all uppercase tracking-tighter">
                    {social}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 h-full"
          >
            <div className="contact-card h-full p-10 md:p-16 flex flex-col">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Send a Message.</h3>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30" />)}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-12 flex-grow">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                  <div className="contact-input-group">
                    <input
                      type="text"
                      placeholder=" "
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="contact-input"
                    />
                    <label className="contact-label">Your Full Name</label>
                  </div>

                  <div className="contact-input-group">
                    <input
                      type="email"
                      placeholder=" "
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="contact-input"
                    />
                    <label className="contact-label">Email Address</label>
                  </div>
                </div>

                <div className="contact-input-group">
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="contact-input appearance-none cursor-pointer"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s} className="bg-[#111] p-4">
                        {s}
                      </option>
                    ))}
                  </select>
                  <label className="contact-label">Inquiry Subject</label>
                  <div className="absolute right-0 bottom-2 pointer-events-none text-[var(--muted-soft)]">
                    <ArrowRight size={16} className="rotate-90" />
                  </div>
                </div>

                <div className="contact-input-group flex-grow">
                  <textarea
                    placeholder=" "
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="contact-input resize-none min-h-[120px]"
                  />
                  <label className="contact-label">Project Details</label>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="contact-btn w-full group flex items-center justify-center gap-4"
                  >
                    <span>
                      {status === "sending"
                        ? "Sending..."
                        : status === "success"
                        ? "Message Delivered"
                        : "Initialize Transmission"}
                    </span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  
                  {status === "success" && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mt-6 text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold"
                    >
                      Transmission successful. Response incoming.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <p className="text-center mt-6 text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold">
                      Transmission failed. Check connection.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;