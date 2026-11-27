"use client";
import { Children, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

// Swipe slider with arrows and dots below md; from md up Embla is switched off
// and `gridClassName` lays the children out as a normal grid.
// `activeColors` (optional) gives the active dot a per-slide CSS background (colour or gradient).
export default function MobileSlider({ children, gridClassName, activeColors }) {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    breakpoints: { "(min-width: 768px)": { active: false } },
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // In dragFree mode Embla only updates its selected index on arrow/dot clicks,
  // not on drags, so the active dot is the snap nearest the live scroll position.
  const sync = useCallback((api) => {
    const progress = api.scrollProgress();
    const nearest = api.scrollSnapList().reduce(
      (best, snap, i, list) =>
        Math.abs(snap - progress) < Math.abs(list[best] - progress) ? i : best,
      0,
    );
    setSelected(nearest);
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!embla) return;
    const init = () => {
      setSnaps(embla.scrollSnapList());
      sync(embla);
    };
    const update = () => sync(embla);
    init();
    embla.on("scroll", update).on("reInit", init);
    return () => embla.off("scroll", update).off("reInit", init);
  }, [embla, sync]);

  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#677479]/80 transition-[color,border-color,scale] duration-200 active:scale-95 hover:border-[#A59653] disabled:opacity-30 disabled:pointer-events-none cursor-pointer";

  return (
    <div>
      <div ref={viewportRef} className="overflow-hidden md:overflow-visible">
        <div className={`flex gap-3 ${gridClassName}`}>
          {Children.map(children, (child) => child)}
        </div>
      </div>

      {snaps.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
          <button
            type="button"
            aria-label="Previous"
            disabled={!canPrev}
            onClick={() => embla?.scrollPrev()}
            className={arrow}
          >
            <img src="/Chevron-dimgold.svg" alt="" className="h-3 w-3 -rotate-90" />
          </button>
          {/* Fixed width (n dots of 8px + one 16px longer active pill + gaps) so the arrows
              don't shift while pills are mid-transition, e.g. when selection changes quickly */}
          <div
            className="flex shrink-0 items-center justify-center gap-2"
            style={{ width: `${snaps.length * 16 + 8}px` }}
            role="tablist"
            aria-label="Slides"
          >
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === selected}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => embla?.scrollTo(i)}
                style={i === selected && activeColors?.[i] ? { background: activeColors[i] } : undefined}
                className={`h-2 shrink-0 rounded-full transition-[width,background-color] duration-300 cursor-pointer ${i === selected ? "w-6 bg-[#A59653]" : "w-2 bg-[#677479]/40"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next"
            disabled={!canNext}
            onClick={() => embla?.scrollNext()}
            className={arrow}
          >
            <img src="/Chevron-dimgold.svg" alt="" className="h-3 w-3 rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
}
