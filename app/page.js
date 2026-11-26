import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { visibleSlices } from "@/utils/visibleSlices";
import { groupWinnerTabs } from "@/utils/groupWinnerTabs";
import WinnerTabs from "@/components/WinnerTabs";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return <SliceZone slices={groupWinnerTabs(visibleSlices(page.data.slices))} components={{ ...components, winner_tabs: WinnerTabs }} context={{ eventDate: page.data.event_date }} />;
}

export async function generateMetadata() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      // Small JPEG: WhatsApp skips share images over ~300 KB and LinkedIn is happiest with JPEG/PNG
      images: [
        {
          url: asImageSrc(page.data.meta_image, { auto: "compress", fm: "jpg", w: 1200, h: 630, q: 80 }) ?? "",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}