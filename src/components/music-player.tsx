"use client";

import { Button } from "@/components/ui/button";
import { Music2, Play, Pause } from "lucide-react";
import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";

export type MusicPlayerHandle = {
  playMusic: () => void;
};

const MusicPlayer = forwardRef<MusicPlayerHandle>((_props, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // ── Auto-play on first user interaction ───────────────────────
  useEffect(() => {
    if (hasInteracted) return; // only listen until first interaction

    const tryPlay = () => {
      if (hasInteracted) return;
      setHasInteracted(true);

      audioRef.current?.play()
        .then(() => setIsPlaying(true))
        .catch(() => { /* browser blocked — user can click button */ });
    };

    // Any of these counts as a "first interaction"
    const events = ["click", "keydown", "touchstart", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, tryPlay, { once: true, passive: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, tryPlay));
    };
  }, [hasInteracted]);

  // ── Exposed handle (used by hero CTA button) ───────────────────
  useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error("Audio play failed:", err));
      }
    },
  }));

  // ── Manual toggle button ───────────────────────────────────────
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Audio play failed:", err));
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src="hb.webm" loop />
      <div className="flex items-center gap-2 group">
        <p className="text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Our Song 🎶
        </p>
        <Button
          onClick={togglePlayPause}
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
          aria-label="Toggle music"
        >
          {isPlaying
            ? <Pause className="h-5 w-5 text-primary" />
            : <Play  className="h-5 w-5 text-primary" />}
          <span className="sr-only">Toggle Music</span>
        </Button>
      </div>
    </div>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;
