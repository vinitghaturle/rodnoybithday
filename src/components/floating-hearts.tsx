"use client";

import { useEffect, useState } from "react";

const FloatingHearts = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const hearts = Array.from({ length: 20 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {hearts.map((_, i) => (
        <div
          key={i}
          className="absolute text-primary animate-float"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 10 + 15}s`,
            animationDelay: `-${Math.random() * 25}s`,
            fontSize: `${Math.random() * 1.5 + 0.5}rem`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
        >
          💙
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
