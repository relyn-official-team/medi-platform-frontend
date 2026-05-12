import type { MetadataRoute } from 'next';

const SITE_URL = 'https://relynplatform.com';

const HREFLANG = {
  'ko-KR': `${SITE_URL}/`,
  'en-US': `${SITE_URL}/en`,
  'ja-JP': `${SITE_URL}/ja`,
  'zh-CN': `${SITE_URL}/zh`,
  'th-TH': `${SITE_URL}/th`,
  'x-default': `${SITE_URL}/`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: HREFLANG },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: HREFLANG },
    },
    {
      url: `${SITE_URL}/ja`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: HREFLANG },
    },
    {
      url: `${SITE_URL}/zh`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: HREFLANG },
    },
    {
      url: `${SITE_URL}/th`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: HREFLANG },
    },
  ];
}
