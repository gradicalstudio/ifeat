import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Heading from "@/components/Heading";
import WinnerCategory from "@/components/WinnerCategory";
import CompanyCard from "@/components/CompanyCard";
import MobileSlider from "@/components/MobileSlider";
// When rendered inside WinnerTabs, these place the year toggle; otherwise they're no-ops
import { HeadingWithTabBar, TabBarRow } from "@/components/TabSwitcher";

/**
 * @typedef {import("@prismicio/client").Content.LastYearWinnersSlice} LastYearWinnersSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<LastYearWinnersSlice>} LastYearWinnersProps
 * @type {import("react").FC<LastYearWinnersProps>}
 */
const LastYearWinners = ({ slice }) => {
  return (
    <>
      {slice.variation === "default" && (
        <section
          id="winners-default"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className=" xl:max-w-385 px-4 md:px-5 xl:mx-auto xl:px-21 mb-15 lg:mb-25 xl:mb-30"
        >
          <div className="font font-medium">
            {/* Top secton */}
            <div className="mb-10 xl:mb-17.5">
              <HeadingWithTabBar>
                <div
                  className="text-[22px] md:text-[28px] lg:text-[38px]
 font-monsterrat "
                >
                  <Heading field={slice.primary.main_heading} />
                </div>
              </HeadingWithTabBar>
              <div
                className="text-[15px] md:text-base lg:text-lg
 font-raleway lg:w-[74%] mt-3.5"
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
              <WinnerCategory items={slice.primary.categoryone} linkKey="learn_more" />
            </div>

            {/* Last section */}
            <div className="mt-10 xl:mt-17.5">
              <div className="font-raleway text-lg md:text-xl lg:text-[25px] uppercase text-[#A59653] mb-5">
                <PrismicRichText field={slice.primary.category_two_title} />
              </div>
              <WinnerCategory items={slice.primary.category_two} linkKey="link" />
            </div>
          </div>
        </section>
      )}
      {slice.variation === "peopleChoiceAward" && (
        <section
          id="people-choice-award"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className=" xl:max-w-385 px-4 md:px-5 xl:mx-auto xl:px-21 mb-15 lg:mb-25 xl:mb-30"
        >
          <div className="font font-medium">
            {/* This variation's heading sits in a dark banner, so the toggle gets its own row */}
            <TabBarRow className="mb-5 xl:mb-8" />
            {/* Top section */}
            {(isFilled.richText(slice.primary.main_heading) ||
              isFilled.richText(slice.primary.short_description)) && (
              <div className="mb-5 xl:mb-10 w-full bg-[#263B33] rounded-tl-[100px] rounded-br-[100px]">
                <div className="flex flex-col gap-4 w-full justify-between px-10 py-10 xl:px-16.75 xl:py-16.5">
                  {isFilled.richText(slice.primary.main_heading) && (
                    <div className="text-[22px] md:text-[28px] lg:text-[38px] font-monsterrat text-[#FEFFF4]">
                      <Heading field={slice.primary.main_heading} />
                    </div>
                  )}
                  {isFilled.richText(slice.primary.short_description) && (
                    <div className="text-[15px] md:text-base lg:text-lg font-raleway text-[#FEFFF4] ">
                      <PrismicRichText
                        field={slice.primary.short_description}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Companies: horizontal swipe slider on mobile, three-column grid from md up */}
            <MobileSlider gridClassName="md:grid md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3 md:gap-4">
              {slice.primary.companies.map((item, i) => (
                <CompanyCard key={i} item={item} />
              ))}
            </MobileSlider>
          </div>
        </section>
      )}
      {slice.variation === "withPeopleChoiceAwardWinners" && (
        <section>
          <section
            id="people-choice-award-winners"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className=" xl:max-w-385 px-4 md:px-5 xl:mx-auto xl:px-21 mb-15 lg:mb-25 xl:mb-30"
          >
            <div className="font font-medium">
              {/* Top secton */}
              <div className="mb-10 xl:mb-17.5">
                <HeadingWithTabBar>
                  <div
                    className="text-[22px] md:text-[28px] lg:text-[38px]
 font-monsterrat "
                  >
                    <Heading field={slice.primary.main_heading} />
                  </div>
                </HeadingWithTabBar>
                <div
                  className="text-[15px] md:text-base lg:text-lg
 font-raleway lg:w-[74%] mt-3.5"
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
                <WinnerCategory items={slice.primary.categoryone} linkKey="learn_more" />
              </div>

              {/* Second last section */}
              <div className="mt-10 xl:mt-17.5">
                <div className="font-raleway text-lg md:text-xl lg:text-[25px] uppercase text-[#A59653] mb-5">
                  <PrismicRichText field={slice.primary.category_two_title} />
                </div>
                <WinnerCategory items={slice.primary.category_two} linkKey="link" />
              </div>
              {/* People's choice award section */}
              <div className="mt-10 xl:mt-17.5">
                <div className="font-raleway text-lg md:text-xl lg:text-[25px] uppercase text-[#A59653] mb-5">
                  <PrismicRichText field={slice.primary.category_three_title} />
                </div>
                <WinnerCategory items={slice.primary.category_three} linkKey="link" />
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default LastYearWinners;
