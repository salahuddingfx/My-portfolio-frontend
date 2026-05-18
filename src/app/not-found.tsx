"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, ShieldAlert, ArrowRight } from "lucide-react";

interface LogLine {
  text: string;
  type: "system" | "input" | "output" | "error" | "success";
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
  const terminalEndRef = useRef<HTMLDivElement>(null);

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
          { text: "  [matrix]   - Trigger canvas matrix glitch", type: "success" },
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
        const latencies = [12, 18, 24, 31];
        const randomLatency = latencies[Math.floor(Math.random() * latencies.length)];
        newHistory.push({ text: `PONG: Connection stable. Latency: ${randomLatency}ms. API status: ACTIVE 🟢`, type: "success" });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "matrix":
        setMatrixActive(prev => !prev);
        newHistory.push({ text: matrixActive ? "MATRIX: Glitch canvas disabled." : "MATRIX: Neural digital rain active. Type 'matrix' to disable.", type: matrixActive ? "system" : "success" });
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

  return (
    <section className="min-h-screen bg-[#080808] text-[#a5f3fc] flex items-center justify-center relative overflow-hidden px-6 font-mono selection:bg-[#06b6d4]/30 selection:text-white">
      
      {/* Falling Matrix Grid Animation Overlay */}
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

      {/* Futuristic Scanline Shader Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.3))] bg-[size:100%_4px] pointer-events-none z-20 opacity-40" />

      {/* Cybernetic Aura Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -top-40 -left-40 animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#9333ea]/5 blur-[100px] pointer-events-none -bottom-40 -right-40 animate-pulse" style={{ animationDuration: '9s' }} />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center space-y-8">
        
        {/* Flag Indicator */}
        <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-cyan-400 text-[10px] uppercase tracking-widest animate-pulse">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          SYSTEM SHELL LINK ESTABLISHED // COORDINATES BROKEN
        </div>

        {/* Realistic Cyber Terminal Window */}
        <div className="w-full bg-[#0d151c]/90 border border-cyan-500/35 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col max-h-[500px] backdrop-blur-md">
          
          {/* Terminal Window Header Bar */}
          <div className="px-6 py-4 bg-[#14222c] border-b border-cyan-500/25 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/70 border border-red-500/30" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70 border border-yellow-500/30" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70 border border-emerald-500/30" />
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-cyan-400/80 font-bold">
              <TerminalIcon className="w-3.5 h-3.5" />
              guest@salahuddin.codes: ~
            </div>
            <div className="w-12" /> {/* Balancing Spacer */}
          </div>

          {/* Terminal Output Log Container */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 text-xs md:text-sm leading-relaxed h-[300px]">
            {history.map((line, idx) => (
              <div 
                key={idx} 
                className={`${
                  line.type === "error" 
                    ? "text-red-400" 
                    : line.type === "success" 
                    ? "text-emerald-400" 
                    : line.type === "input" 
                    ? "text-cyan-300 font-bold" 
                    : "text-cyan-500/80"
                }`}
              >
                {line.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Command Input Form */}
          <form 
            onSubmit={handleSubmit} 
            className="p-6 bg-[#0a1015] border-t border-cyan-500/25 flex items-center gap-3"
          >
            <span className="text-cyan-400 font-bold text-xs md:text-sm shrink-0">guest@salahuddin.codes:~$</span>
            <input
              type="text"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your command (e.g. 'help', 'home')..."
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-cyan-300 font-mono text-xs md:text-sm placeholder-cyan-500/40 select-all"
            />
            <button 
              type="submit" 
              className="text-cyan-400 hover:text-white p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/25 transition-all"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Quick Commands Quick Macro Panel */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-cyan-500/70 font-bold">Quick macros:</span>
          {["home", "about", "projects", "contact", "matrix", "ping"].map((macro) => (
            <button
              key={macro}
              onClick={() => handleCommand(macro)}
              className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all duration-300 shadow-md"
            >
              Run: {macro}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
