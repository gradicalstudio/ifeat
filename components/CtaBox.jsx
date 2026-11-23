import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Heading from "@/components/Heading";
import PrimaryButton from "@/components/PrimaryButton";

// Dark green box with heading, text and a button. Used by FollowThrough and the
// ImageCarousel "withCta" variation so both stay identical.
export default function CtaBox({ heading, description, cta }) {
  return (
    <div className="w-full bg-[#263B33] rounded-tl-[100px] rounded-br-[100px]">
      <div className="flex flex-col gap-4 w-full justify-between px-10 py-14 xl:px-16.75 xl:py-16.5">
        <div className="text-[22px] md:text-[28px] lg:text-[38px] font-monsterrat text-[#FEFFF4]">
          <Heading field={heading} />
        </div>
        <div className="font-raleway w-full text-[15px] md:text-base lg:text-lg text-[#FEFFF4]">
          <PrismicRichText field={description} />
        </div>
        {isFilled.link(cta) && (
          <div className="mt-4">
            <PrimaryButton field={cta} />
          </div>
        )}
      </div>
    </div>
  );
}
