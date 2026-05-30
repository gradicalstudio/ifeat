import FaqAccordion from "@/components/FaQAccordion";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.FaQSlice} FaQSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FaQSlice>} FaQProps
 * @type {import("react").FC<FaQProps>}
 */
const FaQ = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-385 mx-auto my-30 px-21"
    >
      <div className="flex gap-10 font-medium">
        {/* Left */}
        <div className="w-[40%]">
          <div className="font-monsterrat leading-tight text-[38px] ">
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
          <div className="font-raleway text-lg tracking-tight mt-5 text-[#0E1219]">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>

        {/* Right */}
        <div className="w-[60%]">
          <FaqAccordion faqs={slice.primary.faqs} />
        </div>
      </div>
    </section>
  );
};

export default FaQ;
