"use client";

import { useState, useRef, useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

export default function PrizeAccordion({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(index === 0 ? "auto" : "0px");

  const positionText = item.position?.[0]?.text?.toLowerCase() ?? "";
  const color = positionText.includes("gold")
    ? "#A59653"
    : positionText.includes("silver")
      ? "#A2A2A2"
      : positionText.includes("bronze")
        ? "#A57953"
        : "#FEFFF4";

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      // Measure actual content height, then animate to it
      setHeight(`${contentRef.current.scrollHeight}px`);
      // After transition, switch to "auto" so it handles dynamic content
      const timer = setTimeout(() => setHeight("auto"), 300);
      return () => clearTimeout(timer);
    } else {
      // Snap from "auto" to measured px so the transition has a start point
      setHeight(`${contentRef.current.scrollHeight}px`);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight("0px"));
      });
    }
  }, [open]);

  return (
    <div className="border-b border-[#0E1219]/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 md:py-4 xl:py-6.25 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <PrismicNextImage field={item.medal_icon} className="w-5 md:w-6" />
          <div className="font-monsterrat text-lg md:text-xl lg:text-[25px] text-[#0E1219]">
            <PrismicRichText field={item.position} />
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          style={{ color }}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        ref={contentRef}
        style={{
          height,
          overflow: "hidden",
          transition: "height 300ms ease",
        }}
      >
        <div className="ml-2 mb-4">
          <PrismicRichText
            field={item.bullet_points}
            components={{
              list: ({ children }) => (
                <ul className="flex flex-col gap-3">{children}</ul>
              ),
              listItem: ({ children }) => (
                <li className="flex items-center gap-2 font-raleway text-sm md:text-[15px] lg:text-base list-none">
                  <span className="w-2 shrink-0" style={{ color }}>●</span>
                  {children}
                </li>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}