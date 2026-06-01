"use client";
import { useState, useRef, useEffect } from "react";
import { PrismicRichText } from "@prismicio/react";

function FaqItem({ item, isOpen, onToggle, isFirst }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(isOpen ? "auto" : "0px");

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      setHeight(`${contentRef.current.scrollHeight}px`);
      const timer = setTimeout(() => setHeight("auto"), 300);
      return () => clearTimeout(timer);
    } else {
      setHeight(`${contentRef.current.scrollHeight}px`);
      const timer = setTimeout(() => setHeight("0px"), 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-[#0E1219]/30">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-4 cursor-pointer justify-between py-3 text-left ${
          isFirst ? "lg:pt-0 lg:pb-5 xl:pb-5" : "lg:py-5 xl:py-5"
        }`}
      >
        <span className="font-raleway text-lg md:text-xl lg:text-[25px] font-medium">
          <PrismicRichText field={item.title} />
        </span>
        <img
          src="/Chevron-dimgold.svg"
          alt="chevron"
          className={`shrink-0 transition-transform w-3 h-3 xl:w-5 xl:h-5 duration-500 ease-in-out ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      <div
        ref={contentRef}
        style={{
          height,
          overflow: "hidden",
          transition: "height 300ms ease",
        }}
      >
        <div className="font-raleway pr-3 text-sm md:text-[15px] lg:text-base mb-3 lg:mb-3 xl:mb-5 text-[#0E1219]">
          <PrismicRichText field={item.info} />
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ faqs }) {
  const [openItems, setOpenItems] = useState({ 0: true });

  const toggle = (i) => {
    setOpenItems((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="flex flex-col">
      {faqs.map((item, i) => (
        <FaqItem
          key={i}
          item={item}
          isOpen={!!openItems[i]}
          onToggle={() => toggle(i)}
          isFirst={i === 0}
        />
      ))}
    </div>
  );
}
