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
            className={`w-full flex items-center gap-4 cursor-pointer justify-between py-3  text-left ${i === 0 ? "lg:pt-0 lg:pb-3 xl:pb-5 " : "lg:py-3 xl:py-5"}`}
          >
            <span className="font-raleway text-lg md:text-xl lg:text-[25px] font-medium">
              <PrismicRichText field={item.title} />
            </span>
            <img
              src="/Chevron-dimgold.svg"
              alt="chevron"
              className={`shrink-0 transition-transform w-3 h-3 xl:w-5 xl:h-5 duration-500 ease-in-out ${
                openItems[i] ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              openItems[i] ? "max-h-200" : "max-h-0"
            }`}
          >
            <div className="font-raleway pr-3 text-sm md:text-[15px] lg:text-base mb-3 lg:mb-3 xl:mb-5 text-[#0E1219]">
              <PrismicRichText field={item.info} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
