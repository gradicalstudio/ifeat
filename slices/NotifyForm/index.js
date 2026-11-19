import { PrismicRichText } from "@prismicio/react";
import Heading from "@/components/Heading";
import NotifyFormClient from "@/components/NotifyFormClient";

const richTextLink = {
  hyperlink: ({ node, children }) => (
    <a
      href={node.data.url}
      target={node.data.target}
      rel={node.data.target === "_blank" ? "noopener noreferrer" : undefined}
      className="underline underline-offset-2 hover:text-[#A59653] transition-colors"
    >
      {children}
    </a>
  ),
};

/**
 * @typedef {import("@prismicio/client").Content.NotifyFormSlice} NotifyFormSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<NotifyFormSlice>} NotifyFormProps
 * @type {import("react").FC<NotifyFormProps>}
 */
const NotifyForm = ({ slice }) => {
  const { primary } = slice;

  return (
    <section
      id="notify"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="xl:px-21 px-4 md:px-5 mb-15 lg:mb-25 xl:mb-30 xl:max-w-385 xl:mx-auto font-medium"
    >
      <div className="bg-[#263B33] rounded-tl-[100px] rounded-br-[100px] px-10 pt-14 pb-18 md:pb-14 xl:px-16.75 xl:py-16.5">
        <div className="text-[22px] md:text-[28px] lg:text-[38px] font-monsterrat font-medium leading-tight text-[#FEFFF4]">
          <Heading field={primary.heading} />
        </div>
        <div className="mt-4 text-[15px] md:text-base lg:text-lg font-raleway font-medium text-[#FEFFF4]">
          <PrismicRichText field={primary.description} components={richTextLink} />
        </div>

        <NotifyFormClient
          labels={{
            name: primary.name_label || "Full name",
            company: primary.company_label || "Company",
            email: primary.email_label || "Work Email",
            button: primary.button_label || "Notify me",
          }}
          consent={
            <PrismicRichText field={primary.consent_text} components={richTextLink} />
          }
          success={
            <PrismicRichText
              field={primary.success_message}
              fallback={<p>Thanks! We&apos;ll email you the day applications open.</p>}
              components={richTextLink}
            />
          }
        />
      </div>
    </section>
  );
};

export default NotifyForm;
