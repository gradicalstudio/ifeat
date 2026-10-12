// Drops slices the content team has switched off with "hide_toggle" in Prismic.
// Only an explicit true hides a slice, so a missing field keeps it visible.
export function visibleSlices(slices = []) {
  return slices.filter((slice) => slice.primary?.hide_toggle !== true);
}
