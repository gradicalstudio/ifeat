"use client";
import { useState, useCallback } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Modal from "@/components/Modal";

// "+ Know more" button that opens its children in a modal.
// Renders nothing clickable unless `enabled`, but keeps the row's spacing.
export default function DescriptionModal({ enabled, link, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

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
            data-lenis-prevent
            className="modal-scroll w-full overflow-y-auto p-5 md:p-8 md:pr-6"
          >
            {children}

            {isFilled.link(link) && (
              <div className="pt-5 flex text-sm md:text-[15px] lg:text-base gap-2 text-[#A59653]">
                <PrismicNextLink field={link} />
                <span className="font-bold">→</span>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
