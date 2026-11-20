"use client";
import { useEffect, useRef } from "react";

// Container for the "stacking cards" scroll effect (cards are position: sticky).
// Sets --stack-h to the tallest child so every card is the same height; with equal heights
// the stack keeps its staggered strips as it scrolls out, instead of the cards sliding
// past each other. Heights are re-measured whenever a card resizes.
export default function StackedCards({ className, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = [...el.children];
    const measure = () => {
      el.style.removeProperty("--stack-h");
      const tallest = Math.max(...cards.map((c) => c.offsetHeight));
      el.style.setProperty("--stack-h", `${tallest}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
