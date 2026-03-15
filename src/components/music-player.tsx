"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Music2, Play, Pause } from "lucide-react";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";

export type MusicPlayerHandle = {
  playMusic: () => void;
};

const MusicPlayer = forwardRef<MusicPlayerHandle>((_props, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Audio autoplay failed:", error);
          // Don't toast, just let the user click to play
        });
      }
    }
  }));
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/02/14/audio_204797116e.mp3" loop />
      <div className="flex items-center gap-2 group">
        <p className="text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Our Song 🎶
        </p>
        <Button onClick={togglePlayPause} variant="outline" size="icon" className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm">
          {isPlaying ? <Pause className="h-5 w-5 text-primary" /> : <Play className="h-5 w-5 text-primary" />}
          <span className="sr-only">Toggle Music</span>
        </Button>
      </div>
    </div>
  );
});
MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;
