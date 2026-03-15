import AnimatedText from "@/components/animated-text";

const LoveMessageSection = () => {
  const message = `Rodnoy,
You make every day brighter, every joke funnier, and every moment better.
Even when you're annoying… you're still my favorite person.`;

  return (
    <section id="love-message" className="bg-card">
      <div className="container mx-auto max-w-3xl text-center">
        <AnimatedText
          text={message}
          el="h2"
          className="font-headline text-3xl md:text-4xl lg:text-5xl !leading-tight text-foreground"
        />
      </div>
    </section>
  );
};

export default LoveMessageSection;
