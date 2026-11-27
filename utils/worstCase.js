// Dev-only test data for /intrnl/worst-case. Swaps the Prismic slice data at the same
// boundary the real page uses, so the components under test are never edited.
// Values are realistic: long legal company names, long regions, missing photos, one-word names.

const rt = (...paragraphs) =>
  paragraphs.map((text) => ({ type: "paragraph", text, spans: [], direction: "ltr" }));
const NO_IMAGE = {};
const NO_LINK = { link_type: "Any" };

const LONG_DESCRIPTION = rt(
  "Givaudan's Regenerative Sourcing Programme supports 4,200 smallholder vanilla growers across Northern Madagascar and the Comoros Islands through multi-year purchase agreements, on-farm agronomy training and a traceable payment platform that pays growers within 48 hours of delivery.",
  "Since 2021 the programme has expanded from 12 cooperatives to 61, introduced shade-grown intercropping on 3,800 hectares, and cut average field-to-factory transit time from 19 days to 6. Independent verification of the figures was carried out by a third-party auditor in 2025.",
  "Partners include local cooperatives, two regional agricultural universities and the national extension service. Growers have reported an average 31% increase in household income, while the project has avoided an estimated 9,400 tonnes of CO2e through reduced burning and improved curing practices.",
);

const WINNERS = [
  {
    name: rt("Givaudan Fragrances & Flavours (Singapore) Pte. Ltd. – Asia Pacific Regional Sourcing Hub"),
    project: rt("Regenerative Sourcing Programme for Smallholder Vanilla Cooperatives Across Northern Madagascar and the Comoros Islands"),
    country: "AMROHA, UTTAR PRADESH, INDIA",
    position: "GOLD",
    description: LONG_DESCRIPTION,
  },
  {
    name: rt("Jo"),
    project: rt("Q"),
    country: "",
    position: null,
    description: [],
    learn_more: NO_LINK,
    link: NO_LINK,
  },
  {
    name: rt("Société Générale d'Extraction Végétale – Parfums et Arômes de Provence"),
    project: rt("ปรับปรุงห่วงโซ่อุปทานพริกไทยอย่างยั่งยืน (Sustainable Pepper Supply Chain Programme)"),
    country: "SAINT VINCENT AND THE GRENADINES",
    position: "SILVER",
    image: NO_IMAGE,
    description: LONG_DESCRIPTION,
  },
];

const COMPANIES = [
  {
    company_name: rt("Givaudan Fragrances & Flavours (Singapore) Pte. Ltd. – Asia Pacific Regional Sourcing Hub"),
    project_title: rt("Regenerative Sourcing Programme for Smallholder Vanilla Cooperatives Across Northern Madagascar"),
    one_line_impact_statement: rt("Paying 4,200 smallholder growers within 48 hours of delivery, and lifting household income by 31% since 2021."),
    short_paragraph: LONG_DESCRIPTION,
  },
  {
    company_name: rt("Jo"),
    project_title: rt("Q"),
    one_line_impact_statement: [],
    short_paragraph: [],
    learn_more: NO_LINK,
  },
  {
    company_name: rt("Société Générale d'Extraction Végétale – Parfums et Arômes de Provence"),
    project_title: rt("ปรับปรุงห่วงโซ่อุปทานพริกไทยอย่างยั่งยืน"),
    company_logo: NO_IMAGE,
    short_paragraph: LONG_DESCRIPTION,
  },
];

const JURY = [
  {
    name: rt("Aleksandra Wiśniewska-Kowalczyk"),
    title: rt("Vice President, Global Sustainability & Corporate Responsibility (EMEA & APAC)"),
    company: rt("Northwind Industries Holdings International Limited"),
  },
  { name: rt("Jo"), title: [], company: [], image: NO_IMAGE },
  {
    name: rt("ณัฐพล ศรีสุวรรณ"),
    title: rt("ประธานเจ้าหน้าที่ฝ่ายความยั่งยืน"),
    company: rt("บริษัท เอ็กซ์แซมเพิล อินเตอร์เนชั่นแนล จำกัด (มหาชน)"),
  },
];

const FAQS = [
  {
    title: rt("If my company has several subsidiaries in different countries, can each subsidiary submit its own project, or must the application come from the parent company only?"),
    info: LONG_DESCRIPTION,
  },
  { title: rt("Fee?"), info: rt("No.") },
];

const WINNER_KEYS = ["categoryone", "category_two", "category_three"];

// Cycles the worst-case rows over the items, keeping each item's own image and links
// unless the row says otherwise.
const overlay = (list, rows) => list.map((item, i) => ({ ...item, ...rows[i % rows.length] }));

const MANY = 12;
const repeat = (list) =>
  list.length ? Array.from({ length: MANY }, (_, i) => list[i % list.length]) : list;

const transforms = {
  worst: (list, rows) => overlay(list, rows),
  empty: () => [],
  one: (list) => list.slice(0, 1),
  many: (list) => repeat(list),
};

export const DATA_MODES = ["demo", "worst", "empty", "one", "many"];

export function applyDataMode(slices, mode) {
  const run = transforms[mode];
  if (!run) return slices;

  return slices.map((slice) => {
    const primary = { ...slice.primary };
    switch (slice.slice_type) {
      case "last_year_winners":
        if (slice.variation === "peopleChoiceAward") {
          primary.companies = run(primary.companies ?? [], COMPANIES);
        } else {
          for (const key of WINNER_KEYS) {
            if (primary[key]) primary[key] = run(primary[key], WINNERS);
          }
        }
        break;
      case "jury_panel":
        primary.jury_cards = run(primary.jury_cards ?? [], JURY);
        break;
      case "fa_q":
        primary.faqs = run(primary.faqs ?? [], FAQS);
        break;
      default:
        return slice;
    }
    return { ...slice, primary };
  });
}
