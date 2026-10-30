import { PrismicRichText } from "@prismicio/react";

// Renders a rich text field as a real heading tag, whatever block type the editor picked
export default function Heading({ field, as: Tag = "h2" }) {
  const heading = ({ children }) => <Tag>{children}</Tag>;

  return (
    <PrismicRichText
      field={field}
      components={{
        paragraph: heading,
        heading1: heading,
        heading2: heading,
        heading3: heading,
        heading4: heading,
        heading5: heading,
        heading6: heading,
      }}
    />
  );
}
