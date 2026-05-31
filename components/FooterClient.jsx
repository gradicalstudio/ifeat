import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

export default function FooterClient({ data }) {
  return (
    <footer className="rounded-xl px-4 md:px-5 xl:px-4 xl:max-w-385 xl:mx-auto xl:mb-4 mb-2.25 w-full font-raleway">
      <div className="bg-[#263B33] rounded-xl lg:pt-21 px-6.25 md:px-19 pt-16 pb-5 lg:px-21.25 lg:pb-10.5">
        {/* Top */}
        <div className="w-full text-white lg:mb-40">
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 md:max-w-80 mx-auto lg:max-w-full gap-x-25.75 gap-y-11.5 lg:gap-30 lg:justify-end">
            <div>
              {/* Explore */}
              {data.explore.map((item) => (
                // Explore
                <div key={item.key} className="flex flex-col">
                  <div className="font-bold xl:text-xl text-lg mb-3.25 lg:mb-5.5">
                    <PrismicRichText field={item.heading} />
                  </div>
                  <div className="flex flex-col gap-1.75 lg:gap-3.25 font-normal text-sm lg:text-lg">
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
                  <div className="font-bold xl:text-xl text-lg mb-3.25 lg:mb-5.5">
                    <PrismicRichText field={item.heading} />
                  </div>
                  <div className="flex flex-col gap-1.75 lg:gap-3.25 font-normal text-sm lg:text-lg">
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
                  <div className="w-full font-bold xl:text-xl text-lg mb-3.25 lg:mb-5.5">
                    <PrismicRichText field={item.heading} />
                  </div>
                  <div className="flex flex-col gap-1.75 lg:gap-3.25 font-normal text-sm lg:text-lg">
                    <div className="hover:underline hover:underline-offset-4">
                      <PrismicNextLink field={item.telephone} />
                    </div>
                    <div className="hover:underline hover:underline-offset-4">
                      <PrismicNextLink field={item.email} />
                    </div>
                    <div>
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

        {/* Bottom */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          {/* Logo */}
          <div className="mb-7.5 lg:mb-0">
            <PrismicNextImage
              className="h-21.5 w-auto lg:h-28 xl:h-40.75"
              field={data.footer_logo}
            />
          </div>
          {/* Legal Links */}
          <div className="lg:self-end">
            {data.legal_links.map((item) => (
              <div
                key={item.key}
                className="flex gap-2 text-[13px] text-white "
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
      </div>
    </footer>
  );
}
