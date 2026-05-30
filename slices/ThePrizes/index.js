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
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-34.5 max-w-385 mx-auto"
    >
      <div className="font-medium px-48.25">
        <div className="mb-12.5">
          <div className="font-raleway text-base uppercase text-[#A59653]">
            <PrismicRichText field={slice.primary.eyebrow_heading} />
          </div>
          <div className="text-[38px] font-monsterrat my-3.5">
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
          <div className="font-raleway text-lg">
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
