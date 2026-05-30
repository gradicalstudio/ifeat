import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.SecondSectionSlice} SecondSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SecondSectionSlice>} SecondSectionProps
 * @type {import("react").FC<SecondSectionProps>}
 */
const SecondSection = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-30 px-21 max-w-385 mx-auto "
    >
      <div className="flex justify-between w-full">
        {/* Left Side */}
        <div className="w-[35%]">
          <div className="text-[#A59653] font-medium font-monsterrat mb-3.5">
            <PrismicRichText field={slice.primary.eyebrow_heading} />
          </div>
          <div className="text-[3.125rem] leading-tight font-medium font-raleway ">
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
        </div>
        {/* Right Side */}
        <div className="w-[50%] text-lg font-raleway leading-snug font-medium">
          <div>
            <PrismicRichText field={slice.primary.description} />
          </div>
          {/* quotes */}
          <div>
            <div
              className="ml-1 2xl:mt-13.25 rounded-xl p-5 tracking-tight bg-[#F2F3E9] text-xl "
              style={{ boxShadow: "-4px 0 0 0 #A59653" }}
            >
              <PrismicRichText field={slice.primary.quote_field} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
