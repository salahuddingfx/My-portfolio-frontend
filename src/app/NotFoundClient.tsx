"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, ShieldAlert, ArrowRight, Activity, Cpu, HardDrive, Wifi } from "lucide-react";
import Link from "next/link";

interface LogLine {
  text: string;
  type: "system" | "input" | "output" | "error" | "success" | "warning";
}

/* =============================================================================
   MATRIX RAIN CANVAS COMPONENT
   ============================================================================= */
const MatrixRain = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Code rain characters: binary, glitch glyphs, and custom words
    const chars = "01404☠☣⚡DEBUGERRORCRITICALSYSTEMUNREACHABLE";
    const charArr = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops: number[] = Array(columns).fill(1);

    // Fetch calculated CSS variables for theme consistency
    const getAccentColor = () => {
      if (typeof window !== "undefined") {
        const computed = getComputedStyle(document.documentElement);
        const color = computed.getPropertyValue("--accent").trim();
        return color || "#a855f7"; // default to purple accent
      }
      return "#a855f7";
    };

    const accentColor = getAccentColor();

    const draw = () => {
      // Create fading tail trail effect
      ctx.fillStyle = "rgba(8, 8, 8, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px var(--font-mono)`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArr[Math.floor(Math.random() * charArr.length)];

        // Random head highlight or alpha variation
        const rand = Math.random();
        if (rand > 0.98) {
          ctx.fillStyle = "#ffffff"; // Glowing drop header
        } else if (rand > 0.85) {
          ctx.fillStyle = "#d8b4fe"; // Accent soft glow (light violet)
        } else {
          ctx.fillStyle = accentColor;
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        // Reset drops once they hit the bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.16 }}
    />
  );
};

/* =============================================================================
   MAIN 404 COMPONENT
   ============================================================================= */
export default function NotFoundClient() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogLine[]>([
    { text: "SYSTEM: Initializing hyper-drive recovery protocol...", type: "system" },
    { text: "CRITICAL: Target coordinates mismatched. 404 Page Not Found.", type: "error" },
    { text: "STATUS: Remote Shell Access established securely.", type: "success" },
    { text: "Type 'help' or click macros to review available system operations.", type: "system" },
  ]);
  const [matrixActive, setMatrixActive] = useState(true);
  const [uptime, setUptime] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Uptime counter
  useEffect(() => {
    const timer = setInterval(() => setUptime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll to bottom of console
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const formatUptime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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
          { text: "  [neofetch] - Run system hardware survey", type: "success" },
          { text: "  [matrix]   - Toggle canvas digital rain", type: "warning" },
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
        setMatrixActive((prev) => !prev);
        newHistory.push({
          text: !matrixActive
            ? "MATRIX: Neural digital rain active. Type 'matrix' to disable."
            : "MATRIX: Neural digital rain disabled.",
          type: !matrixActive ? "warning" : "system",
        });
        break;
      case "neofetch":
      case "sysinfo":
        newHistory.push(
          { text: "   .-.      salahuddin@codes", type: "success" },
          { text: "  (   )     ────────────────", type: "system" },
          { text: "   `-'      OS: Salah OS v1.1.0 (Next.js)", type: "system" },
          { text: "            Kernel: React 19 + Tailwind v4", type: "system" },
          { text: "            Uptime: " + formatUptime(uptime) + " mins", type: "system" },
          { text: "            Shell: Bash-like Recovery Terminal", type: "system" },
          { text: "            IDE: Cursor / VS Code", type: "system" },
          { text: "            Host: Render (HTTPS Port 443)", type: "system" },
          { text: "            Mailing: Resend API Integration", type: "warning" },
          { text: "            ", type: "system" },
          { text: "            Skills: Full Stack, Digital Architecture", type: "success" },
          { text: "            Core: Node.js, React, Tailwind, Three.js", type: "success" }
        );
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
    <section className="is-404-page min-h-screen w-full bg-[var(--background)] flex items-center justify-center relative overflow-hidden font-mono selection:bg-[var(--accent)]/30 selection:text-white py-24 px-4 sm:px-6 lg:px-8">
      {/* Canvas Matrix Code Rain Background */}
      {matrixActive && <MatrixRain active={matrixActive} />}

      {/* Grid Scanlines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.3))] bg-[size:100%_4px] pointer-events-none z-[var(--z-base)] opacity-20" />
      <div
        className="absolute w-[800px] h-[800px] rounded-full bg-[var(--accent)]/5 blur-[120px] pointer-events-none -top-40 -left-40 animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-red-500/5 blur-[100px] pointer-events-none -bottom-40 -right-40 animate-pulse"
        style={{ animationDuration: "12s" }}
      />

      {/* Top Header Controls / Safe Return */}
      <div className="fixed top-0 left-0 right-0 z-[var(--z-navbar)] w-full p-6 md:p-10 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <ArrowRight
                size={16}
                className="text-white group-hover:text-[var(--accent)] rotate-180 transition-colors"
              />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[var(--muted)] group-hover:text-white transition-colors">
              Abort & Return Home
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-red-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-black animate-pulse pointer-events-auto">
          <ShieldAlert size={16} />
          <span>Sector Offline</span>
        </div>
      </div>

      <div className="relative z-[var(--z-card)] w-full max-w-7xl mx-auto flex flex-col pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
          {/* Left Column: Diagnostics & Info */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8 h-full">
            <div>
              <h1
                className="text-7xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-none mb-6"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                404
              </h1>
              <p
                className="text-base md:text-lg text-[var(--muted)] leading-relaxed font-medium"
              >
                The neural pathway you requested has been severed. Our systems cannot locate the specific data node in this sector.
              </p>
            </div>

            {/* Diagnostics Panel */}
            <div
              className="flex flex-col gap-1 p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.02]">
                <Activity size={100} />
              </div>

              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--accent)] mb-6 font-black border-b border-white/5 pb-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                Diagnostic Report
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                    <Activity size={14} className="text-red-500 shrink-0" />
                    <span>Status</span>
                  </div>
                  <span className="text-[10px] text-red-500 font-black animate-pulse">CRITICAL</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                    <HardDrive size={14} className="text-[var(--accent)] shrink-0" />
                    <span>Location</span>
                  </div>
                  <span className="text-[10px] text-white font-bold uppercase">Sector 404-G</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                    <Cpu size={14} className="text-[var(--accent)] shrink-0" />
                    <span>Protocol</span>
                  </div>
                  <span className="text-[10px] text-white font-bold uppercase">HTTPS/RESEND</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                    <Wifi size={14} className="text-emerald-400 shrink-0" />
                    <span>Connection</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">SECURE 443</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                    <Activity size={14} className="text-yellow-500 shrink-0" />
                    <span>Uptime</span>
                  </div>
                  <span className="text-[10px] text-white font-bold tabular-nums">{formatUptime(uptime)}</span>
                </div>
              </div>
            </div>

            {/* Quick Macros */}
            <div
              className="flex flex-col gap-4"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted-soft)] font-black pl-2">
                System Jumps:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {["home", "projects", "contact", "neofetch", "matrix"].map((macro) => (
                  <button
                    key={macro}
                    onClick={() => handleCommand(macro)}
                    className="px-4 md:px-5 py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-[var(--border)] bg-white/[0.01] text-[var(--muted)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(168,85,247,0.15)] cursor-pointer"
                  >
                    {macro}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal */}
          <div
            className="lg:col-span-8 flex flex-col"
          >
            <div className="w-full flex-1 bg-[var(--surface)]/50 border border-white/10 rounded-2xl md:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col backdrop-blur-3xl min-h-[480px] md:min-h-[560px]">
              {/* Terminal Header */}
              <div className="px-6 md:px-10 py-5 md:py-6 bg-[var(--surface-2)]/50 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-3.5 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--accent)] font-black">
                  <TerminalIcon size={14} className="shrink-0" />
                  <span>Terminal Recovery Environment</span>
                </div>
                <div className="w-8 hidden sm:block" />
              </div>

              {/* Terminal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-4 text-xs md:text-sm leading-relaxed font-mono min-h-[300px]">
                {history.map((line, idx) => (
                  <div
                    key={idx}
                    className={`whitespace-pre-wrap ${
                      line.type === "error"
                        ? "text-red-400 font-bold"
                        : line.type === "success"
                        ? "text-emerald-400 font-bold"
                        : line.type === "warning"
                        ? "text-yellow-400 italic"
                        : line.type === "input"
                        ? "text-white font-black"
                        : "text-[var(--muted)] opacity-75"
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
                className="p-5 md:p-8 bg-black/20 border-t border-white/5 flex items-center gap-4 md:gap-6"
              >
                <div className="flex items-center gap-1.5 shrink-0 select-none text-[10px] md:text-xs">
                  <span className="text-emerald-400 font-black">guest</span>
                  <span className="text-white opacity-20">@</span>
                  <span className="text-[var(--accent)] font-black">salahuddin</span>
                  <span className="text-white opacity-20">:</span>
                  <span className="text-yellow-500 font-black">~</span>
                  <span className="text-white font-black">$</span>
                </div>
                <input
                  type="text"
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="awaiting recovery command..."
                  className="flex-1 bg-transparent text-white font-mono text-xs md:text-sm placeholder-white/10 select-all !border-0 !outline-none !ring-0 !shadow-none !p-0 !m-0"
                  style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    background: "transparent",
                    padding: "0px",
                    margin: "0px",
                    width: "100%",
                    lineHeight: "normal",
                  }}
                />
                <button
                  type="submit"
                  className="text-white w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[var(--accent)] shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer flex items-center justify-center"
                >
                  <ArrowRight size={18} strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
