import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

export default function FooterClient({ data }) {
  return (
    <footer className="rounded-xl px-4 md:px-5 xl:px-4 xl:max-w-385 xl:mx-auto xl:mb-4 mb-2.25 w-full font-raleway">
      <div className="bg-[#263B33] rounded-xl lg:pt-21 px-6.25 md:p-10 pt-16 pb-5 lg:px-21.25 lg:py-12">
        {/* Top */}
        <div className="w-full text-white ">
          <div className="w-full  flex flex-col-reverse md:flex-row  lg:max-w-full md:gap-10    lg:gap-30 justify-between">
            <div className="flex flex-col items-center justify-between">
              <div className="mb-7.5 lg:mb-0">
                <PrismicNextImage
                  className="h-21.5 w-auto  lg:h-28 xl:h-26"
                  field={data.footer_logo}
                />
              </div>
              <div>
                {data.legal_links.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-2 text-xs tracking-wider text-white "
                  >
                    <div className="hover:underline hover:underline-offset-4">
                      <PrismicNextLink field={item.terms_and_conditions} />
                    </div>
                    <div>
                      <span>|</span>
                    </div>
                    <div className="hover:underline hover:underline-offset-4">
                      <PrismicNextLink field={item.privacy_and_cookies} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-20 md:gap-10 md:flex md:flex-row xl:gap-20">
              <div>
                {/* Explore */}
                {data.explore.map((item) => (
                  // Explore
                  <div key={item.key} className="flex flex-col">
                    <div className="font-medium xl:text-base md:text-sm text-lg mb-3.25 lg:mb-5.5">
                      <PrismicRichText field={item.heading} />
                    </div>
                    <div className="flex flex-col gap-1.75 lg:gap-1.25 tracking-wider font-normal text-sm md:text-xs lg:text-sm">
                      {item.explore_links.map((link) => (
                        <PrismicNextLink key={link.key} field={link} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {/* Socials */}
                {data.socials.map((item) => (
                  // Socials
                  <div key={item.key} className="flex flex-col">
                    <div className="font-medium xl:text-base md:text-sm text-lg mb-3.25 lg:mb-5.5">
                      <PrismicRichText field={item.heading} />
                    </div>
                    <div className="flex flex-col gap-1.75 lg:gap-1.25 tracking-wider font-normal text-sm md:text-xs lg:text-sm">
                      {item.social_links.map((link) => (
                        <PrismicNextLink key={link.key} field={link} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-span-2 lg:col-span-1 mb-11.75">
                {/* Contact */}
                {data.contacts.map((item) => (
                  // Contact
                  <div key={item.key}>
                    <div className="font-medium xl:text-base md:text-sm text-lg mb-3.25 lg:mb-5.5">
                      <PrismicRichText field={item.heading} />
                    </div>
                    <div className="flex flex-col gap-1.75 lg:gap-1.25 tracking-wider font-normal text-sm md:text-xs lg:text-sm">
                      <div className="hover:underline hover:underline-offset-4">
                        <PrismicNextLink field={item.telephone} />
                      </div>
                      <div className="hover:underline hover:underline-offset-4">
                        <PrismicNextLink field={item.email} />
                      </div>
                      <div className="mb-2">
                        <PrismicRichText field={item.short_description} />
                      </div>
                      <div>
                        <PrismicRichText field={item.address} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
