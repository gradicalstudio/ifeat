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
      className="inline-block px-9 py-4 rounded-xl leading-tight font-monsterrat font-bold  text-base tracking-light uppercase text-black cursor-pointer"
      style={{ background: "#A59653" }}
    >
      {field?.text}
    </PrismicNextLink>
  );
}