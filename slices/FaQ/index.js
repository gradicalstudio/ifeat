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
    id="faq"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="xl:max-w-385 px-4 md:px-5 xl:mx-auto mb-15 lg:mb-25 xl:mb-30 xl:px-21"
    >
      <div className="flex flex-col lg:flex-row gap-5 md:gap-8 xl:gap-10 font-medium">
        {/* Left */}
        <div className="lg:w-[40%]">
          <div
            className="font-monsterrat leading-tight text-[22px] md:text-[28px] lg:text-[38px]
 "
          >
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
          <div
            className="font-raleway text-[15px] md:text-base lg:text-lg
 tracking-tight mt-7 lg:mt-5 text-[#0E1219]"
          >
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>

        {/* Right */}
        <div className="lg:w-[60%]">
          <FaqAccordion faqs={slice.primary.faqs} />
        </div>
      </div>
    </section>
  );
};

export default FaQ;
