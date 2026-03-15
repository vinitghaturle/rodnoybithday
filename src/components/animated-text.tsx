"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  stagger?: number;
};

const AnimatedText = ({ text, el: Wrapper = "p", className, stagger = 0.2 }: AnimatedTextProps) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = wrapperRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const lines = text.split("\n");

  return (
    <Wrapper ref={wrapperRef as any} className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden py-1">
          <span
            className={cn(
              "block transition-transform duration-1000 ease-out",
              inView ? "translate-y-0" : "translate-y-full"
            )}
            style={{
              transitionDelay: `${lineIndex * stagger}s`,
            }}
          >
            {line.trim() ? line : <>&nbsp;</>}
          </span>
        </span>
      ))}
    </Wrapper>
  );
};

export default AnimatedText;
