"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Heart = { id: number; x: number; duration: number };
type Phase = "idle" | "playing" | "ended";

const GAME_DURATION = 10; // seconds
const SPAWN_INTERVAL = 600; // ms

const MESSAGES = [
  { min: 0,  max: 4,  text: "Okay… you missed some, but I still love you 😌" },
  { min: 5,  max: 8,  text: "Not bad… you're getting there 💙" },
  { min: 9,  max: Infinity, text: "Damn… you really caught all my love 💙" },
];

function getMsg(score: number) {
  return MESSAGES.find((m) => score >= m.min && score <= m.max)?.text ?? "";
}

export default function CatchHeartsSection() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const nextId = useRef(0);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const endGame = useCallback(() => {
    clearInterval(spawnRef.current!);
    clearInterval(timerRef.current!);
    setHearts([]);
    setPhase("ended");
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setHearts([]);
    nextId.current = 0;
    setPhase("playing");
  };

  const resetGame = () => {
    setPhase("idle");
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setHearts([]);
  };

  // Spawn hearts
  useEffect(() => {
    if (phase !== "playing") return;
    spawnRef.current = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        { id: nextId.current++, x: Math.random() * 85 + 5, duration: 2.5 + Math.random() * 1.5 },
      ]);
    }, SPAWN_INTERVAL);
    return () => clearInterval(spawnRef.current!);
  }, [phase]);

  // Countdown
  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { endGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase, endGame]);

  const catchHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((s) => s + 1);
  };

  // Remove hearts that have fallen off screen (can't click)
  const removeHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <section id="catch-hearts" className="relative overflow-hidden py-20 md:py-28 px-4"
      style={{ background: "linear-gradient(160deg, hsl(340 80% 97%) 0%, hsl(213 47% 96%) 60%, hsl(176 60% 95%) 100%)" }}
    >
      {/* Section header */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground">
          Catch the Love 💙
        </h2>
        <p className="text-muted-foreground text-lg mt-2">
          Let&apos;s see if you can catch all my love
        </p>
      </div>

      {/* Game arena */}
      <div className="relative z-10 mx-auto max-w-lg">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            height: "380px",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 8px 40px rgba(56,143,224,0.10)",
          }}
        >
          {/* Score + Timer bar */}
          {phase === "playing" && (
            <div className="absolute top-3 left-0 right-0 flex justify-between items-center px-5 z-20">
              <span
                className="text-sm font-bold px-3 py-1 rounded-full"
                style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}
              >
                Score: {score}
              </span>
              <span
                className="text-sm font-bold px-3 py-1 rounded-full tabular-nums"
                style={{
                  background: timeLeft <= 3 ? "hsl(0 84% 60%/0.15)" : "hsl(var(--accent)/0.12)",
                  color: timeLeft <= 3 ? "hsl(0 84% 50%)" : "hsl(var(--accent))",
                  transition: "all 0.3s",
                }}
              >
                {timeLeft}s
              </span>
            </div>
          )}

          {/* Falling hearts */}
          {phase === "playing" && hearts.map((h) => (
            <button
              key={h.id}
              onClick={() => catchHeart(h.id)}
              onAnimationEnd={() => removeHeart(h.id)}
              className="absolute text-3xl cursor-pointer border-none bg-transparent p-0 hover:scale-125 active:scale-90 transition-transform"
              style={{
                left: `${h.x}%`,
                top: "-40px",
                animation: `fall-heart ${h.duration}s linear forwards`,
                filter: "drop-shadow(0 0 8px hsl(var(--primary)/0.7))",
                zIndex: 10,
              }}
              aria-label="Catch heart"
            >
              💙
            </button>
          ))}

          {/* IDLE screen */}
          {phase === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
              <p className="text-5xl animate-float-y">💙</p>
              <p className="text-muted-foreground text-base">
                Hearts will fall from above — tap them before they disappear!
              </p>
              <button onClick={startGame} className="btn-pill px-8 py-3 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-all hover:-translate-y-0.5"
                style={{ background: "hsl(var(--primary))", boxShadow: "0 4px 20px hsl(var(--primary)/0.35)" }}>
                Start Game 💙
              </button>
            </div>
          )}

          {/* ENDED screen */}
          {phase === "ended" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 text-center">
              <p className="text-5xl">🎉</p>
              <p className="font-display text-xl font-bold text-foreground">
                You caught <span style={{ color: "hsl(var(--primary))" }}>{score}</span> hearts!
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                {getMsg(score)}
              </p>
              <p
                className="font-display font-bold text-lg mt-1"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Real game is… you already have all my love 💙
              </p>
              <button onClick={resetGame}
                className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold border transition-all hover:-translate-y-0.5"
                style={{ borderColor: "hsl(var(--primary)/0.4)", color: "hsl(var(--primary))" }}
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Inject fall-heart keyframe */}
      <style>{`
        @keyframes fall-heart {
          0%   { transform: translateY(0)    scale(1); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(440px) scale(0.8); opacity: 0; }
        }
        .animate-float-y {
          animation: float-y 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
