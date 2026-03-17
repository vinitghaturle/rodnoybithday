"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FloatingHearts from "@/components/floating-hearts";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

type HeroSectionProps = {
  onStart: () => void;
};

const HeroSection = ({ onStart }: HeroSectionProps) => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleStartClick = () => {
    onStart();
    const nextSection = document.getElementById("love-message");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
      .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden"
    >
      <FloatingHearts />

      {/* Soft radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 50%, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
        {/* Pill badge */}
        <div ref={badgeRef}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
            style={{
              background: "hsl(var(--primary) / 0.1)",
              color: "hsl(var(--primary))",
              border: "1px solid hsl(var(--primary) / 0.25)",
            }}
          >
            <Sparkles className="w-3 h-3" />
            March 18 · A Very Special Day
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.08] tracking-tight text-foreground drop-shadow-sm"
        >
          Happy{" "}
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            20th
          </span>
          {" "}Birthday
          <br />
          Renuka <span className="not-italic" style={{ WebkitTextFillColor: "initial" }}>💙</span>
        </h1>

        {/* Sub copy */}
        <p
          ref={subRef}
          className="text-lg md:text-xl max-w-2xl text-muted-foreground leading-relaxed"
        >
          You officially survived 20 years… and somehow still chose me as your Bestfriend. This little corner of the internet is built just for you.
        </p>

        {/* CTA */}
        <div ref={btnRef} className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Button
            size="lg"
            onClick={handleStartClick}
            className="rounded-full px-8 shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 font-semibold text-base"
            id="hero-open-surprise"
          >
            Open Your Surprise 🎁
            <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
