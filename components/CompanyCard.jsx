import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import CompanyDescription from "@/components/CompanyDescription";

// People's Choice company card. Mobile: logo stacked above the text. From md: logo on the
// left, name / project / actions on the right. Meant to sit in a MobileSlider (hence the
// slide width); from md up it fills its grid cell.
export default function CompanyCard({ item }) {
  return (
    <div className="group flex min-w-0 shrink-0 basis-[88%] flex-col rounded-xl border border-[#677479]/50 p-4 md:basis-auto md:flex-row md:gap-4">
      <div className="h-14 w-full md:flex md:h-24 md:w-24 md:shrink-0 md:items-center md:justify-center">
        <PrismicNextImage
          field={item.company_logo}
          className="h-full w-full object-contain object-left md:object-center"
        />
      </div>
      <div className="mt-4 flex min-w-0 flex-1 flex-col md:mt-0">
        <div className="font-raleway winner-name text-lg md:text-xl [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-[#A59653]">
          <PrismicRichText field={item.company_name} />
        </div>
        <div className="mt-1 text-[13px] font-raleway md:text-sm">
          <PrismicRichText field={item.project_title} />
        </div>

        {/* "+ Know more" opens the full write-up in a modal; the learn-more link shares its row */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 font-raleway text-sm md:text-[15px]">
          <div className="[&>div]:flex-none [&>div]:pb-0">
            <CompanyDescription item={item} />
          </div>
          {isFilled.link(item.learn_more) && (
            <div className="flex items-center gap-2 text-[#A59653]">
              <PrismicNextLink field={item.learn_more} />
              <span className="font-bold">→</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
