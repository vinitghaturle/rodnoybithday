"use client";

import { useRef, useState } from "react";
import HeroSection from "@/components/sections/hero-section";
import LoveMessageSection from "@/components/sections/love-message-section";
import PhotoGallerySection from "@/components/sections/photo-gallery-section";
import MusicPlayer, { MusicPlayerHandle } from "@/components/music-player";
import JourneyMapSection from "@/components/sections/journey-map-section";
import WishlistSection from "@/components/sections/wishlist-section";
import FinalSurpriseSection from "@/components/sections/final-surprise-section";
import SurpriseModal from "@/components/surprise-modal";
import Footer from "@/components/footer";

export default function Home() {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  const handleStart = () => {
    musicPlayerRef.current?.playMusic();
  };
  
  return (
    <main className="flex flex-col items-center justify-center">
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
  );
}
