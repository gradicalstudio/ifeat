// Gold / silver / bronze styling for a winner's "position" text. Class strings are
// written out in full so Tailwind can see them.
const MEDALS = {
  // Label text is darker than the border/dot so it passes contrast on the cream page.
  gold: { color: "#A59653", style: "border-[#A59653] text-[#807235]", dot: "bg-[#A59653]" },
  silver: { color: "#A2A2A2", style: "border-[#A2A2A2] text-[#6E6E6E]", dot: "bg-[#A2A2A2]" },
  bronze: { color: "#A57953", style: "border-[#A57953] text-[#8A6240]", dot: "bg-[#A57953]" },
};
const NEUTRAL = { color: "#677479", style: "border-gray-300 text-gray-400", dot: "bg-gray-300" };

export function getMedal(position) {
  const lower = position?.toLowerCase() || "";
  const key = Object.keys(MEDALS).find((k) => lower.includes(k));
  return { key, ...(key ? MEDALS[key] : NEUTRAL) };
}
