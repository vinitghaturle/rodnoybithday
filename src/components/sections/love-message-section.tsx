import AnimatedText from "@/components/animated-text";

interface HeartConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: string;
  opacity: number;
  emoji: string;
}

// Hearts scattered all around — varied sizes, positions, opacities & emojis
const HEARTS: HeartConfig[] = [
  // corners
  { top: "6%", left: "4%", size: "2rem", opacity: 0.30, emoji: "💙" },
  { top: "8%", right: "5%", size: "1.5rem", opacity: 0.25, emoji: "🩵" },
  { bottom: "7%", left: "5%", size: "2.2rem", opacity: 0.28, emoji: "💙" },
  { bottom: "6%", right: "4%", size: "1.8rem", opacity: 0.22, emoji: "🩵" },
  // top band
  { top: "4%", left: "20%", size: "1.2rem", opacity: 0.18, emoji: "💙" },
  { top: "3%", left: "38%", size: "1.8rem", opacity: 0.20, emoji: "🩵" },
  { top: "5%", left: "55%", size: "1.1rem", opacity: 0.16, emoji: "💙" },
  { top: "2%", left: "72%", size: "2rem", opacity: 0.22, emoji: "🩵" },
  // bottom band
  { bottom: "4%", left: "18%", size: "1.4rem", opacity: 0.20, emoji: "💙" },
  { bottom: "5%", left: "35%", size: "1.1rem", opacity: 0.15, emoji: "🩵" },
  { bottom: "3%", left: "52%", size: "1.9rem", opacity: 0.22, emoji: "💙" },
  { bottom: "4%", left: "70%", size: "1.3rem", opacity: 0.18, emoji: "🩵" },
  // left side
  { top: "22%", left: "2%", size: "1.6rem", opacity: 0.20, emoji: "💙" },
  { top: "42%", left: "1%", size: "1.1rem", opacity: 0.15, emoji: "🩵" },
  { top: "62%", left: "3%", size: "1.8rem", opacity: 0.22, emoji: "💙" },
  // right side
  { top: "25%", right: "2%", size: "1.4rem", opacity: 0.18, emoji: "🩵" },
  { top: "45%", right: "1%", size: "2rem", opacity: 0.20, emoji: "💙" },
  { top: "65%", right: "3%", size: "1.2rem", opacity: 0.16, emoji: "🩵" },
  // scattered mid-area (small, very faint, depth feel)
  { top: "18%", left: "12%", size: "0.9rem", opacity: 0.10, emoji: "💙" },
  { top: "30%", right: "14%", size: "0.85rem", opacity: 0.09, emoji: "🩵" },
  { bottom: "28%", left: "11%", size: "0.9rem", opacity: 0.10, emoji: "💙" },
  { bottom: "20%", right: "12%", size: "1rem", opacity: 0.08, emoji: "🩵" },
];

const LoveMessageSection = () => {
  const message = `To my Renuka,
You make every day brighter, every joke funnier, and every moment better.
Even when we are away… you're still my favorite person.`;

  return (
    <section id="love-message" className="relative overflow-hidden">

      {/* ── Love-letter background ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(160deg, hsl(340 80% 97%) 0%, hsl(213 47% 96%) 60%, hsl(176 60% 95%) 100%)",
        }}
      />

      {/* Ruled lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 39px, hsl(213 60% 88% / 0.55) 39px, hsl(213 60% 88% / 0.55) 40px)",
          backgroundSize: "100% 40px",
        }}
      />

      {/* Red margin line */}
      <div
        className="absolute top-0 bottom-0 left-24 md:left-40 w-px pointer-events-none"
        aria-hidden
        style={{ background: "hsl(0 72% 78% / 0.4)" }}
      />

      {/* ── Hearts all around ──────────────────────────────────────── */}
      {HEARTS.map((h, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          aria-hidden
          style={{
            top: h.top,
            bottom: h.bottom,
            left: h.left,
            right: h.right,
            fontSize: h.size,
            opacity: h.opacity,
            animation: `float-y ${3 + (i % 4) * 0.7}s ease-in-out ${(i * 0.25) % 3}s infinite`,
          }}
        >
          {h.emoji}
        </div>
      ))}

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto max-w-3xl text-center">
        <AnimatedText
          text={message}
          el="h2"
          className="font-headline text-3xl md:text-4xl lg:text-5xl !leading-tight text-foreground"
        />
      </div>
    </section>
  );
};

export default LoveMessageSection;
