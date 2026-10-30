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
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}