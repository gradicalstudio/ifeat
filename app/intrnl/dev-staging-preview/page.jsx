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
  const page = await client.getSingle("preview").catch(() => notFound());

  return <SliceZone slices={groupWinnerTabs(visibleSlices(page.data.slices))} components={{ ...components, winner_tabs: WinnerTabs }} />;
}

export async function generateMetadata() {
  const client = createClient();
  const page = await client.getSingle("preview").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}