"use client";

import { PrismicNextLink } from "@prismicio/next";
import { PrismicNextImage } from "@prismicio/next";

function handleSmoothScroll(e, url) {
  if (url?.startsWith("#")) {
    e.preventDefault();
    const el = document.querySelector(url);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function HeaderClient({ data }) {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="max-w-385 mx-auto flex items-center justify-between px-21 py-5 bg-black/10">
        {/* Logo */}
        <PrismicNextLink href="/">
          <PrismicNextImage
            field={data.logo}
            className="h-8 w-auto mix-blend-difference object-contain"
          />
        </PrismicNextLink>

        {/* Nav Links */}
        <nav className="flex items-center gap-8">
          {data.nav_links.map((item, i) => (
            <PrismicNextLink
              key={i}
              field={item}
              onClick={(e) => handleSmoothScroll(e, item?.url)}
              className="font-montserrat text-[13px] font-medium tracking-widest font-raleway uppercase text-[#A2A2A2] hover:text-white transition-colors duration-200 "
            >
              {item.text}
            </PrismicNextLink>
          ))}
        </nav>

        {/* CTA */}
        <PrismicNextLink
          field={data.cta_link}
          onClick={(e) => handleSmoothScroll(e, data.cta_link?.url)}
          className="px-6 py-3 rounded-lg font-monsterrat font-bold text-[13px] tracking-widest uppercase text-black"
          style={{ background: "#A59653" }}
        >
          {data.cta_link?.text}
        </PrismicNextLink>
      </div>
    </header>
  );
}
