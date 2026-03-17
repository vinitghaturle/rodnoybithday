"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Confetti from "./confetti";
import FloatingHearts from "./floating-hearts";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type SurpriseModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SurpriseModal = ({ isOpen, onClose }: SurpriseModalProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      const timer1 = setTimeout(() => setStep(1), 500); // show confetti
      const timer2 = setTimeout(() => setStep(2), 1500); // show first message
      const timer3 = setTimeout(() => setStep(3), 5000); // show second message
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/80 backdrop-blur-sm border-none shadow-none w-full h-full max-w-full max-h-full flex items-center justify-center p-4 text-center">
        {step >= 1 && <Confetti />}
        {step >= 3 && <FloatingHearts />}

        <div className="z-10 text-primary-foreground space-y-8">
          <p className={cn(
            "font-headline text-3xl md:text-5xl text-white transition-opacity duration-1000 leading-tight",
            step >= 2 ? "opacity-100" : "opacity-0"
          )}>
            Renuka…
            <br />
            You’re not just my Bestfriend.
            <br />
            You’re my favorite notification,
            <br />
            my best memory, and my biggest happiness.
          </p>

          <h1 className={cn(
            "font-headline text-5xl md:text-7xl text-white font-bold transition-opacity duration-1000",
            step >= 3 ? "opacity-100" : "opacity-0"
          )}>
            Always love you ,my future doctor 💙
          </h1>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SurpriseModal;
