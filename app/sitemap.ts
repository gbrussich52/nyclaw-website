import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://nyclaw.io", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://nyclaw.io/services/ai-automation", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://nyclaw.io/services/ai-consulting", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://nyclaw.io/services/ai-marketing", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://nyclaw.io/knowledge", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://nyclaw.io/resources", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://nyclaw.io/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];
}
