import { isFilled } from "@prismicio/client";
import ImageReel from "@/components/ImageReel";

/**
 * @typedef {import("@prismicio/client").Content.ImageCarouselSlice} ImageCarouselSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageCarouselSlice>} ImageCarouselProps
 * @type {import("react").FC<ImageCarouselProps>}
 */
const ImageCarousel = ({ slice }) => {
  const images = slice.primary.carousel
    .map((item) => item.images)
    .filter((image) => isFilled.image(image));

  if (!images.length) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="xl:max-w-385 px-4 md:px-5 xl:mx-auto xl:px-21 mb-15 lg:mb-25 xl:mb-30"
    >
      <ImageReel images={images} />
    </section>
  );
};

export default ImageCarousel;
