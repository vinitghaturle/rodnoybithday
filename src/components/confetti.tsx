"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Confetti = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const confettiPieces = Array.from({ length: 150 });
    const colors = ["bg-primary", "bg-accent", "bg-yellow-400", "bg-pink-400"];

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">
            {confettiPieces.map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "absolute animate-fall",
                        colors[Math.floor(Math.random() * colors.length)]
                    )}
                    style={{
                        left: `${Math.random() * 100}vw`,
                        top: `${Math.random() * -50 - 50}vh`,
                        width: `${Math.random() * 8 + 6}px`,
                        height: `${Math.random() * 8 + 6}px`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                        animationDuration: `${Math.random() * 2 + 3}s`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationTimingFunction: "ease-out",
                        animationFillMode: "forwards",
                    }}
                />
            ))}
        </div>
    );
};

export default Confetti;
