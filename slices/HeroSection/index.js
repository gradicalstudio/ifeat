import ClockV2 from "@/components/ClockV2";
import CountdownTimer from "@/components/CountDown";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { isFilled } from "@prismicio/client";
import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";
import Heading from "@/components/Heading";

// next/image (not PrismicNextImage) so the hero is served from our own domain through
// Next image optimization. That skips the extra connection to Prismic's image server,
// which is what held back Largest Contentful Paint on phones.
const HeroImage = ({ field, className }) =>
  isFilled.image(field) ? (
    <Image
      src={field.url}
      alt={field.alt ?? ""}
      width={field.dimensions.width}
      height={field.dimensions.height}
      sizes="(min-width: 1540px) 1540px, 100vw"
      preload
      fetchPriority="high"
      className={className}
    />
  ) : null;

/**
 * @typedef {import("@prismicio/client").Content.HeroSectionSlice} HeroSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSectionSlice>} HeroSectionProps
 * @type {import("react").FC<HeroSectionProps>}
 */
const HeroSection = ({ slice, context }) => {
  // A CTA only shows when it has a link set in Prismic
  const hasButtons =
    isFilled.link(slice.primary.link) || isFilled.link(slice.primary.button_two);
  // "default" keeps the original layout. "singleButton" is the same hero with one button,
  // fitted to the screen height, with less empty space under the button.
  const single = slice.variation === "singleButton";
  const desktopBox = single
    ? "lg:h-[clamp(32rem,calc(100svh-8.5rem),45rem)] xl:h-[clamp(32rem,calc(100svh-8.5rem),62rem)]"
    : "lg:h-180 h-screen xl:h-full";
  const desktopContent = single
    ? "bottom-10 2xl:bottom-[clamp(2.5rem,calc(100svh-38rem),11.25rem)]"
    : "bottom-10 2xl:bottom-45";
  const desktopButtonsPad = single ? "" : "pb-10";
  const mobileBox = single ? "min-h-120 md:h-155" : "h-155 md:h-155";
  const mobileContent = single
    ? "relative pt-14 pb-8 md:absolute md:top-50 md:pt-0 md:pb-0"
    : "absolute top-20 md:top-50";
  const mobileButtons = single
    ? "md:peer-empty:mt-26 peer-empty:mt-8"
    : "pb-10 md:peer-empty:mt-26 peer-empty:mt-36";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" w-full xl:mt-8 mt-8 lg:mt-8 px-4 md:px-5 xl:px-4 xl:max-w-385 xl:mx-auto h-fit mb-15 lg:mb-25 xl:mb-30   rounded-xl  "
    >
      <div className={`hidden lg:block relative ${desktopBox} w-full  `}>
        <div className="abolute w-full  h-full ">
          <HeroImage
            field={slice.primary.hero_image}
            className=" lg:object-bottom-left xl:object-left object-cover w-full h-full rounded-xl "
          />
        </div>
        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-black/30 via-black/40 to-black/20" />

        <div className={`absolute ${desktopContent} xl:pl-17.5 px-4  md:px-5  lg:w-[70%] `}>
          {/* Eyebrow Heading */}
          <div className="text-[#A59653] text-xs md:text-sm lg:text-base font-raleway z-10 flex items-center gap-2 xl:gap-3 mb-2.5 ">
            <div>
              <PrismicRichText field={slice.primary.eyebrow_heading} />
            </div>
            <span className="rounded-full w-0.75 h-0.75 bg-[#A59653]" />
            <div>
              <PrismicRichText field={slice.primary.eyebrow_heading_two} />
            </div>
          </div>
          {/* Heading */}
          <div className="font-monsterrat text-4xl md:text-[52px] xl:text-[4.6875rem] text-white leading-[1.15] xl:leading-[1.1] tracking-tight mb-3.5">
            <Heading as="h1" field={slice.primary.main_heading} />
          </div>
          <div className="font-raleway text-base md:text-xl xl:text-[1.5625rem] text-white w-[80%] xl:w-[65%]">
            <PrismicRichText field={slice.primary.short_description} />
          </div>
         
          <div className="peer mt-6 lg:w-[70%] xl:w-[75%] empty:hidden">
            <CountdownTimer targetDate={context.eventDate} />
          </div>
          {/* Buttons, with extra top space once the clock is gone */}
          {hasButtons && (
            <div className={`flex flex-col ${desktopButtonsPad} justify-center md:justify-normal  md:flex-row gap-5 mt-10 peer-empty:mt-16`}>
              {isFilled.link(slice.primary.link) && (
                <div>
                  <PrimaryButton field={slice.primary.link} />
                </div>
              )}
              {isFilled.link(slice.primary.button_two) && (
                <div>
                  <SecondaryButton field={slice.primary.button_two} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hero */}
      {/* singleButton on phones: as tall as the text needs (no fixed height), so no empty space below the button */}
      <div className={`w-full lg:hidden relative ${mobileBox}`}>
        <div className="w-full h-full absolute inset-0">
          <HeroImage
            field={slice.primary.hero_image}
            className=" object-center md:object-bottom-left object-cover  w-full h-full rounded-xl "
          />
        </div>

          <div className={`px-4 ${mobileContent}`}>
            <div>
              <div className="text-[#A59653] text-xs md:text-sm lg:text-base font-raleway z-10 flex items-center gap-2 xl:gap-3 mb-2.5 ">
                <div>
                  <PrismicRichText field={slice.primary.eyebrow_heading} />
                </div>
                <span className="rounded-full w-0.75 h-0.75 bg-[#A59653]" />
                <div>
                  <PrismicRichText field={slice.primary.eyebrow_heading_two} />
                </div>
              </div>
              {/* Heading */}
              <div className="font-monsterrat text-4xl md:text-[52px] xl:text-[4.6875rem] text-white leading-[1.15] xl:leading-[1.1] tracking-tight mb-2.5">
                <Heading as="h1" field={slice.primary.main_heading} />
              </div>
              <div className="font-raleway text-base md:text-xl xl:text-[1.5625rem] text-white w-[80%] xl:w-[60%]">
                <PrismicRichText field={slice.primary.short_description} />
              </div>
              <div className="peer mt-6 md:w-[75%] empty:hidden">
                <ClockV2 targetDate={context.eventDate} />
              </div>
              {/* Buttons, with extra top space once the clock is gone */}
              {hasButtons && (
                <div className={`flex flex-col ${mobileButtons} justify-center md:justify-normal  md:flex-row gap-5 mt-10`}>
                  {isFilled.link(slice.primary.link) && (
                    <div>
                      <PrimaryButton field={slice.primary.link} />
                    </div>
                  )}
                  {isFilled.link(slice.primary.button_two) && (
                    <div>
                      <SecondaryButton field={slice.primary.button_two} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
      </div>
    </section>
  );
};

export default HeroSection;
