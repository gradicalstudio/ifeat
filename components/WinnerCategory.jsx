import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import CountryChip from "@/components/CountryChip";
import WinnerDescription from "@/components/WinnerDescription";
import WinnersPodium from "@/components/WinnersPodium";
import { getMedal } from "@/utils/medal";

// One winners category. Below md it's the podium layout, from md up a three-column card grid.
// `linkKey` is the item's link field, which differs between categories (learn_more / link).
export default function WinnerCategory({ items, linkKey }) {
  return (
    <>
      <div className="md:hidden">
        <WinnersPodium items={items} linkKey={linkKey} />
      </div>

      <div className="hidden md:grid md:grid-cols-3 md:gap-4">
        {items.map((item, i) => {
          const medal = getMedal(item.position);
          const link = item[linkKey];
          return (
            <div key={i} className="group flex flex-col">
              <div>
                <div className="relative h-79.25">
                  <PrismicNextImage
                    field={item.image}
                    className="object-cover w-full h-full rounded-xl"
                  />
                  <CountryChip country={item.country} className="absolute bottom-4.25 left-4" />
                </div>

                {/* Gold / Silver / Bronze badge, hidden when no position is set */}
                <div>
                  {item.position && (
                    <div
                      className={`my-3 xl:my-5 inline-flex items-center gap-2 rounded-full border px-2 pt-[3px] pb-px ${medal.style}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${medal.dot}`}></span>
                      <span className="font-raleway text-xs md:text-[13px] lg:text-sm font-medium tracking-wider uppercase">
                        {item.position}
                      </span>
                    </div>
                  )}

                  <div
                    className={`font-raleway text-lg md:text-xl lg:text-[25px] winner-name [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-[#A59653] ${item.position ? "" : "mt-3 xl:mt-5"}`}
                  >
                    <PrismicRichText field={item.name} />
                  </div>
                  <div className="text-sm md:text-[15px] lg:text-base font-raleway my-3 xl:my-5">
                    <PrismicRichText field={item.project} />
                  </div>
                </div>
              </div>

              {/* "+ Know more" opens the full description in a modal */}
              <WinnerDescription
                item={item}
                link={link}
                medalStyle={medal.style}
                medalDotStyle={medal.dot}
              />

              {/* Learn more pinned to bottom */}
              {isFilled.link(link) && (
                <div className="py-5 flex gap-2 text-sm md:text-[15px] lg:text-base text-[#A59653]">
                  <PrismicNextLink field={link} />
                  <span className="font-bold">→</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
