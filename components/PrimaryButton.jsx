"use client";

import { PrismicNextLink } from "@prismicio/next";

export default function PrimaryButton({ field }) {
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
      className="inline-block w-full text-center h-full px-3 py-3 xl:px-9 xl:py-4 rounded-xl leading-tight font-monsterrat font-bold  text-sm xl:text-base tracking-light uppercase text-black cursor-pointer border border-[#A59653]"
      style={{ background: "#A59653" }}
    >
      {field?.text}
    </PrismicNextLink>
  );
}