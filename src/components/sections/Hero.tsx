"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import Magnetic from "@/components/ui/Magnetic";
import { useSettings } from "@/context/SettingsContext";
import { MobileHeroWave } from "@/components/ui/MobileHeroWave";

const ROLES = [
  "DESIGNER",
  "DEVELOPER",
  "ENGINEER",
  "CREATOR",
  "BUILDER",
  "INNOVATOR",
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const HOLD_AFTER_TYPE = 1800;
const HOLD_AFTER_DELETE = 300;

const TypingRole = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isHolding, setIsHolding] = useState(false);

  const word = ROLES[roleIndex];
  const nextWord = ROLES[(roleIndex + 1) % ROLES.length];
  const charsPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$X?%&*";

  useEffect(() => {
    let iteration = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let deleteInterval: ReturnType<typeof setInterval>;

    const decryptInterval = setInterval(() => {
      setDisplayText(
        word
          .split("")
          .map((letter, index) => {
            if (index < Math.floor(iteration)) {
              return word[index];
            }
            if (letter === " ") return " ";
            return charsPool[Math.floor(Math.random() * charsPool.length)];
          })
          .join("")
      );

      if (iteration >= word.length) {
        clearInterval(decryptInterval);
        setIsHolding(true);

        timeoutId = setTimeout(() => {
          setIsHolding(false);
          let deleteIndex = word.length;

          deleteInterval = setInterval(() => {
            setDisplayText((prev) =>
              prev
                .split("")
                .map((char, index) => {
                  if (index < deleteIndex) {
                    if (char === " ") return " ";
                    return charsPool[Math.floor(Math.random() * charsPool.length)];
                  }
                  return "";
                })
                .join("")
            );
            deleteIndex--;
            if (deleteIndex < 0) {
              clearInterval(deleteInterval);
              setRoleIndex((i) => (i + 1) % ROLES.length);
            }
          }, 35);
        }, HOLD_AFTER_TYPE);
      }

      iteration += 1 / 3.5;
    }, 30);

    return () => {
      clearInterval(decryptInterval);
      clearTimeout(timeoutId);
      clearInterval(deleteInterval);
    };
  }, [roleIndex, word]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", minHeight: "clamp(80px, 12vw, 130px)" }}>
      {/* Typed text */}
      <div style={{ display: "flex", alignItems: "center", minHeight: "clamp(40px, 6vw, 65px)" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: "0",
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-pixel), sans-serif",
              fontSize: "clamp(32px, 5vw, 58px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "0.04em",
              color: "var(--neo-yellow)",
              display: "inline-block",
            }}
          >
            {displayText}
          </span>
          {/* Cursor */}
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "clamp(24px, 4vw, 42px)",
              marginLeft: "6px",
              background: "var(--neo-yellow)",
              animation: "typing-cursor 0.8s steps(2, start) infinite",
              verticalAlign: "middle",
            }}
          />
        </div>
      </div>

      {/* Ghost preview */}
      <div style={{ overflow: "hidden", height: "clamp(18px, 2.5vw, 28px)" }}>
        <span
          style={{
            fontFamily: "var(--font-pixel), sans-serif",
            fontSize: "clamp(16px, 2vw, 22px)",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "0.06em",
            color: "transparent",
            WebkitTextStroke: "1px var(--foreground)",
            opacity: 0.12,
            textTransform: "uppercase",
          }}
        >
          {nextWord}
        </span>
      </div>
    </div>
  );
};

const Hero = () => {
  const { settings } = useSettings();
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 1024);
      if (sessionStorage.getItem("introLoaded") === "true") {
        setIsLoaderFinished(true);
      } else {
        const handleFinished = () => setIsLoaderFinished(true);
        window.addEventListener("intro-loader-finished", handleFinished);
        return () => window.removeEventListener("intro-loader-finished", handleFinished);
      }
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--background)]"
    >
      {/* 3D Robot — background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {isMobile && <MobileHeroWave />}
        {!isMobile && (
          <Spotlight
            className="-top-40 left-0 md:left-[20%] md:-top-20 z-0"
            fill="var(--spotlight-color)"
          />
        )}
        <div className={`absolute -top-[10%] -left-[10%] bg-[var(--accent)]/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0 ${isMobile ? 'w-[30vw] h-[30vw]' : 'w-[50vw] h-[50vw]'}`} />
        <div className={`absolute -bottom-[10%] -right-[10%] bg-[var(--accent)]/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0 ${isMobile ? 'w-[30vw] h-[30vw]' : 'w-[50vw] h-[50vw]'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)]/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0 ${isMobile ? 'w-[50vw] max-w-[300px]' : 'w-[80vw] max-w-[600px] aspect-square'}`} />
        <div className={`absolute inset-0 w-full h-full pointer-events-none md:pointer-events-auto z-10 flex items-center justify-center hero-spline-container ${isMobile ? 'opacity-60' : ''}`}>
          {isLoaderFinished && (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className={`w-full h-full opacity-100 transition-opacity duration-1000 ${isMobile ? 'scale-[0.6]' : 'scale-[0.9] sm:scale-100'}`}
            />
          )}
        </div>
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]" />
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/20" />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", pointerEvents: "none" }} className="landing-section" id="landingDiv">
        <div className="landing-container">
          {/* Left */}
          <div className="landing-intro pointer-events-auto text-left">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", background: "var(--neo-green)", border: "2px solid #000000", borderRadius: "var(--radius-sm)" }} className="animate-pulse" />
              <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                Available for work | @salahuddingfx
              </span>
            </div>
            <h2>Hello! I&apos;m</h2>
            <h1>
              Salah Uddin <span>Kader</span>
            </h1>
            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <p className="hero-bio" style={{ fontSize: "clamp(14px, 1.5vw, 16px)", color: "var(--muted)", lineHeight: 1.7, maxWidth: "24rem", margin: 0 }}>
                {settings?.bio || "I am a Full Stack AI Engineer and Creative Developer specializing in secure full-stack architecture, relational database design (with protection against SQL Injection and other exploits), and custom LLM model integrations. Known online as Saka Chowdhury (@salahuddingfx)."}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", paddingTop: "24px" }}>
                <Magnetic>
                  <a href="#projects" className="btn-primary">
                    Selected Works
                    <ArrowRight size={15} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/contact"
                    style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
                  >
                    Let&apos;s Talk
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="landing-info pointer-events-auto text-left">
            <h3>A Creative</h3>
            <TypingRole />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "none", flexDirection: "column", alignItems: "center", gap: "12px", cursor: "pointer" }}
        className="lg:!flex"
        onClick={() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span style={{ fontSize: "10px", color: "var(--muted-soft)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ position: "relative", width: "22px", height: "34px", border: "2px solid var(--muted-soft)", borderRadius: "10px", display: "flex", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "6px", width: "3px", height: "10px", border: "1px solid var(--muted-soft)", borderRadius: "9999px", overflow: "hidden", opacity: 0.5 }}>
            <div style={{ width: "100%", height: "3px", background: "var(--muted-soft)", borderRadius: "9999px", animation: "mouseScroll 1.5s ease-in-out infinite" }} />
          </div>
        </div>
        <div style={{ width: "1px", height: "2rem", background: "linear-gradient(to bottom, var(--muted-soft), transparent)" }} />
      </div>
    </section>
  );
};

export default Hero;

