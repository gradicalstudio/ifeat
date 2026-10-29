// Flag images live in /public. To add a country, drop its SVG there and add a row here.
// "match" holds lowercase names that may appear in the Prismic country text.
const FLAGS = [
  { match: ["india"], src: "/india-logo.svg" },
  { match: ["indonesia"], src: "/indonesia-logo.svg" },
  { match: ["vietnam", "viet nam"], src: "/vietnam-logo.svg" },
  { match: ["spain"], src: "/spainc-logo.svg" },
  { match: ["netherlands", "holland"], src: "/netherlands-logo.svg" },
  { match: ["norway"], src: "/norway-logo.svg" },
  { match: ["australia"], src: "/australia-logo.svg" },
  { match: ["south africa"], src: "/south-africa-logo.svg" },
  {
    match: ["united states", "usa", "u.s.a", "america"],
    src: "/united-states-logo.svg",
  },
];

export function getCountryFlag(country) {
  const lower = country?.toLowerCase() || "";
  return FLAGS.find((flag) => flag.match.some((name) => lower.includes(name)))
    ?.src ?? null;
}
