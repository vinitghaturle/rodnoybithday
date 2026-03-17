"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

// A reusable card for displaying images
const ImageCard = ({ image }: { image: ImagePlaceholder }) => (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 aspect-[3/4]">
        <Image
            src={image.imageUrl}
            alt={image.description}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint={image.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 md:p-6">
            <p className="text-primary-foreground font-semibold text-lg drop-shadow-md">{image.description}</p>
        </div>
    </div>
);

const PhotoGallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const isMobile = useIsMobile();

  // Autoplay plugin – 3s delay, pauses on interaction
  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Track current slide index for dot indicators
  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    setCurrentIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    onSelect();
    carouselApi.on("select", onSelect);
    return () => { carouselApi.off("select", onSelect); };
  }, [carouselApi, onSelect]);

  const renderSkeletons = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="w-full aspect-[3/4] rounded-lg" />
      ))}
    </div>
  );

  return (
    <section id="photo-gallery" className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl md:text-5xl text-foreground">A Few of My Favorite Moments</h2>
        <p className="text-lg text-muted-foreground mt-2">Just a few reasons why I smile so much.</p>
      </div>

      {!hasMounted ? renderSkeletons() : (
        isMobile ? (
          <div className="flex flex-col items-center gap-4">
            <Carousel
              opts={{ align: "center", loop: true }}
              plugins={[autoplayPlugin.current]}
              setApi={setCarouselApi}
              className="w-full"
            >
              <CarouselContent>
                {PlaceHolderImages.map((image) => (
                  <CarouselItem key={image.id} className="basis-4/5 sm:basis-2/3">
                    <div className="p-1 cursor-pointer" onClick={() => setSelectedImage(image)}>
                      <ImageCard image={image} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {PlaceHolderImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => carouselApi?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  i === currentIndex ? "20px" : "8px",
                    height: "8px",
                    background: i === currentIndex
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground) / 0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
            {PlaceHolderImages.map((image) => (
              <div key={image.id} className="cursor-pointer" onClick={() => setSelectedImage(image)}>
                <ImageCard image={image} />
              </div>
            ))}
          </div>
        )
      )}

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-3xl h-auto sm:h-[80vh] p-0 border-0 bg-card flex flex-col">
            <div className="relative w-full aspect-square sm:aspect-auto sm:flex-1">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.description}
                fill
                className="object-contain"
                data-ai-hint={selectedImage.imageHint}
              />
            </div>
            <DialogHeader className="p-4 text-left border-t mt-auto">
              <DialogTitle className="font-body text-lg">{selectedImage.description}</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default PhotoGallerySection;
