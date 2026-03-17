"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import FloatingHearts from "@/components/floating-hearts";

const STEP1_LINES = [
  "No random late night talks",
  "No stupid jokes that somehow became funny",
  "No one to annoy you this perfectly",
  "Just a normal, boring life",
];

const STEP3_LINES = [
  "Now life is louder, funnier, and way better",
  "And honestly… I wouldn't trade it for anything",
];

export default function AlternateUniverseSection() {
  const [step, setStep] = useState(0); // 0=idle, 1=dark, 2=transition, 3=bright
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const line1Refs = useRef<(HTMLParagraphElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  // Trigger step 1 when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && step === 0) setStep(1); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [step]);

  // GSAP: animate step 1 lines in
  useEffect(() => {
    if (step !== 1) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(
        line1Refs.current.filter(Boolean),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
        "-=0.3"
      );
  }, [step]);

  // GSAP: step 2 transition text
  useEffect(() => {
    if (step !== 2 || !step2Ref.current) return;
    gsap.fromTo(step2Ref.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.4)" });
  }, [step]);

  // GSAP: step 3 lines fan in
  useEffect(() => {
    if (step !== 3 || !step3Ref.current) return;
    gsap.fromTo(
      step3Ref.current.querySelectorAll(".step3-line"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.18, ease: "power3.out" }
    );
  }, [step]);

  const advance = () => setStep((s) => Math.min(s + 1, 3));

  /* ── gradients per step ─────────────────────────────── */
  const bg = {
    0: "hsl(213 40% 92%)",
    1: "linear-gradient(160deg, hsl(213 47% 88%) 0%, hsl(176 50% 88%) 100%)",
    2: "linear-gradient(160deg, hsl(213 47% 88%) 0%, hsl(176 50% 88%) 100%)",
    3: "linear-gradient(160deg, hsl(213 47% 88%) 0%, hsl(176 50% 88%) 100%)",
  }[step] ?? "";

  const textLight = step >= 1 && step <= 2;

  return (
    <section
      id="alternate-universe"
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center py-24 md:py-36 px-4 transition-all duration-1000"
      style={{ background: bg }}
    >
      {/* Floating hearts only in final state */}
      {step === 3 && <FloatingHearts />}

      {/* Glow rings in transition state */}
      {step === 2 && (
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          aria-hidden
        >
          <div className="w-96 h-96 rounded-full animate-ping-slow opacity-20"
            style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }} />
        </div>
      )}

      {/* Glassmorphism card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-2xl mx-auto rounded-3xl px-8 py-12 md:px-14 md:py-16 text-center transition-all duration-700"
        style={{
          background: textLight ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(18px)",
          border: textLight ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.55)",
          boxShadow: "0 8px 40px rgba(56,143,224,0.12)",
        }}
      >
        {/* ── STEP 1 ── */}
        {step >= 1 && step < 2 && (
          <div className="space-y-6">
            <h2
              ref={titleRef}
              className="font-display text-3xl md:text-5xl font-bold"
              style={{ color: textLight ? "#264871ff" : "var(--foreground)" }}
            >
              If we never met…
            </h2>
            <div className="space-y-3 mt-4">
              {STEP1_LINES.map((line, i) => (
                <p
                  key={i}
                  ref={(el) => { line1Refs.current[i] = el; }}
                  className="text-lg md:text-xl opacity-80"
                  style={{ color: "#264871ff" }}
                >
                  {line}
                </p>
              ))}
            </div>
            <button
              onClick={advance}
              className="mt-8 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:opacity-90"
              style={{ background: "hsl(var(--primary))", color: "#fff", boxShadow: "0 4px 20px hsl(var(--primary)/0.4)" }}
            >
              But wait… →
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div ref={step2Ref} className="space-y-8">
            <h2
              className="font-display text-4xl md:text-6xl font-extrabold"
              style={{ color: "#264871ff", textShadow: "0 0 40px hsl(var(--primary)/0.6)" }}
            >
              But we did…
            </h2>
            <button
              onClick={advance}
              className="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.2)", color: "#0077d8ff", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              And then… →
            </button>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div ref={step3Ref} className="space-y-5">
            <h2 className="step3-line font-display text-3xl md:text-5xl font-bold text-foreground">
              And everything changed
            </h2>
            {STEP3_LINES.map((line) => (
              <p key={line} className="step3-line text-lg md:text-xl text-muted-foreground">
                {line}
              </p>
            ))}
            <p
              className="step3-line font-display text-2xl md:text-3xl font-extrabold mt-6"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              You&apos;re my favorite reality 💙
            </p>
          </div>
        )}

        {/* Idle state placeholder so card has height before scroll */}
        {step === 0 && <div className="h-40" />}
      </div>
    </section>
  );
}
