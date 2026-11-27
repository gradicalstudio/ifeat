/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vimeo video thumbnails used as the VideoComponent poster
    remotePatterns: [
      { protocol: "https", hostname: "i.vimeocdn.com" },
      // Hero image: served through Next image optimization so it comes from our own domain
      { protocol: "https", hostname: "images.prismic.io" },
    ],
  },
};

export default nextConfig;
