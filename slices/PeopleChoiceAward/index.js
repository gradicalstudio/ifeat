import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.PeopleChoiceAwardSlice} PeopleChoiceAwardSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PeopleChoiceAwardSlice>} PeopleChoiceAwardProps
 * @type {import("react").FC<PeopleChoiceAwardProps>}
 */
const PeopleChoiceAward = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="xl:px-21 px-3 mt-13 mb-15 xl:my-17.5 xl:max-w-385 xl:mx-auto font-medium"
    >
      <div className="w-full bg-[#263B33] rounded-tl-[100px] rounded-br-[100px]">
        <div className=" flex flex-col gap-4 w-full justify-between px-10 py-14 xl:px-16.75 xl:py-16.5 rounded-tl-full rounded-br-2xl">
          {/* left */}
          <div className="w-full">
            <div
              className="text-xs md:text-sm lg:text-base
 font-raleway text-[#A59653] uppercase"
            >
              <PrismicRichText field={slice.primary.eyebrow_heading} />
            </div>
            <div
              className="text-[22px] md:text-[28px] lg:text-[38px]
 font-monsterrat text-[#FEFFF4]"
            >
              <PrismicRichText field={slice.primary.main_heading} />
            </div>
          </div>
          {/* right */}
          <div className="font-raleway w-full text-[15px] md:text-base lg:text-lg">
            <div className=" text-[#FEFFF4] font-raleway">
              <PrismicRichText field={slice.primary.description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeopleChoiceAward;
