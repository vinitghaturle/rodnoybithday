"use client";
import FloatingHearts from "@/components/floating-hearts";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

type HeroSectionProps = {
  onStart: () => void;
};

const HeroSection = ({ onStart }: HeroSectionProps) => {
  const handleStartClick = () => {
    onStart();
    const nextSection = document.getElementById("love-message");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <FloatingHearts />
      <div className="relative z-10 space-y-6 animate-fade-in-up">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-foreground drop-shadow-lg">
          Happy 19th Birthday Rodnoy <span className="text-primary">💙</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
          You officially survived 19 years… and somehow still chose me.
        </p>
        <Button size="lg" onClick={handleStartClick} className="shadow-lg transition-transform hover:scale-105">
          Open Your Surprise 🎁
          <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
