// Scroll through Lenis when it is running. Native smooth scrolling fights
// Lenis, which then snaps back to its own position on the next wheel tick.
// `target` is an element or a pixel offset; Lenis honours scroll-margin-top.
export function smoothScrollTo(target) {
  if (window.lenis) {
    window.lenis.scrollTo(target);
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    target?.scrollIntoView({ behavior: "smooth" });
  }
}
