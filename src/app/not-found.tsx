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
    <section className="min-h-screen bg-[var(--background)] flex flex-col relative overflow-hidden font-mono selection:bg-[var(--accent)]/30 selection:text-white">
      
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
      <div className="relative z-[var(--z-navbar)] w-full p-6 md:p-10 flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
              <ArrowRight size={14} className="text-white group-hover:text-[var(--accent)] rotate-180 transition-colors" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-white transition-colors">Abort & Return Home</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-red-500 text-xs uppercase tracking-widest font-bold animate-pulse">
          <ShieldAlert size={14} />
          <span>Sector Offline</span>
        </div>
      </div>

      <div className="relative z-[var(--z-card)] flex-1 container max-w-6xl mx-auto px-6 pb-20 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Diagnostics & Info */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                404
              </h1>
              <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                The neural pathway you requested has been severed or never existed. 
              </p>
            </div>

            {/* Diagnostics Panel */}
            <div className="flex flex-col gap-1 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="text-[10px] uppercase tracking-widest text-[var(--muted-soft)] mb-3 font-bold border-b border-[var(--border)] pb-2">
                System Diagnostics
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <Activity size={12} className="text-[var(--accent)]" />
                  <span>Status</span>
                </div>
                <span className="text-xs text-red-400 font-bold animate-pulse">CRITICAL</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <Wifi size={12} className="text-emerald-400" />
                  <span>Uplink</span>
                </div>
                <span className="text-xs text-white">SECURE</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <Cpu size={12} className="text-[var(--accent)]" />
                  <span>Core Temp</span>
                </div>
                <span className="text-xs text-white">42°C</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <HardDrive size={12} className="text-[var(--accent)]" />
                  <span>Session Uptime</span>
                </div>
                <span className="text-xs text-white">{formatUptime(uptime)}</span>
              </div>
            </div>

            {/* Quick Macros */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-widest text-[var(--muted-soft)] font-bold pl-1">
                Quick Execute:
              </span>
              <div className="flex flex-wrap gap-2">
                {["home", "projects", "contact", "matrix"].map((macro) => (
                  <button
                    key={macro}
                    onClick={() => handleCommand(macro)}
                    className="px-4 py-2 text-[10px] uppercase tracking-wider rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 shadow-md"
                  >
                    ./{macro}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal */}
          <div className="lg:col-span-8 h-full min-h-[500px] flex flex-col">
            <div className="w-full h-full bg-[var(--surface)]/95 border border-[var(--border)] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl flex-1">
              
              {/* Terminal Header */}
              <div className="px-6 py-4 bg-[var(--surface-2)] border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500/30" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500/30" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-500/30" />
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">
                  <TerminalIcon className="w-3.5 h-3.5" />
                  tty1 - admin@salahuddin
                </div>
                <div className="w-12" />
              </div>

              {/* Terminal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-3 text-sm md:text-base leading-relaxed font-mono min-h-[350px]">
                {history.map((line, idx) => (
                  <div 
                    key={idx} 
                    className={`${
                      line.type === "error" 
                        ? "text-red-400" 
                        : line.type === "success" 
                        ? "text-emerald-400" 
                        : line.type === "warning"
                        ? "text-yellow-400"
                        : line.type === "input" 
                        ? "text-white font-semibold" 
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Input */}
              <form 
                onSubmit={handleSubmit} 
                className="p-6 md:p-8 bg-[var(--surface-2)]/50 border-t border-[var(--border)] flex items-center gap-4"
              >
                <span className="text-[var(--accent)] font-bold text-sm md:text-base shrink-0 select-none">
                  guest@salahuddin:~$
                </span>
                <input
                  type="text"
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="enter command..."
                  className="flex-1 bg-transparent text-white font-mono text-sm md:text-base placeholder-[var(--muted-soft)]/50 select-all !border-0 !outline-none !ring-0 !shadow-none !p-0 !m-0"
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
                  className="text-[var(--accent)] hover:text-white p-2.5 rounded-xl bg-[var(--accent)]/10 hover:bg-[var(--accent)] transition-colors shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
