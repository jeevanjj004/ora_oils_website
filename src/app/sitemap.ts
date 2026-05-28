import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://oramills.in',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    // Add more pages below as you create them:
    // {
    //   url: 'https://oramills.in/products',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    // {
    //   url: 'https://oramills.in/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },
  ]
}