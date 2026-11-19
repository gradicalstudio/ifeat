/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vimeo video thumbnails used as the VideoComponent poster
    remotePatterns: [{ protocol: "https", hostname: "i.vimeocdn.com" }],
  },
};

export default nextConfig;
