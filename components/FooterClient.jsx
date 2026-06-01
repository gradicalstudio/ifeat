"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

function handleSmoothScroll(e, url) {
  if (url?.startsWith("#")) {
    e.preventDefault();
    const el = document.querySelector(url);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function FooterClient({ data }) {
  return (
    <footer className="rounded-xl px-4 md:px-5 xl:px-4 xl:max-w-385 xl:mx-auto xl:mb-4 mb-2.25 w-full font-raleway">
      <div className="bg-[#263B33] rounded-xl lg:pt-21 px-6.25 md:p-10 pt-16 pb-5 lg:px-21.25 lg:py-12">
        <div className="w-full text-white">
          <div className="w-full flex flex-col-reverse md:flex-row lg:max-w-full md:gap-10 lg:gap-30 justify-between">
            <div className="flex flex-col items-center md:items-start justify-between">
              <div className="mb-7.5 lg:mb-0">
                <PrismicNextImage
                  onClick={(e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
                  className="h-21.5 w-auto lg:h-28 xl:h-26"
                  field={data.footer_logo}
                />
              </div>
              <div>
                {data.legal_links.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-2 text-xs tracking-wider text-white"
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
                {data.explore.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="font-medium xl:text-base md:text-sm text-lg mb-3.25 lg:mb-5.5">
                      <PrismicRichText field={item.heading} />
                    </div>
                    <div className="flex flex-col gap-1.75 lg:gap-1.25 tracking-wider font-normal text-sm md:text-xs lg:text-sm">
                      {item.explore_links.map((link, j) => (
                        <PrismicNextLink
                          key={j}
                          field={link}
                          onClick={(e) => handleSmoothScroll(e, link?.url)}
                          className="hover:text-white/70 transition-colors duration-200"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                {data.socials.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="font-medium xl:text-base md:text-sm text-lg mb-3.25 lg:mb-5.5">
                      <PrismicRichText field={item.heading} />
                    </div>
                    <div className="flex flex-col gap-1.75 lg:gap-1.25 tracking-wider font-normal text-sm md:text-xs lg:text-sm">
                      {item.social_links.map((link, j) => (
                        <PrismicNextLink
                          key={j}
                          field={link}
                          className="hover:text-white/70 transition-colors duration-200"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-span-2 lg:col-span-1 mb-11.75">
                {data.contacts.map((item, i) => (
                  <div key={i}>
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
