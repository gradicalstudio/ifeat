"use client";
import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";

export default function FaqAccordion({ faqs }) {
  const [openItems, setOpenItems] = useState({ 0: true });

  const toggle = (i) => {
    setOpenItems((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="flex flex-col">
      {faqs.map((item, i) => (
        <div key={i} className="border-b border-[#0E1219]/30">
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between py-5 text-left"
          >
            <span className="font-raleway text-2xl font-medium">
              <PrismicRichText field={item.title} />
            </span>
            <img
              src="/Chevron-dimgold.svg"
              alt="chevron"
              width={20}
              height={20}
              className={`shrink-0 transition-transform duration-500 ease-in-out ${
                openItems[i] ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              openItems[i] ? "max-h-[800px]" : "max-h-0"
            }`}
          >
            <div className="font-raleway text-base text-[#0E1219]">
              <PrismicRichText field={item.info} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}