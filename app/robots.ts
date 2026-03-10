import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/admin/',
          '/agency/',
          '/hospital/',
        ],
      },
    ],
    sitemap: 'https://app.relynplatform.com/sitemap.xml',
    host: 'https://app.relynplatform.com',
  };
}