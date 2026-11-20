"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import Modal from "@/components/Modal";

// Builds the Vimeo player URL from a Prismic Embed field. Prefers the iframe src
// Prismic stored (it keeps the private-link hash), falling back to the pasted URL.
function playerSrc(video) {
  const fromHtml = video.html?.match(/src="([^"]+)"/)?.[1]?.replace(/&amp;/g, "&");
  let url;
  if (fromHtml) {
    url = new URL(fromHtml, "https://player.vimeo.com");
  } else {
    const match = video.embed_url?.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
    if (!match) return null;
    url = new URL(`https://player.vimeo.com/video/${match[1]}`);
    if (match[2]) url.searchParams.set("h", match[2]);
  }
  url.searchParams.set("autoplay", "1");
  url.searchParams.set("dnt", "1"); // no Vimeo tracking cookies
  return url.toString();
}

// Vimeo's oEmbed thumbnail is small; ask its CDN for a 1280px version instead.
const largeThumbnail = (src) => src?.replace(/-d_\d+(x\d+)?/, "-d_1280");

/**
 * Click-to-play Vimeo video: shows a poster and a frosted play button, and only
 * loads the Vimeo player (and its scripts and cookies) once someone presses play.
 */
export default function VimeoPlayer({ video, poster, label, className = "" }) {
  const [playing, setPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const src = isFilled.embed(video) ? playerSrc(video) : null;
  if (!src) return null;

  const title = video.title || label;
  const thumbnail = largeThumbnail(video.thumbnail_url);
  const sizes = "(min-width: 1280px) 1088px, 100vw";

  return (
    <div className={`relative aspect-video overflow-hidden bg-[#0E1219] ${className}`}>
      {playing ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
        />
      ) : (
        <>
          {isFilled.image(poster) ? (
            <PrismicNextImage field={poster} fill sizes={sizes} className="object-cover" alt="" />
          ) : (
            thumbnail && <Image src={thumbnail} alt="" fill sizes={sizes} className="object-cover" />
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
          <button
            type="button"
            // Phones: the inline frame is too small and hides Vimeo's controls, so play in a modal
            onClick={() =>
              window.matchMedia("(max-width: 767px)").matches
                ? setModalOpen(true)
                : setPlaying(true)
            }
            aria-label={`${label}: play ${title}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 md:gap-3.5 lg:gap-3 xl:gap-3.5 rounded-full border border-white/45 bg-white/15 backdrop-blur-md backdrop-saturate-150 py-1.5 pl-1.5 pr-4 md:py-2 md:pl-2 md:pr-7 lg:pr-5 xl:pr-7 font-monsterrat font-bold uppercase whitespace-nowrap text-[11px] md:text-[15px] lg:text-[13px] xl:text-[15px] text-[#FEFFF4] [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] cursor-pointer transition-colors duration-300 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FEFFF4]"
          >
            <span aria-hidden="true" className="flex size-8 md:size-14 lg:size-11 xl:size-14 items-center justify-center rounded-full bg-[#A59653]">
              <svg viewBox="0 0 24 24" fill="#263B33" className="size-3.5 md:size-5.5 lg:size-4.5 xl:size-5.5">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            {label}
          </button>
        </>
      )}

      {modalOpen && (
        <Modal
          onClose={closeModal}
          overlayClassName="p-2 bg-black/80"
          className="w-full"
          closeClassName="-top-12 right-0"
        >
          {/* 16:9, as wide as the screen allows but never taller than 80% of its height */}
          <div
            className="mx-auto aspect-video overflow-hidden rounded-lg bg-black"
            style={{ width: "min(100%, calc(80dvh * 16 / 9))" }}
          >
            <iframe
              src={src}
              title={title}
              className="h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
