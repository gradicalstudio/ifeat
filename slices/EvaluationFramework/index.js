import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.EvaluationFrameworkSlice} EvaluationFrameworkSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<EvaluationFrameworkSlice>} EvaluationFrameworkProps
 * @type {import("react").FC<EvaluationFrameworkProps>}
 */
const EvaluationFramework = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full px-3 xl:max-w-385 xl:px-3.5 xl:mx-auto font-medium "
    >
      <div className=" px-4 pt-4 lg:px-17.5 xl:pt-25 bg-[#0E1219] rounded-3xl">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row lg:justify-between ">
          {/* left */}
          <div className="xl:w-[70%] mb-6.5">
            <div
              className="text-xs md:text-sm lg:text-base
 font-raleway uppercase text-[#A59653]"
            >
              <PrismicRichText field={slice.primary.eyebrow_heading} />
            </div>
            <div
              className="text-[28px] md:text-[38px] lg:text-[50px]
 xl:w-[72%] leading-tight font-monsterrat my-3.5 text-[#FEFFF4]"
            >
              <PrismicRichText field={slice.primary.main_heading} />
            </div>
            <div
              className=" font-raleway text-[15px] md:text-base lg:text-lg
 leading-snug text-[#FEFFF4]"
            >
              <PrismicRichText field={slice.primary.description} />
            </div>
          </div>
          {/* right */}
          <div className=" mt-5 mb-10 lg:my-0 lg:mt-20">
            {slice.primary.image_and_link.map((item, i) => (
              <div key={i}>
                <PrismicNextLink field={item.link}>
                  <PrismicNextImage
                    field={item.image}
                    className="h-10  xl:h-12.75 w-auto object-contain"
                  />
                </PrismicNextLink>
              </div>
            ))}
          </div>
        </div>
        {/* Middle cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {slice.primary.cards.map((item, i) => (
            <div
              key={i}
              className="flex flex-col rounded-3xl px-4 py-5 lg:px-7 lg:py-8 bg-linear-to-t from-transparent to-white/5 border border-white/8"
            >
              {/* Percentage */}
              <div className="flex items-start mb-4">
                <span className="font-bold font-monsterrat text-5xl lg:text-[3.4rem] leading-none text-[#A59653]">
                  {item.percentage?.[0]?.text}
                </span>
                <span className="font-monsterrat self-end font-bold text-xl  text-[#A59653]">
                  %
                </span>
              </div>

              {/* Heading */}
              <div
                className="font-monsterrat text-lg md:text-xl lg:text-[25px]
 font-medium text-[#FEFFF4] mb-5 leading-snug lg:h-19"
              >
                <PrismicRichText field={item.card_heading} />
              </div>

              {/* Divider */}
              <div className="border-t border-[#677479]/50 mb-5" />

              {/* Description */}
              <div className="font-raleway text-sm md:text-[15px] lg:text-base text-[#FEFFF4]/70 leading-relaxed">
                <PrismicRichText field={item.card_description} />
              </div>
            </div>
          ))}
        </div>
        {/* Bottom Text */}
        <div className="mt-10 xl:mt-17.5 pb-4 xl:pb-25 text-[#FEFFF4] text-[15px] md:text-base lg:text-lg
font-raleway lg:w-[70%]">
          <PrismicRichText field={slice.primary.bottom_description} />
        </div>
      </div>
    </section>
  );
};

export default EvaluationFramework;
