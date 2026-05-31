"use client";

import { useState, useEffect, useRef } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pauseTimer = useRef(null);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      setAtTop(window.scrollY < 105);

      if (diff > 5) {
        // Scrolling down → hide
        setVisible(false);
      } else if (diff < -5) {
        // Scrolling up → show
        setVisible(true);
      }

      lastScrollY.current = currentY;

      // Clear existing pause timer
      clearTimeout(pauseTimer.current);

      // Show after 2s pause
      pauseTimer.current = setTimeout(() => {
        setVisible(true);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(pauseTimer.current);
    };
  }, []);
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Desktop */}
      <div
        className={`hidden lg:flex xl:max-w-385 xl:mx-auto items-center justify-between px-4 xl:px-21 py-5 transition-colors duration-500 ${
          atTop ? "bg-transparent" : "bg-black"
        }`}
      >
        <PrismicNextLink
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <PrismicNextImage
            field={data.logo}
            className="h-8 w-auto mix-blend-difference object-contain"
          />
        </PrismicNextLink>

        <nav className="flex items-center gap-5 xl:gap-8">
          {data.nav_links.map((item, i) => (
            <PrismicNextLink
              key={i}
              field={item}
              onClick={(e) => handleSmoothScroll(e, item?.url)}
              className="font-montserrat lg:text-[10px] xl:text-[13px] font-medium tracking-widest font-raleway uppercase text-[#A2A2A2] hover:text-white transition-colors duration-200"
            >
              {item.text}
            </PrismicNextLink>
          ))}
        </nav>

        <PrismicNextLink
          field={data.cta_link}
          onClick={(e) => handleSmoothScroll(e, data.cta_link?.url)}
          className="px-6 py-3 rounded-lg font-monsterrat font-bold text-[13px] tracking-widest uppercase text-black"
          style={{ background: "#A59653" }}
        >
          {data.cta_link?.text}
        </PrismicNextLink>
      </div>

      {/* Mobile/Tablet */}
      <div
        className={`lg:hidden w-full backdrop-blur-sm transition-colors duration-500 ${
          atTop ? "bg-transparent" : "bg-black/10"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          {/* Hamburger on left */}

          {/* Logo centered */}
          <PrismicNextLink
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <PrismicNextImage
              field={data.logo}
              className="h-7 w-auto mix-blend-difference object-contain"
            />
          </PrismicNextLink>
          <div className="flex gap-4">
            {/* CTA on right */}
            <PrismicNextLink
              field={data.cta_link}
              onClick={(e) => handleSmoothScroll(e, data.cta_link?.url)}
              className="px-4 py-2 rounded-lg font-monsterrat font-bold text-[11px] tracking-widest uppercase text-black"
              style={{ background: "#A59653" }}
            >
              {data.cta_link?.text}
            </PrismicNextLink>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center gap-1.5 w-6"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${menuOpen ? "max-h-125" : "max-h-0"}`}
        >
          <nav className="flex flex-col px-5 pb-6 gap-6 bg-black/80 backdrop-blur-sm">
            {data.nav_links.map((item, i) => (
              <PrismicNextLink
                key={i}
                field={item}
                onClick={(e) => {
                  handleSmoothScroll(e, item?.url);
                  setMenuOpen(false);
                }}
                className="font-raleway text-[13px] font-medium tracking-widest uppercase text-[#A2A2A2] hover:text-white transition-colors duration-200 pt-2 border-t border-white/10"
              >
                {item.text}
              </PrismicNextLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
