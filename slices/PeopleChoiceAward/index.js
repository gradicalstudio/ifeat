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
      className="px-21 my-17.5 max-w-385 mx-auto font-medium"
    >
      <div className="w-full bg-[#263B33] rounded-tl-[100px] rounded-br-[100px]">
        <div className=" flex gap-4 w-full justify-between px-16.75 py-16.5 rounded-tl-full rounded-br-2xl">
          {/* left */}
          <div className="w-full">
            <div className="text-base font-raleway text-[#A59653] uppercase">
              <PrismicRichText field={slice.primary.eyebrow_heading} />
            </div>
            <div className="text-[38px] font-monsterrat text-[#FEFFF4]">
              <PrismicRichText field={slice.primary.main_heading} />
            </div>
          </div>
          {/* right */}
          <div className="font-raleway w-full text-lg">
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
