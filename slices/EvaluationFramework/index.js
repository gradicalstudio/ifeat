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
      className="w-full max-w-385 px-3.5 mx-auto font-medium "
    >
      <div className=" px-17.5 pt-25 bg-[#0E1219] rounded-3xl">
        {/* TOP */}
        <div className="flex justify-between ">
          {/* left */}
          <div className="w-[70%] mb-6.5">
            <div className="text-base font-raleway uppercase text-[#A59653]">
              <PrismicRichText field={slice.primary.eyebrow_heading} />
            </div>
            <div className="text-[50px] w-[72%] leading-tight font-monsterrat my-3.5 text-[#FEFFF4]">
              <PrismicRichText field={slice.primary.main_heading} />
            </div>
            <div className=" font-raleway text-lg leading-snug text-[#FEFFF4]">
              <PrismicRichText field={slice.primary.description} />
            </div>
          </div>
          {/* right */}
          <div className="mt-20">
            {slice.primary.image_and_link.map((item, i) => (
              <div key={i}>
                <PrismicNextLink field={item.link}>
                  <PrismicNextImage
                    field={item.image}
                    className="h-12.75 w-auto object-contain"
                  />
                </PrismicNextLink>
              </div>
            ))}
          </div>
        </div>
        {/* Middle cards */}
        <div className="grid grid-cols-4 gap-5">
          {slice.primary.cards.map((item, i) => (
            <div
              key={i}
              className="flex flex-col rounded-3xl px-7 py-8 bg-linear-to-t from-transparent to-white/5 border border-white/8"
            >
              {/* Percentage */}
              <div className="flex items-start mb-4">
                <span className="font-bold font-monsterrat text-[3.4rem] leading-none text-[#A59653]">
                  {item.percentage?.[0]?.text}
                </span>
                <span className="font-monsterrat self-end font-bold text-xl  text-[#A59653]">
                  %
                </span>
              </div>

              {/* Heading */}
              <div className="font-monsterrat text-[1.6rem] font-medium text-[#FEFFF4] mb-5 leading-snug h-19">
                <PrismicRichText field={item.card_heading} />
              </div>

              {/* Divider */}
              <div className="border-t border-[#677479]/50 mb-5" />

              {/* Description */}
              <div className="font-raleway text-base text-[#FEFFF4]/70 leading-relaxed">
                <PrismicRichText field={item.card_description} />
              </div>
            </div>
          ))}
        </div>
        {/* Bottom Text */}
        <div className="mt-17.5 pb-25 text-[#FEFFF4] text-lg font-raleway w-[70%]">
          <PrismicRichText field={slice.primary.bottom_description} />
        </div>
      </div>
    </section>
  );
};

export default EvaluationFramework;
