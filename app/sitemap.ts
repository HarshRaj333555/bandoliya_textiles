import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about-bandoliya-textiles", "/textiles", "/embroidery", "/portfolio", "/b2b-textile-solutions", "/contact", "/privacy", "/terms"].map((path, index) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: index === 0 ? "weekly" : "monthly", priority: index === 0 ? 1 : path === "/privacy" || path === "/terms" ? .2 : .8 }));
}

