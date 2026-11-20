import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import DescriptionModal from "@/components/DescriptionModal";

// "+ Know more" button on a People's Choice card that opens the full write-up in a modal
export default function CompanyDescription({ item }) {
  return (
    <DescriptionModal
      enabled={isFilled.richText(item.short_paragraph)}
      link={item.learn_more}
    >
      <div className="w-48 h-24 md:w-56 md:h-32">
        <PrismicNextImage
          field={item.company_logo}
          className="w-full h-full object-contain object-left"
        />
      </div>
      <div className="winner-name winner-name-static text-lg md:text-xl lg:text-[25px] mt-3 xl:mt-5 [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-[#A59653]">
        <PrismicRichText field={item.company_name} />
      </div>
      <div className="text-sm md:text-[15px] lg:text-base my-3 xl:my-5">
        <PrismicRichText field={item.project_title} />
      </div>
      <div className="text-sm md:text-[15px] lg:text-base text-[#A59653]">
        <PrismicRichText field={item.one_line_impact_statement} />
      </div>

      <div className="border-b border-[#677479] mt-5" />

      <div className="text-sm md:text-[15px] lg:text-base mt-5 xl:mt-7.5 space-y-3">
        <PrismicRichText field={item.short_paragraph} />
      </div>
    </DescriptionModal>
  );
}
