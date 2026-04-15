import type { MetadataRoute } from "next";
import { getCanadaDirectoryIndex } from "@/lib/canadaFacilities";
import { getDirectoryIndex } from "@/lib/stateFacilities";

const siteUrl = "https://funeraldirectories.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [directory, canadaDirectory] = await Promise.all([
    getDirectoryIndex(),
    getCanadaDirectoryIndex(),
  ]);

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/advertise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  for (const state of directory) {
    if (!state.stateSlug) continue;
    entries.push({
      url: `${siteUrl}/${state.stateSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const city of state.cities) {
      if (!city.citySlug) continue;
      entries.push({
        url: `${siteUrl}/${state.stateSlug}/${city.citySlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  if (canadaDirectory.length > 0) {
    entries.push({
      url: `${siteUrl}/canada`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    });
    for (const province of canadaDirectory) {
      if (!province.provinceSlug) continue;
      entries.push({
        url: `${siteUrl}/canada/${province.provinceSlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.75,
      });
      for (const city of province.cities) {
        if (!city.citySlug) continue;
        entries.push({
          url: `${siteUrl}/canada/${province.provinceSlug}/${city.citySlug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.65,
        });
      }
    }
  }

  return entries;
}
