import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.JuryPanelSlice} JuryPanelSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<JuryPanelSlice>} JuryPanelProps
 * @type {import("react").FC<JuryPanelProps>}
 */
const JuryPanel = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-385 mx-auto my-30 "
    >
      <div className="px-41 font-medium">
        {/* top */}
        <div className="flex flex-col items-center justify-center  mb-17.5">
          <div className="text-[#A59653] uppercase font-raleway">
            <PrismicRichText field={slice.primary.eyebrow_heading} />
          </div>
          <div className="text-[38px] font-monsterrat my-3.5">
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
          <div className="text-lg font-raleway text-center w-[80%]">
            <PrismicRichText field={slice.primary.short_description} />
          </div>
        </div>
        {/* bottom */}
        <div className="grid grid-cols-4">
          {slice.primary.jury_cards.map((item, i) => (
            <div key={i} className=" flex flex-col items-center text-center">
              <div className="mb-2.5 w-50">
                <PrismicNextImage field={item.image} className="rounded-full"/>
              </div>
              <div className="font-monsterrat text-[25px]">
                <PrismicRichText field={item.name} />
              </div>
              <div className="font-bold text-base font-raleway leading-tight text-balance">
                <PrismicRichText field={item.title} />
              </div>
              <div className="font-raleway text-base">
                <PrismicRichText field={item.company} />
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default JuryPanel;
