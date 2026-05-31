import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.SectionThreeSlice} SectionThreeSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SectionThreeSlice>} SectionThreeProps
 * @type {import("react").FC<SectionThreeProps>}
 */
const SectionThree = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-15 px-4 md:px-5 lg:mb-25 xl:mb-30 xl:px-21 xl:max-w-385 xl:mx-auto font-medium"
    >
      <div>
        <div className="font-monsterrat text-[28px] md:text-[38px] leading-[1.15] lg:leading-tight 2xl:text-[50px] mb-10 lg:mb-18.25">
          <PrismicRichText field={slice.primary.main_heading} />
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10 lg:gap-10 font-raleway">
          {slice.primary.content_columns.map((item, i) => (
            <div
              key={i}
              className="pl-4 border-l-2 border-l-[#A59653]/30 hover:border-l-[#A59653] transition-colors duration-300"
            >
              <div className="xl:w-[390.5555419921875px] flex flex-col gap-2.5">
                <div>
                  <PrismicNextImage
                    field={item.icon}
                    className="w-18 md:h-25"
                  />
                </div>
                <div className="text-base font-semibold md:text-[17px] lg:text-[22px]">
                  <PrismicRichText field={item.heading} />
                </div>
                <div className="text-sm md:text-[15px] lg:text-base">
                  <PrismicRichText field={item.description} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
