import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import CountryChip from "@/components/CountryChip";
import WinnerDescription from "@/components/WinnerDescription";
import { getMedal } from "@/utils/medal";

const nameClass =
  "winner-name font-raleway [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-[#A59653]";

// "+ Know more" without the extra bottom padding WinnerDescription adds for the desktop grid
function Know({ item, link, light = false }) {
  const medal = getMedal(item.position);
  return (
    <div
      className={`[&>div]:pb-0 ${light ? "[&_button]:text-white [&_button:hover]:text-[#E5D58A]" : ""}`}
    >
      <WinnerDescription
        item={item}
        link={link}
        medalStyle={medal.style}
        medalDotStyle={medal.dot}
      />
    </div>
  );
}

function Hero({ item: hero, linkKey }) {
  const heroMedal = getMedal(hero.position);
  // no placement (e.g. People's Choice): use the brand gold instead of a neutral grey
  const accent = hero.position ? heroMedal.color : "#A59653";
  return (
    <div
      className="relative h-110 overflow-hidden rounded-xl"
      style={{ boxShadow: `0 0 0 1px ${accent}` }}
    >
      <PrismicNextImage
        field={hero.image}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent" />
      <div className="absolute left-4 top-4 flex items-center gap-2">
        {hero.position && (
          <div
            className="inline-flex items-center gap-2 rounded-full border bg-black/45 px-2.5 pt-[4.5px] pb-[3.5px] text-xs font-medium font-raleway uppercase tracking-wider backdrop-blur-sm"
            style={{ borderColor: heroMedal.color, color: heroMedal.color }}
          >
            <span className={`h-2 w-2 rounded-full ${heroMedal.dot}`} />
            {hero.position}
          </div>
        )}
        <CountryChip country={hero.country} flagOnly />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className={`${nameClass} text-[22px]`}>
          <PrismicRichText field={hero.name} />
        </div>
        <div className="mt-2 mb-3 text-sm font-raleway text-white/80 line-clamp-3">
          <PrismicRichText field={hero.project} />
        </div>
        <Know item={hero} link={hero[linkKey]} light />
      </div>
    </div>
  );
}

// Mobile layout for a winners category. A gold winner, or an item with no placement at all
// (People's Choice), gets a large photo card; silver / bronze become compact rows beneath it.
// Consecutive rows share a grid so their heights match.
const isHero = (item) =>
  !item.position || getMedal(item.position).key === "gold";

function Row({ item, linkKey }) {
  const medal = getMedal(item.position);
  return (
    <div
      className="flex gap-3 rounded-xl border p-2"
      style={{ borderColor: `${medal.color}99` }}
    >
      <div className="relative min-h-28 w-30 shrink-0 overflow-hidden rounded-lg">
        <PrismicNextImage
          field={item.image}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {(item.position || item.country) && (
          <div className="flex items-center gap-2">
            {item.position && (
              <div
                className={`inline-flex items-center gap-1.5 rounded-full border px-2 pt-[3px] pb-px text-[11px] font-medium font-raleway uppercase tracking-wider ${medal.style}`}
              >
                <span className={`h-2 w-2 rounded-full ${medal.dot}`} />
                {item.position}
              </div>
            )}
            <CountryChip country={item.country} flagOnly />
          </div>
        )}
        <div className={`${nameClass} text-lg leading-snug`}>
          <PrismicRichText field={item.name} />
        </div>
        <div className="text-[13px] font-raleway line-clamp-2">
          <PrismicRichText field={item.project} />
        </div>
        <div className="mt-auto pt-1">
          <Know item={item} link={item[linkKey]} />
        </div>
      </div>
    </div>
  );
}

export default function WinnersPodium({ items, linkKey }) {
  // [{ hero: item } | { rows: [item, ...] }], keeping the original order
  const blocks = [];
  for (const item of items) {
    if (isHero(item)) blocks.push({ hero: item });
    else if (blocks.at(-1)?.rows) blocks.at(-1).rows.push(item);
    else blocks.push({ rows: [item] });
  }

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, i) =>
        block.hero ? (
          <Hero key={i} item={block.hero} linkKey={linkKey} />
        ) : (
          // auto-rows-fr: every row takes the height of the tallest, so the photos match
          <div key={i} className="grid auto-rows-fr gap-3">
            {block.rows.map((item, j) => (
              <Row key={j} item={item} linkKey={linkKey} />
            ))}
          </div>
        ),
      )}
    </div>
  );
}
