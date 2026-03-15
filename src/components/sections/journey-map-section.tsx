import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin } from "lucide-react";

const locations = [
  {
    name: "First place we met",
    position: { top: '30%', left: '25%' },
    memory: "Where it all began... I still remember what you were wearing.",
  },
  {
    name: "First date",
    position: { top: '55%', left: '50%' },
    memory: "Nervous, excited, and the best coffee I've ever had.",
  },
  {
    name: "Favorite hangout",
    position: { top: '40%', left: '75%' },
    memory: "Our little corner of the world. So many laughs here.",
  },
];

const JourneyMapSection = () => {
  return (
    <section id="journey-map">
      <div className="container mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl text-foreground">Our Special Places</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">A map of our story, one memory at a time.</p>
        
        <div className="mt-12">
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0 relative aspect-[16/9]">
                <div className="absolute inset-0 bg-gradient-to-br from-background to-blue-100 opacity-50"></div>
                <svg className="absolute inset-0 w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <line x1="25%" y1="30%" x2="50%" y2="55%" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="55%" x2="75%" y2="40%" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
                
                <TooltipProvider delayDuration={0}>
                    {locations.map((loc, index) => (
                    <Tooltip key={loc.name}>
                        <TooltipTrigger asChild>
                            <button className="absolute transform -translate-x-1/2 -translate-y-1/2" style={loc.position}>
                                <MapPin className="w-8 h-8 text-primary drop-shadow-lg transition-transform hover:scale-125 animate-pulse-dot" style={{ animationDelay: `${index * 0.3}s` }} />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="font-semibold">{loc.name}</p>
                            <p className="text-muted-foreground">{loc.memory}</p>
                        </TooltipContent>
                    </Tooltip>
                    ))}
                </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JourneyMapSection;
