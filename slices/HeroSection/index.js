import CountdownTimer from "@/components/CountDown";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.HeroSectionSlice} HeroSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSectionSlice>} HeroSectionProps
 * @type {import("react").FC<HeroSectionProps>}
 */
const HeroSection = ({ slice, context }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" w-full xl:max-w-385 xl:mx-auto h-full mb-15 lg:mb-25 xl:mb-30   rounded-b-xl  "
    >
      <div className="relative h-dvh xl:h-full  w-full  ">
        <div className="abolute w-full  h-full ">
          <PrismicNextImage
            field={slice.primary.hero_image}
            className=" object-cover w-full h-full rounded-b-xl "
          />
        </div>
        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-black/30 via-black/40 to-black/20" />

        <div className="absolute bottom-0 xl:bottom-45 xl:pl-17.5 px-4  md:px-5  lg:w-[70%] ">
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
          <div className="font-monsterrat text-4xl md:text-[52px] xl:text-[4.6875rem] text-white leading-[1.15] xl:leading-[1.1] tracking-tight mb-2.5">
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
          <div className="font-raleway text-base md:text-xl xl:text-[1.5625rem] text-white w-[80%] xl:w-[60%]">
            <PrismicRichText field={slice.primary.short_description} />
          </div>
          <div className="mt-10 xl:w-[75%]">
            <CountdownTimer targetDate={context.eventDate} />
          </div>
          {/* Buttons */}
          <div className="flex flex-col pb-10 justify-center lg:justify-normal  md:flex-row gap-5 mt-10">
            <div>
              <PrimaryButton field={slice.primary.link} />
            </div>
            <div>
              <SecondaryButton field={slice.primary.button_two} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
