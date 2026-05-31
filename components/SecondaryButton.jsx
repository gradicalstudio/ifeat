"use client";

import { PrismicNextLink } from "@prismicio/next";

export default function SecondaryButton({ field }) {
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
      className="flex items-center justify-center w-full md:w-fit md:px-20 px-3 py-3 lg:px-9 lg:py-4 rounded-xl font-monsterrat font-bold text-sm xl:text-base tracking-light uppercase border border-[#FEFFF4] text-[#FEFFF4] transition-all duration-300 hover:border-black hover:text-black hover:bg-white cursor-pointer bg-transparent"
    >
      {field?.text}
    </PrismicNextLink>
  );
}
