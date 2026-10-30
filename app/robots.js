import { siteUrl } from "@/utils/siteUrl";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Staging preview, API routes and the Slice Machine simulator stay out of search
      disallow: ["/intrnl/", "/api/", "/slice-simulator"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
