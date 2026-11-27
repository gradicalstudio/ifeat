import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { visibleSlices } from "@/utils/visibleSlices";
import { groupWinnerTabs } from "@/utils/groupWinnerTabs";
import { applyDataMode, DATA_MODES } from "@/utils/worstCase";
import WinnerTabs from "@/components/WinnerTabs";

// Dev-only: the homepage with realistic worst-case data (long names, missing photos,
// empty lists). Pick the data with ?data=demo|worst|empty|one|many. Returns 404 in production.
export const metadata = { robots: { index: false, follow: false } };

const LABELS = { demo: "Demo data", worst: "Worst case", empty: "Empty", one: "One", many: "12 items" };

export default async function Page({ searchParams }) {
  if (process.env.NODE_ENV === "production") notFound();

  const { data } = await searchParams;
  const mode = DATA_MODES.includes(data) ? data : "worst";

  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());
  const slices = applyDataMode(visibleSlices(page.data.slices), mode);

  return (
    <>
      <SliceZone
        slices={groupWinnerTabs(slices)}
        components={{ ...components, winner_tabs: WinnerTabs }}
        context={{ eventDate: page.data.event_date }}
      />
      {/* Plain on purpose: this is test chrome, not part of the design under test */}
      <nav
        aria-label="Test data"
        className="fixed bottom-3 left-1/2 z-200 flex -translate-x-1/2 gap-1 rounded-full bg-neutral-300 p-1 font-sans text-xs shadow"
      >
        {DATA_MODES.map((m) => (
          <a
            key={m}
            href={`?data=${m}`}
            className={`rounded-full px-3 py-1.5 whitespace-nowrap text-neutral-900 ${m === mode ? "bg-white font-semibold" : ""}`}
          >
            {LABELS[m]}
          </a>
        ))}
      </nav>
    </>
  );
}
