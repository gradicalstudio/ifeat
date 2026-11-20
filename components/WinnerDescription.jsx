import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { getCountryFlag } from "@/utils/countryFlag";
import DescriptionModal from "@/components/DescriptionModal";

// Name links change colour on hover so they read as clickable
const nameLinkHover =
  "[&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-[#A59653]";

// "+ Know more" button on the card that opens the full winner description in a modal
export default function WinnerDescription({
  item,
  link,
  medalStyle,
  medalDotStyle,
}) {
  return (
    <DescriptionModal enabled={isFilled.richText(item.description)} link={link}>
      <div className="relative h-60 md:h-79.25">
        <PrismicNextImage
          field={item.image}
          className="object-cover w-full h-full rounded-xl"
        />
        {item.country && (
          <div className="absolute bottom-4.25 items-center justify-center font-medium text-[10px] left-4 bg-white rounded-full px-2 py-1 flex gap-1">
            {getCountryFlag(item.country) && (
              <img
                src={getCountryFlag(item.country)}
                className="w-4.5 h-3 rounded-[2px] object-cover ring-1 ring-black/10"
                alt={item.country}
              />
            )}
            <span className="tracking-wider leading-3">{item.country}</span>
          </div>
        )}
      </div>

      {item.position && (
        <div
          className={`mt-3 xl:mt-5 inline-flex items-center gap-2 rounded-full border px-2 pt-[3px] pb-px ${medalStyle}`}
        >
          <span className={`w-2 h-2 rounded-full ${medalDotStyle}`}></span>
          <span className="text-xs md:text-[13px] lg:text-sm font-medium tracking-wider uppercase">
            {item.position}
          </span>
        </div>
      )}

      <div
        className={`winner-name winner-name-static text-lg md:text-xl lg:text-[25px] mt-3 xl:mt-5 ${nameLinkHover}`}
      >
        <PrismicRichText field={item.name} />
      </div>
      <div className="text-sm md:text-[15px] lg:text-base my-3 xl:my-5">
        <PrismicRichText field={item.project} />
      </div>

      <div className="border-b border-[#677479]" />

      <div className="text-sm md:text-[15px] lg:text-base mt-5 xl:mt-7.5 space-y-3">
        <PrismicRichText field={item.description} />
      </div>
    </DescriptionModal>
  );
}
