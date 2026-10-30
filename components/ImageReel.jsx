"use client";
import { useEffect, useRef, useState } from "react";
import { PrismicNextImage } from "@prismicio/next";

// Drift speed in px per second
const SPEED = 60;

// Fisher-Yates shuffle, returns a new array
const shuffle = (list) => {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export default function ImageReel({ images: sourceImages }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const offset = useRef(0);
  const setWidth = useRef(0);
  const drag = useRef(null);
  const [copies, setCopies] = useState(2);
  const [dragging, setDragging] = useState(false);
  const [images, setImages] = useState(sourceImages);

  // Shuffle after mount so server and client markup match, new order per visit
  useEffect(() => {
    const frame = requestAnimationFrame(() => setImages(shuffle(sourceImages)));
    return () => cancelAnimationFrame(frame);
  }, [sourceImages]);

  // Measure one set of images and render enough copies to always fill the screen
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const width = track.scrollWidth / copies;
      if (!width) return;
      setWidth.current = width;
      const needed = Math.max(2, Math.ceil(viewport.offsetWidth / width) + 1);
      if (needed !== copies) setCopies(needed);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, [copies]);

  // Drift loop, pauses while the reel is held
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame;
    let last = performance.now();

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!drag.current && !reduceMotion) offset.current -= SPEED * dt;

      // Wrap the offset into one set's width so the loop is seamless
      const width = setWidth.current;
      if (width) {
        offset.current = ((offset.current % width) - width) % width;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offset.current}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, offset: offset.current };
    setDragging(true);
  };

  const onPointerMove = (e) => {
    if (!drag.current) return;
    offset.current = drag.current.offset + (e.clientX - drag.current.x);
    drag.current = { x: e.clientX, offset: offset.current };
  };

  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
  };

  return (
    <div
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`overflow-hidden touch-pan-y select-none ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copies }).map((_, copy) =>
          images.map((image, i) => (
            <div
              key={`${copy}-${i}`}
              aria-hidden={copy > 0}
              className="shrink-0 pr-2 md:pr-4 h-65 md:h-90 xl:h-112.5"
            >
              <PrismicNextImage
                field={image}
                draggable={false}
                alt={copy > 0 ? "" : undefined}
                // Rough rendered width so the browser picks a small version
                sizes="(min-width: 1280px) 800px, (min-width: 768px) 640px, 470px"
                className="h-full w-auto  pointer-events-none"
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
