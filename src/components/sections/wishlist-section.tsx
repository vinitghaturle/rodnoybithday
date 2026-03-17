import { Card, CardContent } from "@/components/ui/card";
import { Heart, Pizza, Film, Infinity as InfinityIcon } from "lucide-react";

const wishes = [
  {
    title: "More hugs and kisses",
    icon: <Heart className="w-10 h-10 text-accent" />,
  },
  {
    title: "Unlimited meetups",
    icon: <Pizza className="w-10 h-10 text-accent" />,
  },
  {
    title: "Your time forever",
    icon: <InfinityIcon className="w-10 h-10 text-accent" />,
  },
  {
    title: "You will gift me I phone",
    icon: <Film className="w-10 h-10 text-accent" />,
  },
];

interface HeartStamp {
  top?: string; bottom?: string; left?: string; right?: string;
  size: string; opacity: number; emoji: string; delay: string;
}

const STAMPS: HeartStamp[] = [
  // top edge
  { top: "3%",    left: "6%",   size: "1.8rem", opacity: 0.20, emoji: "💙", delay: "0s" },
  { top: "2%",    left: "22%",  size: "1.2rem", opacity: 0.14, emoji: "🩵", delay: "0.4s" },
  { top: "4%",    left: "40%",  size: "2rem",   opacity: 0.18, emoji: "💙", delay: "0.8s" },
  { top: "2%",    left: "58%",  size: "1.1rem", opacity: 0.13, emoji: "🩵", delay: "0.2s" },
  { top: "3%",    left: "75%",  size: "1.6rem", opacity: 0.18, emoji: "💙", delay: "1s"  },
  { top: "2%",    right: "5%",  size: "1.3rem", opacity: 0.15, emoji: "🩵", delay: "0.6s" },
  // bottom edge
  { bottom: "3%", left: "8%",   size: "1.5rem", opacity: 0.18, emoji: "💙", delay: "0.3s" },
  { bottom: "2%", left: "25%",  size: "1rem",   opacity: 0.12, emoji: "🩵", delay: "0.7s" },
  { bottom: "4%", left: "42%",  size: "1.8rem", opacity: 0.16, emoji: "💙", delay: "1.1s" },
  { bottom: "2%", left: "60%",  size: "1.2rem", opacity: 0.14, emoji: "🩵", delay: "0.5s" },
  { bottom: "3%", left: "78%",  size: "1.5rem", opacity: 0.17, emoji: "💙", delay: "0.9s" },
  { bottom: "2%", right: "4%",  size: "1.1rem", opacity: 0.13, emoji: "🩵", delay: "0.1s" },
  // left edge
  { top: "18%",   left: "1%",   size: "1.6rem", opacity: 0.16, emoji: "💙", delay: "0.5s" },
  { top: "37%",   left: "2%",   size: "1.1rem", opacity: 0.12, emoji: "🩵", delay: "1s"  },
  { top: "56%",   left: "1%",   size: "1.8rem", opacity: 0.18, emoji: "💙", delay: "0.3s" },
  { top: "75%",   left: "2%",   size: "1rem",   opacity: 0.11, emoji: "🩵", delay: "0.8s" },
  // right edge
  { top: "20%",   right: "1%",  size: "1.4rem", opacity: 0.15, emoji: "🩵", delay: "0.6s" },
  { top: "40%",   right: "2%",  size: "1.9rem", opacity: 0.18, emoji: "💙", delay: "0.2s" },
  { top: "60%",   right: "1%",  size: "1.1rem", opacity: 0.12, emoji: "🩵", delay: "1.2s" },
  { top: "78%",   right: "2%",  size: "1.5rem", opacity: 0.16, emoji: "💙", delay: "0.4s" },
  // subtle mid-area depth
  { top: "15%",   left: "10%",  size: "0.85rem", opacity: 0.07, emoji: "💙", delay: "0.7s" },
  { top: "70%",   right: "11%", size: "0.9rem",  opacity: 0.07, emoji: "🩵", delay: "0.3s" },
  { bottom: "30%",left: "13%",  size: "0.8rem",  opacity: 0.06, emoji: "💙", delay: "1.1s" },
  { bottom: "25%",right: "12%", size: "0.85rem", opacity: 0.06, emoji: "🩵", delay: "0.9s" },
];

const WishlistSection = () => {
  return (
    <section id="wishlist" className="relative overflow-hidden">

      {/* Decorative heart stamps all around */}
      {STAMPS.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          aria-hidden
          style={{
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
            fontSize: s.size,
            opacity: s.opacity,
            animation: `float-y ${2.8 + (i % 5) * 0.6}s ease-in-out ${s.delay} infinite`,
          }}
        >
          {s.emoji}
        </div>
      ))}

      <div className="relative z-10 container mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl text-foreground">Return Gift I Need 👀</h2>
        <p className="text-lg text-muted-foreground mt-2">Just a few small, totally reasonable requests.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {wishes.map((wish) => (
            <Card key={wish.title} className="group relative overflow-hidden text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card">
              <CardContent className="flex flex-col items-center justify-center gap-4 p-0">
                {wish.icon}
                <p className="font-semibold text-lg text-foreground">{wish.title}</p>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishlistSection;
