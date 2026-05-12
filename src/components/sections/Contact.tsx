"use client";

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import PremiumCard from "@/components/ui/PremiumCard";
import { cn } from "@/utils/cn";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Web Development Inquiry",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables.");
      }
      const res = await fetch(`${apiUrl}/admin/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "Web Development Inquiry", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-shell relative overflow-hidden bg-black">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-32 space-y-8">
          <span className="section-kicker mx-auto">Contact</span>
          <h2 className="section-title !mb-0">
            Let&apos;s <span className="text-accent">Connect.</span>
          </h2>
          <p className="section-copy mx-auto">
            Have a project in mind or just want to chat? Feel free to reach 
            out. I&apos;m always open to discussing new opportunities and 
            interesting projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-24 lg:gap-32">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-12">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center bg-white/[0.02] text-white/20 group-hover:text-accent group-hover:border-accent/20 transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-1">Email</p>
                  <p className="font-display font-bold text-lg text-white group-hover:text-accent transition-colors">salauddinkaderappy@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center bg-white/[0.02] text-white/20 group-hover:text-accent group-hover:border-accent/20 transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-1">Location</p>
                  <p className="font-display font-bold text-lg text-white">Cox&apos;s Bazar, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <PremiumCard className="!p-12 md:!p-16 border-white/5 bg-white/[0.01]">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 ml-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-accent/30 transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 ml-1">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-accent/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 ml-1">Inquiry Type</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-accent/30 transition-colors appearance-none"
                  >
                    <option>Web Development</option>
                    <option>UI/UX Design</option>
                    <option>Full Stack Solution</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 ml-1">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Project Details"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-accent/30 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full py-6 flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  <span className="font-display font-bold text-base uppercase tracking-[0.2em]">
                    {status === "sending" ? "Sending..." : status === "success" ? "Sent Successfully" : "Send Message"}
                  </span>
                  <Send size={18} className={cn("transition-transform", status === "idle" && "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                </button>
                {status === "error" && <p className="text-accent text-center text-xs font-mono tracking-widest">ERROR SENDING MESSAGE</p>}
              </form>
            </PremiumCard>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Contact;
