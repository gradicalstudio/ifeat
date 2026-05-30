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
      className="inline-block px-9 py-3.5 rounded-xl font-monsterrat font-bold text-base tracking-light uppercase border border-[#FEFFF4] text-[#FEFFF4] cursor-pointer bg-transparent"
    >
      {field?.text}
    </PrismicNextLink>
  );
}
