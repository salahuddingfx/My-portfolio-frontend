"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, ShieldAlert, ArrowRight, Activity, Cpu, HardDrive, Wifi } from "lucide-react";
import Link from "next/link";

interface LogLine {
  text: string;
  type: "system" | "input" | "output" | "error" | "success" | "warning";
}

export default function NotFound() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogLine[]>([
    { text: "SYSTEM: Initializing hyper-drive recovery protocol...", type: "system" },
    { text: "CRITICAL: Target coordinates mismatched. 404 Page Not Found.", type: "error" },
    { text: "STATUS: Remote Shell Access established securely.", type: "success" },
    { text: "Type 'help' to review available system operations.", type: "system" },
  ]);
  const [matrixActive, setMatrixActive] = useState(false);
  const [uptime, setUptime] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Uptime counter
  useEffect(() => {
    const timer = setInterval(() => setUptime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll to bottom of console
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Terminal commands interpreter
  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { text: `guest@salahuddin.codes:~$ ${cmd}`, type: "input" as const }];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    switch (trimmed) {
      case "help":
        newHistory.push(
          { text: "┌────────────────────────────────────────┐", type: "system" },
          { text: "  [home]     - Return to landing terminal", type: "system" },
          { text: "  [about]    - Navigate to Salah's background", type: "system" },
          { text: "  [projects] - View creative digital products", type: "system" },
          { text: "  [contact]  - Initiate message handshake", type: "system" },
          { text: "  [matrix]   - Trigger canvas matrix glitch", type: "warning" },
          { text: "  [ping]     - Check system API latency", type: "system" },
          { text: "  [clear]    - Reset screen log history", type: "system" },
          { text: "└────────────────────────────────────────┘", type: "system" }
        );
        break;
      case "home":
        newHistory.push({ text: "REDIRECTING: Initiating jump to Home...", type: "success" });
        setTimeout(() => router.push("/"), 1000);
        break;
      case "about":
        newHistory.push({ text: "REDIRECTING: Navigating to About section...", type: "success" });
        setTimeout(() => router.push("/#about"), 1000);
        break;
      case "projects":
        newHistory.push({ text: "REDIRECTING: Fetching digital products array...", type: "success" });
        setTimeout(() => router.push("/#projects"), 1000);
        break;
      case "contact":
        newHistory.push({ text: "REDIRECTING: Spinning up contact interface...", type: "success" });
        setTimeout(() => router.push("/#contact"), 1000);
        break;
      case "ping":
        const latencies = [12, 18, 24, 31, 42];
        const randomLatency = latencies[Math.floor(Math.random() * latencies.length)];
        newHistory.push({ text: `PONG: Connection stable. Latency: ${randomLatency}ms. API status: ACTIVE 🟢`, type: "success" });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "matrix":
        setMatrixActive(prev => !prev);
        newHistory.push({ text: matrixActive ? "MATRIX: Neural digital rain disabled." : "MATRIX: Neural digital rain active. Type 'matrix' to disable.", type: matrixActive ? "system" : "warning" });
        break;
      default:
        newHistory.push({ text: `ERROR: Command '${cmd}' not recognized. Type 'help' for options.`, type: "error" });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const formatUptime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section className="bg-[var(--background)] flex flex-col relative overflow-hidden font-mono selection:bg-[var(--accent)]/30 selection:text-white" style={{paddingTop: "100px", paddingBottom: "100px", marginLeft: "20px", marginRight: "20px"}}>
      
      {/* Dynamic Background Effects */}
      <AnimatePresence>
        {matrixActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#000_100%)] z-0"
            style={{
              backgroundImage: 'url("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnZzODlsNW95anJ3OGhxNDN2dGthZDRtOXVjZ3BrdmR3N3N0ZzdobCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/X83Y7r03T6zc4/giphy.gif")',
              backgroundSize: 'cover',
            }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.3))] bg-[size:100%_4px] pointer-events-none z-[var(--z-base)] opacity-30" />
      <div className="absolute w-[800px] h-[800px] rounded-full bg-[var(--accent)]/5 blur-[120px] pointer-events-none -top-40 -left-40 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-red-500/5 blur-[100px] pointer-events-none -bottom-40 -right-40 animate-pulse" style={{ animationDuration: '12s' }} />

      {/* Top Navigation / Safe Return */}
      <div className="fixed top-0 left-0 right-0 z-[var(--z-navbar)] w-full  md:p-10 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <ArrowRight size={16} className="text-white group-hover:text-[var(--accent)] rotate-180 transition-colors" />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[var(--muted)] group-hover:text-white transition-colors">Abort & Return Home</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-red-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-black animate-pulse pointer-events-auto">
          <ShieldAlert size={16} />
          <span>Sector Offline</span>
        </div>
      </div>

      <div className="relative z-[var(--z-card)] flex-1 container max-w-7xl mx-auto px-6 pt-40 md:pt-52 lg:pt-64 pb-32 flex flex-col">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Diagnostics & Info */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-8xl md:text-[10rem] font-black text-white tracking-tighter leading-none mb-8" 
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                404
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-[var(--muted)] leading-relaxed font-medium"
              >
                The neural pathway you requested has been severed. Our systems cannot locate the specific data node in this sector.
              </motion.p>
            </div>

            {/* Diagnostics Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-1 p-10 rounded-[2.5rem] bg-[var(--surface)] border border-[var(--border)] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Activity size={100} />
              </div>

              <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent)] mb-8 font-black border-b border-white/5 pb-5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                Diagnostic Report
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                    <span>Status</span>
                  </div>
                  <span className="text-[10px] text-red-500 font-black animate-pulse">CRITICAL</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                    <span>Location</span>
                  </div>
                  <span className="text-[10px] text-white font-bold uppercase">Sector 7-G</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                    <span>Protocol</span>
                  </div>
                  <span className="text-[10px] text-white font-bold uppercase">TCP/IP/NEURAL</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                    <span>Uptime</span>
                  </div>
                  <span className="text-[10px] text-white font-bold tabular-nums">{formatUptime(uptime)}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                    <span>Latency</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">12ms</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Macros */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-5"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted-soft)] font-black pl-2">
                System Jumps:
              </span>
              <div className="flex flex-wrap gap-3">
                {["home", "projects", "contact", "matrix"].map((macro) => (
                  <button
                    key={macro}
                    onClick={() => handleCommand(macro)}
                    className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border border-[var(--border)] bg-white/[0.02] text-[var(--muted)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)]"
                  >
                    {macro}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Terminal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 h-full min-h-[600px] flex flex-col"
          >
            <div className="w-full h-full bg-[var(--surface)]/60 border border-white/10 rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col backdrop-blur-3xl flex-1">
              
              {/* Terminal Header */}
              <div className="px-10 py-7 bg-[var(--surface-2)]/60 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-[var(--accent)] font-black">
                  <TerminalIcon size={16} />
                  <span>Terminal Recovery Environment</span>
                </div>
                <div className="w-12" />
              </div>

              {/* Terminal Body */}
              <div className="flex-1 overflow-y-auto p-10 md:p-16 space-y-5 text-base md:text-lg leading-relaxed font-mono min-h-[450px]">
                {history.map((line, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={idx} 
                    className={`${
                      line.type === "error" 
                        ? "text-red-400 font-bold" 
                        : line.type === "success" 
                        ? "text-emerald-400 font-bold" 
                        : line.type === "warning"
                        ? "text-yellow-400 italic"
                        : line.type === "input" 
                        ? "text-white font-black" 
                        : "text-[var(--muted)] opacity-60"
                    }`}
                  >
                    {line.text}
                  </motion.div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Input */}
              <form 
                onSubmit={handleSubmit} 
                className="p-10 md:p-12 bg-black/20 border-t border-white/5 flex items-center gap-8"
              >
                <div className="flex items-center gap-3 shrink-0 select-none">
                  <span className="text-emerald-500 font-black tracking-tighter">guest</span>
                  <span className="text-white font-bold opacity-20">@</span>
                  <span className="text-[var(--accent)] font-black tracking-tighter">salahuddin</span>
                  <span className="text-white font-bold opacity-20">:</span>
                  <span className="text-yellow-500 font-black">~</span>
                  <span className="text-white font-black">$</span>
                </div>
                <input
                  type="text"
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="awaiting recovery command..."
                  className="flex-1 bg-transparent text-white font-mono text-base md:text-lg placeholder-white/10 select-all !border-0 !outline-none !ring-0 !shadow-none !p-0 !m-0"
                  style={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    padding: '0px',
                    margin: '0px',
                    width: '100%',
                    lineHeight: 'normal'
                  }}
                />
                <button 
                  type="submit" 
                  className="text-white w-14 h-14 rounded-2xl bg-[var(--accent)] shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer flex items-center justify-center"
                >
                  <ArrowRight size={24} strokeWidth={3} />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
