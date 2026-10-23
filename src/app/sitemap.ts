import type { MetadataRoute } from "next";
import { navigation } from "@/shared/config/navigation";
import { getSiteUrl } from "@/shared/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
    return navigation.map(({ href }) => ({ url: `${getSiteUrl()}${href}`, changeFrequency: "monthly", priority: String(href) === "/" ? 1 : 0.7 }));
}
