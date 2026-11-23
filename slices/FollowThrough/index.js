import CtaBox from "@/components/CtaBox";

/**
 * @typedef {import("@prismicio/client").Content.FollowThroughSlice} FollowThroughSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FollowThroughSlice>} FollowThroughProps
 * @type {import("react").FC<FollowThroughProps>}
 */
const FollowThrough = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="xl:px-21 px-4 md:px-5 mb-15 lg:mb-25 xl:mb-30 xl:max-w-385 xl:mx-auto font-medium"
    >
      <CtaBox
        heading={slice.primary.heading}
        description={slice.primary.description}
        cta={slice.primary.cta}
      />
    </section>
  );
};

export default FollowThrough;
