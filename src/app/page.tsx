"use client";

import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/sections/hero-section";
import LoveMessageSection from "@/components/sections/love-message-section";
import PhotoGallerySection from "@/components/sections/photo-gallery-section";
import MusicPlayer, { MusicPlayerHandle } from "@/components/music-player";
import JourneyMapSection from "@/components/sections/journey-map-section";
import WishlistSection from "@/components/sections/wishlist-section";
import FinalSurpriseSection from "@/components/sections/final-surprise-section";
import SurpriseModal from "@/components/surprise-modal";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";

export default function Home() {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate loading for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    musicPlayerRef.current?.playMusic();
  };
  
  return (
    <>
      {isLoading && <Loader />}
      <main className={cn(
        "flex flex-col items-center justify-center transition-opacity duration-1000",
        isLoading ? "opacity-0" : "opacity-100"
      )}>
        <HeroSection onStart={handleStart} />
        <LoveMessageSection />
        <PhotoGallerySection />
        <JourneyMapSection />
        <WishlistSection />
        <FinalSurpriseSection onOpenSurprise={() => setIsSurpriseOpen(true)} />
        <Footer />
        
        <MusicPlayer ref={musicPlayerRef} />
        <SurpriseModal isOpen={isSurpriseOpen} onClose={() => setIsSurpriseOpen(false)} />
      </main>
    </>
  );
}
