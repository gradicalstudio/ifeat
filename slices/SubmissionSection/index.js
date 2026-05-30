import CountdownTimer from "@/components/CountDown";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.SubmissionSectionSlice} SubmissionSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SubmissionSectionSlice>} SubmissionSectionProps
 * @type {import("react").FC<SubmissionSectionProps>}
 */
const SubmissionSection = ({ slice }) => {
  return (
    <section
      id="webinar"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full xl:max-w-385 xl:mx-auto  px-3 "
    >
      <div>
        {/* TOP */}
        <div className="flex flex-col lg:flex-row  xl:px-23.75 z-10 -mb-50 ">
          {slice.primary.top_section.map((item, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row justify-between rounded-3xl bg-[#263B33] xl:py-15.5 xl:px-16.75 px-4 py-4 font-medium "
            >
              {/* Top Left */}
              <div className="xl:w-[40%]">
                <div
                  className="text-[#A59653] uppercase text-xs md:text-sm lg:text-base
 font-raleway"
                >
                  <PrismicRichText field={item.eyebrow_heading} />
                </div>
                <div
                  className="text-[22px] md:text-[28px] lg:text-[38px]
 font-monsterrat leading-tight text-[#FEFFF4] my-3.5"
                >
                  <PrismicRichText field={item.heading} />
                </div>
                <div
                  className="text-[15px] md:text-base lg:text-lg
 font-raleway leading-snug text-[#FEFFF4]"
                >
                  <PrismicRichText field={item.short_description} />
                </div>
                <div className=" mt-5 mb-10 xl:mt-11.5">
                  <PrimaryButton field={item.button} />
                </div>
              </div>
              {/* Top Right */}
              <div className="xl:w-[40%]">
                <div className="rounded-2xl bg-linear-to-t from-transparent to-white/5 border border-white/10 px-7 py-9 flex flex-col gap-6">
                  {slice.primary.top_right_card.map((item, i) => (
                    <div key={i} className="flex flex-col gap-6">
                      <div>
                        <div className="text-[#A59653] uppercase text-sm md:text-[15px] lg:text-base font-raleway tracking-widest mb-1.25">
                          <PrismicRichText field={item.title} />
                        </div>
                        <div className="text-[15px] md:text-base lg:text-lg font-raleway text-[#FEFFF4]">
                          <PrismicRichText field={item.info} />
                        </div>
                      </div>
                      {i < slice.primary.top_right_card.length - 1 && (
                        <div className="border-t border-white/10" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* BOTTOM */}
        <div id="applysection" className="xl:px-67.75 flex bg-[#0E1219] rounded-2xl flex-col items-center text-center pt-63.75">
          {slice.primary.bottom_section.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="flex items-center text-center text-xs md:text-sm lg:text-base
 uppercase gap-2 text-[#A59653] font-raleway"
              >
                <div>
                  <PrismicRichText field={item.eyebrow_heading} />
                </div>
                <span className="rounded-full w-0.75 h-0.75 bg-[#A59653] " />
                <div>
                  <PrismicRichText field={item.eyebrow_heading_two} />
                </div>
              </div>
              <div
                className="text-[#FEFFF4] text-[22px] md:text-[28px] lg:text-[38px]
 py-2.5 font-monsterrat"
              >
                <PrismicRichText field={item.heading} />
              </div>
              <div
                className="text-[#FEFFF4] text-[15px] md:text-base lg:text-lg 
 font-raleway"
              >
                <PrismicRichText field={item.sub_heading} />
              </div>
              <div
                className="text-[#FEFFF4] text-[15px] md:text-base lg:text-lg
 font-raleway w-[86%]"
              >
                <PrismicRichText field={item.description} />
              </div>
              <div
                className="text-[#FEFFF4] text-[15px] md:text-base lg:text-lg
 font-raleway mt-7.5 mb-10"
              >
                <PrismicRichText field={item.last_date} />
              </div>
              <div>
                <CountdownTimer />
              </div>
              {/* Buttons */}
              <div className="flex flex-col lg:flex-row gap-5 mt-10 pb-10 xl:pb-21">
                <div>
                  <PrimaryButton field={item.button_one} />
                </div>
                <div>
                  <SecondaryButton field={item.button_two} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubmissionSection;
