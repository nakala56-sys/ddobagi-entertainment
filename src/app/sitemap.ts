import type { MetadataRoute } from "next";
import { navigation } from "@/shared/config/navigation";
import { getSiteUrl } from "@/shared/lib/siteUrl";

const PUBLIC_PATHS = ["/", ...navigation.map(({ href }) => href)] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = getSiteUrl();

    return PUBLIC_PATHS.map((path) => ({
        url: `${siteUrl}${path}`,
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : 0.7,
    }));
}
