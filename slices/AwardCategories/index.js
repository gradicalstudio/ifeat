import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.AwardCategoriesSlice} AwardCategoriesSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AwardCategoriesSlice>} AwardCategoriesProps
 * @type {import("react").FC<AwardCategoriesProps>}
 */
const AwardCategories = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-385 mx-auto  px-4"
    >
      {/* Main container */}
      <div className="bg-[#263B33] font-medium rounded-2xl px-17.5 py-25">
        {/* Top section */}
        <div className="2xl:w-[35%]">
          <div className="text-base font-raleway text-[#A59653] uppercase">
            <PrismicRichText field={slice.primary.eyebrow_heading} />
          </div>
          <div className="text-[50px] font-monsterrat my-3.5 text-[#FEFFF4]">
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
          <div className="text-lg text-[#FEFFF4] font-raleway">
            <PrismicRichText field={slice.primary.short_description} />
          </div>
        </div>
        {/* Cards */}
        <div className="mt-18.25">
          <div className="grid grid-cols-2 gap-6">
            {slice.primary.cards.map((item, i) => (
              <div
                key={i}
                className="py-9 px-7.5 rounded-2xl relative"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25), inset 1px 0 0 rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {/* Eyebrow heading */}
                <div className="flex items-center font-raleway uppercase gap-2 text-[#A59653] mb-7.5">
                  <div>
                    <PrismicRichText field={item.eyebrow_heading} />
                  </div>
                  <span className="rounded-full w-0.75 h-0.75 bg-[#A59653] " />
                  <div>
                    <PrismicRichText field={item.eyebrow_heading_two} />
                  </div>
                </div>
                {/* Icon & Heading */}
                <div className="flex items-center gap-8 text-[#FEFFF4] mb-7.5">
                  <div>
                    <PrismicNextImage field={item.icon} />
                  </div>
                  <div className="text-[25px] font-monsterrat">
                    <PrismicRichText field={item.card_heading} />
                  </div>
                </div>
                <div className="text-[#FEFFF4] mb-7.5 font-raleway">
                  <PrismicRichText field={item.short_description} />
                </div>
                {/* Line below */}
                <div className="border mb-7.5 border-[#677479]" />

                <div className="flex flex-wrap items-center gap-2 w-[60%]">
                  {item.tags?.split(",").map((tag, i) => {
                    const t = tag.trim().toLowerCase();
                    const color =
                      t === "gold"
                        ? "#A59653"
                        : t === "silver"
                          ? "#A2A2A2"
                          : t === "bronze"
                            ? "#A57953"
                            : "#FEFFF4";

                    return (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-raleway text-sm font-medium tracking-[10%] uppercase"
                        style={{ border: `1px solid ${color}`, color }}
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0 self-center"
                          style={{ background: color }}
                        />
                        {tag.trim()}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Eligibility */}
        <div
          className="mt-5 w-full rounded-2xl px-7.5 py-9"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25), inset 1px 0 0 rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div className="text-[25px] font-monsterrat text-[#FEFFF4] mb-5">
            <PrismicRichText field={slice.primary.second_heading} />
          </div>
          <div className="border border-[#677479] mb-7.5" />
          <PrismicRichText
            field={slice.primary.eligibilities}
            components={{
              list: ({ children }) => (
                <ul className="grid grid-cols-3 gap-x-8 gap-y-3 list-none w-full">
                  {children}
                </ul>
              ),
              listItem: ({ children }) => (
                <li className="flex items-center gap-2 text-[#FEFFF4] font-raleway text-sm">
                  <div className="w-2 shrink-0 text-[#FEFFF4]">●</div>
                  {children}
                </li>
              ),
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AwardCategories;
