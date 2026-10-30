import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Heading from "@/components/Heading";
import PrimaryButton from "@/components/PrimaryButton";

/**
 * @typedef {import("@prismicio/client").Content.FollowThroughSlice} FollowThroughSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FollowThroughSlice>} FollowThroughProps
 * @type {import("react").FC<FollowThroughProps>}
 */
const FollowThrough = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="xl:px-21 px-4 md:px-5 mt-13 mb-15 lg:mt-25 xl:mt-30 xl:mb-17.5 xl:max-w-385 xl:mx-auto font-medium"
    >
      <div className="w-full bg-[#263B33] rounded-tl-[100px] rounded-br-[100px]">
        <div className=" flex flex-col gap-4 w-full justify-between px-10 py-14 xl:px-16.75 xl:py-16.5 rounded-tl-full rounded-br-2xl">
          {/* heading */}
          <div
            className="text-[22px] md:text-[28px] lg:text-[38px]
 font-monsterrat text-[#FEFFF4]"
          >
            <Heading field={slice.primary.heading} />
          </div>
          {/* description */}
          <div className="font-raleway w-full text-[15px] md:text-base lg:text-lg text-[#FEFFF4]">
            <PrismicRichText field={slice.primary.description} />
          </div>
          {/* cta */}
          {isFilled.link(slice.primary.cta) && (
            <div className="mt-4">
              <PrimaryButton field={slice.primary.cta} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FollowThrough;
