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
    sitemap: 'https://relynplatform.com/sitemap.xml',
    host: 'https://relynplatform.com',
  };
}