/**
 * @typedef {import("@prismicio/client").Content.VideoComponentSlice} VideoComponentSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<VideoComponentSlice>} VideoComponentProps
 * @type {import("react").FC<VideoComponentProps>}
 */
const VideoComponent = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for video_component (variation: {slice.variation})
      slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use your own AI agent with the Prismic CLI
       * 📚 Docs: https://prismic.io/docs/ai#create-slices
       */}
    </section>
  );
};

export default VideoComponent;
