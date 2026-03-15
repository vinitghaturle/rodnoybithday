import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

type FinalSurpriseSectionProps = {
  onOpenSurprise: () => void;
};

const FinalSurpriseSection = ({ onOpenSurprise }: FinalSurpriseSectionProps) => {
  return (
    <section id="final-surprise">
      <div className="container mx-auto text-center space-y-6">
        <h2 className="font-headline text-4xl md:text-5xl text-foreground">One Last Thing...</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Are you ready for your real present?</p>
        <Button size="lg" onClick={onOpenSurprise} className="shadow-lg animate-pulse transition-transform hover:scale-105">
            <Sparkles className="mr-2 h-5 w-5" />
            Click For The Final Surprise
        </Button>
      </div>
    </section>
  );
};

export default FinalSurpriseSection;
