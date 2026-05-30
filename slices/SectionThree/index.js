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
      className="mb-30 px-21 max-w-385 mx-auto font-medium "
    >
      <div>
        <div className="font-monsterrat 2xl:text-[50px] mb-18.25">
          <PrismicRichText field={slice.primary.main_heading} />
        </div>
        <div className="grid grid-cols-3 gap-10  font-raleway ">
          {slice.primary.content_columns.map((item, i) => (
            <div
              key={i}
              className={`pl-4  ${i === 0 ? "border-l-4 border-l-[#A59653]" : "border-l-2 border-l-[#0E1219]/20"}`}
            >
              <div className="w-[390.5555419921875px] flex flex-col gap-2.5">
                <div>
                  <PrismicNextImage field={item.icon} />
                </div>
                <div className="text-[22px] ">
                  <PrismicRichText field={item.heading} />
                </div>
                <div className="">
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
