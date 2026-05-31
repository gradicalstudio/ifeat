"use client";

import { PrismicNextLink } from "@prismicio/next";

export default function PrimaryButton({ field,className }) {
  const handleClick = (e) => {
    if (field?.url?.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(field.url);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PrismicNextLink
      field={field}
      onClick={handleClick}
      className={`flex items-center justify-center w-full md:w-fit h-full px-3 py-3 md:px-20 lg:px-9 lg:py-4 rounded-xl leading-tight font-monsterrat font-bold text-sm xl:text-base tracking-light uppercase text-black cursor-pointer transition-all duration-300 bg-[#A59653] hover:bg-white border border-[#A59653] hover:border-white ${className}`}
    >
      {field?.text}
    </PrismicNextLink>
  );
}
