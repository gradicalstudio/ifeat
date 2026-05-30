import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.ReflectionSlice} ReflectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ReflectionSlice>} ReflectionProps
 * @type {import("react").FC<ReflectionProps>}
 */
const Reflection = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="xl:max-w-385 px-3 xl:mx-auto mt-15 xl:mt-30 xl:px-21"
    >
      <div className="flex flex-col lg:flex-row xl:gap-22.25 font-medium">
        {/* Left */}
        <div>
          <div
            className="text-[#A59653] font-raleway text-xs md:text-sm lg:text-base
 uppercase "
          >
            <PrismicRichText field={slice.primary.eyebrow_heading} />
          </div>
          <div
            className="text-[22px] md:text-[28px] lg:text-[38px]
 font-monsterrat my-3 xl:my-3.5"
          >
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
          <div className="text-[15px] md:text-base lg:text-lg
 font-raleway tracking-tight">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <div>
            <div
              className="ml-1 mt-3.5 font-raleway rounded-xl p-5 tracking-tight bg-[#F2F3E9] text-base md:text-lg lg:text-xl
 "
              style={{ boxShadow: "-4px 0 0 0 #A59653" }}
            >
              <PrismicRichText field={slice.primary.quote} />
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="mt-10 md:mt-0">
          <div className="grid lg:grid-cols-2 gap-5">
            {slice.primary.categories.map((item, i) => (
              <div
                key={i}
                className="border-t-2 border-t-[#A59653]/40 hover:border-t-[#A59653]"
              >
                <div className="flex gap-2.5 mt-7.25 mb-5">
                  <div>
                    <PrismicNextImage
                      field={item.icon}
                      className="w-6.25 h-7.25"
                    />
                  </div>
                  <div className="text-xl font-raleway">
                    <PrismicRichText field={item.title} />
                  </div>
                </div>
                <div className="text-[#0E1219B2] font-raleway">
                  <PrismicRichText field={item.short_description} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reflection;
