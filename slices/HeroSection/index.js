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
const HeroSection = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" w-full max-w-385 mx-auto  px-4 rounded-xl "
    >
      <div className="relative  w-full  ">
        <div className="abolute w-full  h-full ">
          <PrismicNextImage
            field={slice.primary.hero_image}
            className=" object-cover w-full h-full rounded-xl "
          />
        </div>
        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-black/30 via-black/40 to-black/20" />

        <div className="absolute bottom-45 xl:pl-17.5 w-[70%] ">
          {/* Eyebrow Heading */}
          <div className="text-[#A59653] font-raleway z-10 flex items-center gap-3 mb-2.5 ">
            <div>
              <PrismicRichText field={slice.primary.eyebrow_heading} />
            </div>
            <span className="rounded-full w-0.75 h-0.75 bg-[#A59653]" />
            <div>
              <PrismicRichText field={slice.primary.eyebrow_heading_two} />
            </div>
          </div>
          {/* Heading */}
          <div className="font-monsterrat text-[4.6875rem] text-white leading-[1.2] tracking-tight mb-2.5">
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
          <div className="font-raleway text-[1.5625rem] text-white w-[60%]">
            <PrismicRichText field={slice.primary.short_description} />
          </div>
          <div className="mt-10">
            <CountdownTimer />
          </div>
          {/* Buttons */}
          <div className="flex gap-5 mt-10">
            <div><PrimaryButton field={slice.primary.link}/></div>
            <div><SecondaryButton field={slice.primary.button_two}/></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
