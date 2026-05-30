import PrizeAccordion from "@/components/PrizeAccordion";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.ThePrizesSlice} ThePrizesSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ThePrizesSlice>} ThePrizesProps
 * @type {import("react").FC<ThePrizesProps>}
 */
const ThePrizes = ({ slice }) => {
  return (
    <section
    id="prizes"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-15 lg:mt-34.5 px-3 xl:max-w-385 xl:mx-auto"
    >
      <div className="font-medium xl:px-48.25">
        <div className="mb-10 xl:mb-12.5">
          <div className="font-raleway text-xs md:text-sm lg:text-base uppercase text-[#A59653]">
            <PrismicRichText field={slice.primary.eyebrow_heading} />
          </div>
          <div className="text-[22px] md:text-[28px] lg:text-[38px] font-monsterrat my-3 xl:my-3.5">
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
          <div className="font-raleway text-[15px] md:text-base lg:text-lg">
            <PrismicRichText field={slice.primary.short_description} />
          </div>
        </div>
        <div>
          {slice.primary.categories.map((item, i) => (
            <PrizeAccordion key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThePrizes;
