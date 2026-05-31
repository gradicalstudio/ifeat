import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.LastYearWinnersSlice} LastYearWinnersSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<LastYearWinnersSlice>} LastYearWinnersProps
 * @type {import("react").FC<LastYearWinnersProps>}
 */
const LastYearWinners = ({ slice }) => {
  {
    /* Country flags map */
  }
  const countryFlags = {
    india: "🇮🇳",
    netherlands: "🇳🇱",
    spain: "🇪🇸",
  };

  const getCountryFlag = (country) => {
    const lower = country?.toLowerCase() || "";
    if (lower.includes("india")) return "/india-logo.svg";
    if (lower.includes("netherlands")) return "/netherlands-logo.svg";
    if (lower.includes("spain")) return "/spainc-logo.svg";
    return null;
  };

  const medalStyles = {
    gold: "border-[#A59653] text-[#A59653]",
    silver: "border-[#A2A2A2] text-[#A2A2A2]",
    bronze: "border-[#A57953] text-[#A57953]",
  };

  const medalDotStyles = {
    gold: "bg-[#A59653]",
    silver: "bg-[#A2A2A2]",
    bronze: "bg-[#A57953]",
  };

  const getMedalStyle = (position) => {
    const lower = position?.toLowerCase() || "";
    if (lower.includes("gold")) return medalStyles.gold;
    if (lower.includes("silver")) return medalStyles.silver;
    if (lower.includes("bronze")) return medalStyles.bronze;
    return "border-gray-300 text-gray-400";
  };

  const getMedalDotStyle = (position) => {
    const lower = position?.toLowerCase() || "";
    if (lower.includes("gold")) return medalDotStyles.gold;
    if (lower.includes("silver")) return medalDotStyles.silver;
    if (lower.includes("bronze")) return medalDotStyles.bronze;
    return "bg-gray-300";
  };
  return (
    <section
      id="winners-2025"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" xl:max-w-385 px-4 md:px-5 xl:mx-auto xl:px-21 mb-15 lg:mb-25 xl:mb-30"
    >
      <div className="font font-medium">
        {/* Top secton */}
        <div className="mb-10 xl:mb-17.5">
          <div
            className="text-[22px] md:text-[28px] lg:text-[38px]
 font-monsterrat "
          >
            <PrismicRichText field={slice.primary.main_heading} />
          </div>
          <div
            className="text-[15px] md:text-base lg:text-lg
 font-raleway w-[74%] mt-3.5"
          >
            <PrismicRichText field={slice.primary.short_description} />
          </div>
        </div>
        {/* Middle section */}
        <div>
          <div
            className="font-raleway text-lg md:text-xl lg:text-[25px]
 uppercase text-[#A59653] mb-5"
          >
            <PrismicRichText field={slice.primary.cateory_one_title} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {slice.primary.categoryone.map((item, i) => (
              <div
                key={i}
                className="   flex flex-col"
              >
                <div>
                  <div className="relative h-79.25">
                    <PrismicNextImage
                      field={item.image}
                      className="object-cover w-full h-full rounded-xl"
                    />
                    <div className="absolute bottom-4.25 items-center justify-center font-medium font-raleway text-[10px] left-4 bg-white rounded-full px-2 py-1 flex gap-1">
                      <div>
                        {getCountryFlag(item.country) && (
                          <img
                            src={getCountryFlag(item.country)}
                            className="w-4 h-2.5 rounded-xs object-fill"
                            alt={item.country}
                          />
                        )}
                      </div>
                      <span className="tracking-wider leading-tight">
                        {item.country}
                      </span>
                    </div>
                  </div>

                  {/* Gold / Silver / Bronze badge */}
                  <div className="md:h-40 xl:h-48">
                    <div
                      className={` my-3 xl:my-5 inline-flex items-center gap-2 rounded-full border px-2 py-0.5 ${getMedalStyle(item.position)}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${getMedalDotStyle(item.position)}`}
                      ></span>
                      <span className="font-raleway text-xs md:text-[13px] lg:text-sm font-medium tracking-wider uppercase">
                        {item.position}
                      </span>
                    </div>

                    <div
                      className="font-raleway text-lg md:text-xl lg:text-[25px]
"
                    >
                      <PrismicRichText field={item.name} />
                    </div>
                    <div
                      className="text-sm md:text-[15px] lg:text-base
font-raleway my-3 xl:my-5 "
                    >
                      <PrismicRichText field={item.project} />
                    </div>
                  </div>
                </div>

                {/* Line always at the same vertical position across cards */}
                <div className="border-b border-[#677479]" />

                {/* Description grows to fill remaining space */}
                <div className="font-raleway text-sm md:text-[15px] lg:text-base mt-7.5 flex-1">
                  <PrismicRichText field={item.description} />
                </div>

                {/* Learn more pinned to bottom */}
                <div className="py-5 flex text-sm md:text-[15px] lg:text-base gap-2 text-[#A59653] ">
                  <PrismicNextLink field={item.learn_more} />
                  <span className="font-bold">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last section */}
        <div className="mt-10 xl:mt-17.5">
          <div className="font-raleway text-lg md:text-xl lg:text-[25px] uppercase text-[#A59653] mb-5">
            <PrismicRichText field={slice.primary.category_two_title} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {slice.primary.category_two.map((item, i) => (
              <div
                key={i}
                className="flex flex-col"
              >
                <div>
                  <div className="relative h-79.25">
                    <PrismicNextImage
                      field={item.image}
                      className="object-cover w-full h-full rounded-xl"
                    />
                    <div className="absolute bottom-4.25 items-center justify-center font-medium font-raleway text-[10px] left-4 bg-white rounded-full px-2 py-1 flex gap-1">
                      <div>
                        {getCountryFlag(item.country) && (
                          <img
                            src={getCountryFlag(item.country)}
                            className="w-4 h-2.5 rounded-xs object-fill"
                            alt={item.country}
                          />
                        )}
                      </div>
                      <span className="tracking-wider leading-tight">
                        {item.country}
                      </span>
                    </div>
                  </div>

                  {/* Gold / Silver / Bronze badge */}
                  <div className="md:h-40 xl:h-48">
                    <div
                      className={`my-3 xl:my-5 inline-flex items-center gap-2 rounded-full border px-2 py-0.5 ${getMedalStyle(item.position)}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${getMedalDotStyle(item.position)}`}
                      ></span>
                      <span className="font-raleway text-xs md:text-[13px] lg:text-sm font-medium tracking-wider uppercase">
                        {item.position}
                      </span>
                    </div>

                    <div
                      className="font-raleway text-lg md:text-xl lg:text-[25px]
"
                    >
                      <PrismicRichText field={item.name} />
                    </div>
                    <div
                      className="text-sm md:text-[15px] lg:text-base
 font-raleway my-3 xl:my-5 md:h-12 lg:h-14"
                    >
                      <PrismicRichText field={item.project} />
                    </div>
                  </div>
                </div>

                {/* Line always at the same vertical position across cards */}
                <div className="border-b border-[#677479]" />

                {/* Description grows to fill remaining space */}
                <div
                  className="font-raleway text-sm md:text-[15px] lg:text-base
 mt-7.5 flex-1"
                >
                  <PrismicRichText field={item.description} />
                </div>

                {/* Learn more pinned to bottom */}
                <div
                  className="py-5 flex gap-2  text-sm md:text-[15px] lg:text-base
text-[#A59653] "
                >
                  <PrismicNextLink field={item.link} />
                  <span className="font-bold">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastYearWinners;
