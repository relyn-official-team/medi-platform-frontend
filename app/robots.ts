import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/ja', '/en', '/zh'],
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/admin/',
          '/agency/',
          '/hospital/',
          '/privacy',
        ],
      },
    ],
    sitemap: 'https://app.relynplatform.com/sitemap.xml',
    host: 'https://app.relynplatform.com',
  };
}