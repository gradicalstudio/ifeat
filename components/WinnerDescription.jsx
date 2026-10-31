"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { getCountryFlag } from "@/utils/countryFlag";

// Name links change colour on hover so they read as clickable
const nameLinkHover =
  "[&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-[#A59653]";

// Clamped winner description with a "Read more" button that opens the full card in a modal
export default function WinnerDescription({
  item,
  link,
  medalStyle,
  medalDotStyle,
}) {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Only show "Read more" when the clamp actually hides text
  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const check = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause Lenis and listen for Escape while the modal is open
  useEffect(() => {
    if (!isOpen) return;
    window.lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    // Without a learn-more row below, keep the same breathing room before the next card
    <div
      className={`font-raleway text-sm md:text-[15px] lg:text-base mt-7.5 flex-1 ${isFilled.link(link) ? "" : "pb-5"}`}
    >
      <div ref={textRef} className="line-clamp-4">
        <PrismicRichText field={item.description} />
      </div>
      {isTruncated && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-2 cursor-pointer underline underline-offset-4 text-[#A59653] hover:text-[#263B33] transition-colors duration-300"
        >
          Read more
        </button>
      )}

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 animate-dropdown"
            onClick={() => setIsOpen(false)}
          >
            {/* Outer frame clips to the rounded corners and holds the close button,
                so the button stays put while the inner content scrolls */}
            <div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-2xl max-h-[85dvh] md:max-h-[90dvh] overflow-hidden rounded-xl bg-[#FEFFF4] font-raleway font-medium"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="absolute top-2 right-2 md:top-3 md:right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#0E1219] shadow-md transition-colors duration-300 hover:bg-[#A59653] hover:text-white"
              >
                <svg
                  viewBox="0 0 14 14"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div
                data-lenis-prevent
                className="modal-scroll w-full overflow-y-auto p-5 pt-14 md:p-8 md:pr-6"
              >
                <div className="relative h-60 md:h-79.25">
                  <PrismicNextImage
                    field={item.image}
                    className="object-cover w-full h-full rounded-xl"
                  />
                  {item.country && (
                    <div className="absolute bottom-4.25 items-center justify-center font-medium text-[10px] left-4 bg-white rounded-full px-2 py-1 flex gap-1">
                      {getCountryFlag(item.country) && (
                        <img
                          src={getCountryFlag(item.country)}
                          className="w-4.5 h-3 rounded-[2px] object-cover ring-1 ring-black/10"
                          alt={item.country}
                        />
                      )}
                      <span className="tracking-wider leading-3">
                        {item.country}
                      </span>
                    </div>
                  )}
                </div>

                {item.position && (
                  <div
                    className={`mt-3 xl:mt-5 inline-flex items-center gap-2 rounded-full border px-2 py-0.5 ${medalStyle}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${medalDotStyle}`}
                    ></span>
                    <span className="text-xs md:text-[13px] lg:text-sm font-medium tracking-wider uppercase">
                      {item.position}
                    </span>
                  </div>
                )}

                <div
                  className={`winner-name text-lg md:text-xl lg:text-[25px] mt-3 xl:mt-5 ${nameLinkHover}`}
                >
                  <PrismicRichText field={item.name} />
                </div>
                <div className="text-sm md:text-[15px] lg:text-base my-3 xl:my-5">
                  <PrismicRichText field={item.project} />
                </div>

                <div className="border-b border-[#677479]" />

                <div className="text-sm md:text-[15px] lg:text-base mt-5 xl:mt-7.5 space-y-3">
                  <PrismicRichText field={item.description} />
                </div>

                {isFilled.link(link) && (
                  <div className="pt-5 flex text-sm md:text-[15px] lg:text-base gap-2 text-[#A59653]">
                    <PrismicNextLink field={link} />
                    <span className="font-bold">→</span>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
