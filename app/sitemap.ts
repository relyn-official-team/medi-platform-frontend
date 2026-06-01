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

// /customerinquiry 다국어 랜딩 (ja/tw/hk만 색인 대상, www 도메인 기준)
const CI_URL = 'https://www.relynplatform.com';
const CI_HREFLANG = {
  'ja-JP': `${CI_URL}/customerinquiry/ja`,
  'zh-TW': `${CI_URL}/customerinquiry/tw`,
  'zh-HK': `${CI_URL}/customerinquiry/hk`,
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
    {
      url: `${CI_URL}/customerinquiry/ja`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: CI_HREFLANG },
    },
    {
      url: `${CI_URL}/customerinquiry/tw`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: CI_HREFLANG },
    },
    {
      url: `${CI_URL}/customerinquiry/hk`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: CI_HREFLANG },
    },
  ];
}
