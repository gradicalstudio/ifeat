// Variations of last_year_winners that are shown as year tabs.
// "peopleChoiceAward" (the nominees block) is deliberately left out.
const TAB_VARIATIONS = ["default", "withPeopleChoiceAwardWinners"];

const isWinnerTab = (slice) =>
  slice.slice_type === "last_year_winners" &&
  TAB_VARIATIONS.includes(slice.variation);

// Merges neighbouring winners slices into one "winner_tabs" entry, in page order.
export function groupWinnerTabs(slices = []) {
  const grouped = [];

  for (const slice of slices) {
    if (!isWinnerTab(slice)) {
      grouped.push(slice);
      continue;
    }

    const last = grouped[grouped.length - 1];
    if (last?.slice_type === "winner_tabs") {
      last.tabs.push(slice);
    } else {
      grouped.push({
        id: `winner-tabs-${slice.id}`,
        slice_type: "winner_tabs",
        variation: "default",
        primary: {},
        items: [],
        tabs: [slice],
      });
    }
  }

  return grouped;
}
