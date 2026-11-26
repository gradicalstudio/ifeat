import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Heading from "@/components/Heading";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import VimeoPlayer from "@/components/VimeoPlayer";

const glassCard = {
  background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  border: "1px solid rgba(255,255,255,0.15)",
};

/**
 * @typedef {import("@prismicio/client").Content.VideoComponentSlice} VideoComponentSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<VideoComponentSlice>} VideoComponentProps
 * @type {import("react").FC<VideoComponentProps>}
 */
const VideoComponent = ({ slice }) => {
  const { primary } = slice;
  const label = primary.play_label || "Watch the ceremony";
  const button = isFilled.link(primary.button) ? <PrimaryButton field={primary.button} /> : null;

  if (slice.variation === "cinematic") {
    return (
      <section
        id="ceremony"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="w-full xl:max-w-385 xl:mx-auto md:px-4 lg:px-5 xl:px-4 px-3 mb-15 lg:mb-25 xl:mb-30"
      >
        <div className="mx-auto max-w-272 flex flex-col items-center gap-8 lg:gap-12">
          <div className="flex flex-col items-center gap-3 lg:gap-4 text-center max-w-190">
            <div className="text-[#6E6128] uppercase tracking-widest text-xs md:text-sm lg:text-base font-raleway font-semibold empty:hidden">
              <PrismicRichText field={primary.eyebrow} />
            </div>
            <div className="text-[22px] md:text-[28px] lg:text-[38px] font-monsterrat font-medium leading-tight text-[#263B33]">
              <Heading field={primary.heading} />
            </div>
            <div className="text-[15px] md:text-base lg:text-lg font-raleway leading-snug text-[#3A4A43] empty:hidden">
              <PrismicRichText field={primary.description} />
            </div>
            {button && <div className="mt-2 w-full md:w-auto">{button}</div>}
          </div>
          <VimeoPlayer
            video={primary.video}
            poster={primary.poster}
            label={label}
            belowClassName="text-[#263B33]"
            className="w-full rounded-2xl lg:rounded-[28px] shadow-[0_24px_60px_rgba(14,18,25,0.25)]"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="ceremony"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="xl:px-21 px-4 md:px-5 mb-15 lg:mb-25 xl:mb-30 xl:max-w-385 xl:mx-auto font-medium"
    >
      <div className="bg-[#263B33] rounded-tl-[100px] rounded-br-[100px] px-10 pt-20 md:pt-14 pb-18 md:pb-14 xl:px-16.75 xl:py-16.5 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
        <div className="lg:flex-1 min-w-0 flex flex-col gap-4 lg:gap-5 text-[#FEFFF4]">
          <div className="text-[22px] md:text-[28px] lg:text-[38px] font-monsterrat font-medium leading-tight">
            <Heading field={primary.heading} />
          </div>
          <div className="text-[15px] md:text-base lg:text-lg font-raleway text-[#E4E6DA] empty:hidden">
            <PrismicRichText field={primary.description} />
          </div>
          {isFilled.link(primary.button) && (
            <div className="pt-2 lg:pt-4">
              <SecondaryButton field={primary.button} />
            </div>
          )}
        </div>
        {/* Mobile: video first, and wider than the text (pulled out into the side padding) */}
        <div style={glassCard} className="order-first  md:mx-0 lg:order-none lg:flex-[1.35] min-w-0 rounded-[22px] p-1.5">
          <VimeoPlayer video={primary.video} poster={primary.poster} label={label} className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

export default VideoComponent;
