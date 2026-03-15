"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

const PhotoGallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);

  return (
    <section id="photo-gallery" className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl md:text-5xl text-foreground">A Few of My Favorite Moments</h2>
        <p className="text-lg text-muted-foreground mt-2">Just a few reasons why I smile so much.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
        {PlaceHolderImages.map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.imageUrl}
              alt={image.description}
              width={600}
              height={800}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={image.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 md:p-6">
              <p className="text-primary-foreground font-semibold text-lg drop-shadow-md">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-3xl p-0 border-0 bg-card">
            <div className="relative aspect-video w-full">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.description}
                fill
                className="object-contain"
                data-ai-hint={selectedImage.imageHint}
              />
            </div>
            <DialogHeader className="p-6 pt-4 text-left">
              <DialogTitle className="font-body text-xl">{selectedImage.description}</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default PhotoGallerySection;
