import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/en',
          '/ja',
          '/zh',
          '/th',
          '/privacy',
          '/customerinquiry/ja',
          '/customerinquiry/tw',
          '/customerinquiry/hk',
        ],
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://relynplatform.com/sitemap.xml',
    host: 'https://relynplatform.com',
  };
}
