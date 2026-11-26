"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Modal from "@/components/Modal";

// "+ Know more" button that opens its children in a modal.
// Renders nothing clickable unless `enabled`, but keeps the row's spacing.
export default function DescriptionModal({ enabled, link, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  // Show a fade at the bottom edge while there is more text to scroll to
  const scrollRef = useRef(null);
  const [moreBelow, setMoreBelow] = useState(false);
  const updateMoreBelow = useCallback(() => {
    const el = scrollRef.current;
    if (el) setMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 8);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    updateMoreBelow();
    window.addEventListener("resize", updateMoreBelow);
    return () => window.removeEventListener("resize", updateMoreBelow);
  }, [isOpen, updateMoreBelow]);

  return (
    // Without a learn-more row below, keep the same breathing room before the next card
    <div
      className={`font-raleway text-sm md:text-[15px] lg:text-base flex-1 flex flex-col justify-end items-start ${isFilled.link(link) ? "" : "pb-5"}`}
    >
      {enabled && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer underline underline-offset-4 text-black hover:text-[#A59653] transition-colors duration-300"
        >
          + Know more
        </button>
      )}

      {isOpen && (
        // The panel clips to the rounded corners and holds the close button,
        // so the button stays put while the inner content scrolls
        <Modal
          onClose={close}
          className="flex w-full max-w-2xl max-h-[85dvh] md:max-h-[90dvh] overflow-hidden rounded-xl bg-[#FEFFF4] font-raleway font-medium"
        >
          <div
            ref={scrollRef}
            onScroll={updateMoreBelow}
            data-lenis-prevent
            className="modal-scroll w-full overflow-y-auto p-5 md:p-6"
          >
            {children}

            {isFilled.link(link) && (
              <div className="pt-5 flex text-sm md:text-[15px] lg:text-base gap-2 text-[#A59653]">
                <PrismicNextLink field={link} />
                <span className="font-bold">→</span>
              </div>
            )}
          </div>

          {/* Scroll cue: fades the cut-off text and points down while more is below */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 flex h-28 items-end justify-center bg-gradient-to-t from-[#FEFFF4] via-[#FEFFF4]/85 to-transparent pb-1.5 transition-opacity duration-300 ${moreBelow ? "opacity-100" : "opacity-0"}`}
          >
            <svg viewBox="0 0 14 8" className="h-2 w-3.5 text-[#A59653]">
              <path
                d="M1 1l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Modal>
      )}
    </div>
  );
}
