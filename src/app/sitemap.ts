// app/sitemap.ts
import { MetadataRoute } from 'next'

// Define your products (could come from database or API)
const PRODUCTS = [
  {
    slug: 'classic-500ml',
    name: 'ORA Classic 500ml',
    priority: 0.8,
  },
  {
    slug: 'imperial-1kg',
    name: 'ORA Imperial 1KG',
    priority: 0.8,
  },
  {
    slug: 'family-pack',
    name: 'ORA Family Pack 2x1KG',
    priority: 0.8,
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate URLs for all products
  const productUrls = PRODUCTS.map((product) => ({
    url: `https://oramills.in/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: product.priority,
  }))

  // Combine with static pages
  return [
    {
      url: 'https://oramills.in',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: 'https://oramills.in/products',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://oramills.in/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://oramills.in/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...productUrls,
  ]
}