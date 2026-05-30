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
      className="py-15  px-3 xl:py-30 xl:px-21 xl:max-w-385 mx-auto "
    >
      <div className="flex flex-col lg:flex-row justify-between w-full">
        {/* Left Side */}
        <div className="xl:w-[35%]">
          <div className="text-[#A59653] text-xs md:text-sm lg:text-base font-medium font-monsterrat mb-3.5">
            <PrismicRichText field={slice.primary.eyebrow_heading} />
          </div>
          <div className="text-[28px] md:text-[38px]  xl:text-[3.125rem] lg:leading-tight leading-[1.15] font-medium font-raleway ">
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
        </div>
        {/* Right Side */}
        <div className="xl:w-[50%] mt-4 lg:mt-0 text-[15px] md:text-base lg:text-lg font-raleway leading-snug font-medium">
          <div>
            <PrismicRichText field={slice.primary.description} />
          </div>
          {/* quotes */}
          <div>
            <div
              className="ml-1 mt-6 2xl:mt-13.25 rounded-xl p-5 tracking-tight bg-[#F2F3E9] md:text-lg lg:text-xl "
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
