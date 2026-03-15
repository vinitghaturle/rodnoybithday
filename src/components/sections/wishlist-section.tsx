import { Card, CardContent } from "@/components/ui/card";
import { Heart, Pizza, Film, Infinity as InfinityIcon } from "lucide-react";

const wishes = [
  {
    title: "More hugs",
    icon: <Heart className="w-10 h-10 text-accent" />,
  },
  {
    title: "Unlimited pizza dates",
    icon: <Pizza className="w-10 h-10 text-accent" />,
  },
  {
    title: "Your time forever",
    icon: <InfinityIcon className="w-10 h-10 text-accent" />,
  },
  {
    title: "A movie night every week",
    icon: <Film className="w-10 h-10 text-accent" />,
  },
];

const WishlistSection = () => {
  return (
    <section id="wishlist">
      <div className="container mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl text-foreground">Birthday Wishlist 👀</h2>
        <p className="text-lg text-muted-foreground mt-2">Just a few small, totally reasonable requests.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {wishes.map((wish) => (
            <Card key={wish.title} className="text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card">
              <CardContent className="flex flex-col items-center justify-center gap-4 p-0">
                {wish.icon}
                <p className="font-semibold text-lg text-foreground">{wish.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishlistSection;
