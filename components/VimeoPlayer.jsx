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

const PlayIcon = ({ className }) => (
  <span
    aria-hidden="true"
    // will-change keeps the circle on its own layer, so on screens with fractional
    // display scaling (125%, 150%) it isn't re-snapped to a different pixel when the hover ends
    className={`flex shrink-0 items-center justify-center rounded-full bg-[#A59653] transition-transform duration-300 will-change-transform group-hover:scale-110 ${className}`}
  >
    {/* Triangle drawn so its optical centre is the middle of the 24x24 box, no margin hacks */}
    <svg viewBox="0 0 24 24" fill="#263B33" className="size-[46%]">
      <path d="M7.5 5v14L18.5 12z" />
    </svg>
  </span>
);

const labelClass =
  "font-monsterrat font-bold uppercase whitespace-nowrap tracking-wider";
const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FEFFF4]";

/**
 * Click-to-play Vimeo video: shows a poster and a gold play button, and only
 * loads the Vimeo player (and its scripts and cookies) once someone presses play.
 *
 * The button sits in a bar along the bottom of the video from md up. On phones it
 * moves below the video, left-aligned, so nothing covers the poster (`belowClassName`
 * sets its text colour for the section it is placed in).
 */
export default function VimeoPlayer({
  video,
  poster,
  label,
  className = "",
  belowClassName = "text-[#FEFFF4]",
}) {
  const [playing, setPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const src = isFilled.embed(video) ? playerSrc(video) : null;
  if (!src) return null;

  const title = video.title || label;
  const thumbnail = largeThumbnail(video.thumbnail_url);
  const sizes = "(min-width: 1280px) 1088px, 100vw";
  const ariaLabel = `${label}: play ${title}`;

  // Phones: the inline frame is too small and hides Vimeo's controls, so play in a modal
  const play = () =>
    window.matchMedia("(max-width: 767px)").matches
      ? setModalOpen(true)
      : setPlaying(true);

  return (
    <div>
      {/* The whole picture is the click target; hovering it scales the play circle.
          The bar's button stays for keyboard and screen-reader users (its click bubbles up here). */}
      <div
        onClick={playing ? undefined : play}
        className={`group relative aspect-video overflow-hidden bg-[#0E1219] ${playing ? "" : "cursor-pointer"} ${className}`}
      >
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
            {/* Bottom bar (md and up): a soft shade keeps the label readable, the picture stays bright */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/80 to-transparent max-md:hidden"
            />
            <button
              type="button"
              aria-label={ariaLabel}
              className={`absolute inset-x-0 bottom-0 flex cursor-pointer items-center gap-3 px-4 py-3 xl:gap-4 xl:px-8 xl:py-5 max-md:hidden text-[#FEFFF4] text-xs lg:text-[13px] xl:text-sm ${labelClass} ${focusClass}`}
            >
              <PlayIcon className="size-11 lg:size-12 xl:size-14" />
              {label}
            </button>
          </>
        )}

      </div>

      {/* Outside the clickable picture, so clicks in the pop-up can't start it again */}
      {modalOpen && (
        <Modal
          onClose={closeModal}
          overlayClassName="p-2 bg-black/80 backdrop-blur-sm"
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

      {/* Phones: the button sits below the video, left-aligned, outside the picture */}
      {!playing && (
        <div className={`flex justify-start px-1.5 pt-3 pb-1 md:hidden ${belowClassName}`}>
          <button
            type="button"
            onClick={play}
            aria-label={ariaLabel}
            className={`group inline-flex cursor-pointer items-center gap-2.5 py-0.5 text-[13px] ${labelClass} ${focusClass}`}
          >
            <PlayIcon className="size-10" />
            {label}
          </button>
        </div>
      )}
    </div>
  );
}
