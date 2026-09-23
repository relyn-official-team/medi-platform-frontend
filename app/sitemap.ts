import type { MetadataRoute } from 'next';
import { ARTICLE_IMAGES, ARTICLE_URL } from './korean-skin-treatments/upsell-kr/article';
import { ARTICLE_IMAGES as TW_IMAGES, ARTICLE_URL as TW_URL } from './korean-skin-treatments/upsell-tw/article';
import { ARTICLE_IMAGES as JP_IMAGES, ARTICLE_URL as JP_URL } from './korean-skin-treatments/upsell-jp/article';
import { SKIN_GUIDE_LANGUAGES } from '@/lib/skin-guide-locales';
import { REVIEW_GUIDE_LANGUAGES } from '@/lib/review-guide-locales';

const SITE_URL = 'https://relynplatform.com';

const HREFLANG = {
  'ko-KR': `${SITE_URL}/`,
  'en-US': `${SITE_URL}/en`,
  'ja-JP': `${SITE_URL}/ja`,
  'zh-CN': `${SITE_URL}/zh`,
  'th-TH': `${SITE_URL}/th`,
  'x-default': `${SITE_URL}/`,
};

// 상담 랜딩은 각 페이지가 선언한 www 대표 주소를 유지한다.
const CI_URL = 'https://www.relynplatform.com';
const CI_HREFLANG = {
  'ja-JP': `${CI_URL}/customerinquiry/ja`,
  'zh-TW': `${CI_URL}/customerinquiry/tw`,
  'zh-HK': `${CI_URL}/customerinquiry/hk`,
};

const B2B_HREFLANG = {
  'ko-KR': `${CI_URL}/customerinquiry/b2b`,
  'th-TH': `${CI_URL}/customerinquiry/b2b/th`,
  'x-default': `${CI_URL}/customerinquiry/b2b`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  // 실제 콘텐츠 수정일을 관리하기 전에는 빌드 시각을 lastModified로 사용하지 않는다.
  return [
    ...Object.values(REVIEW_GUIDE_LANGUAGES).map(url => ({ url, changeFrequency: 'monthly' as const, priority: 0.7, alternates: { languages: REVIEW_GUIDE_LANGUAGES } })),
    {
      url: ARTICLE_URL,
      images: ARTICLE_IMAGES.map((image) => image.url),
      alternates: { languages: SKIN_GUIDE_LANGUAGES },
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: TW_URL,
      images: TW_IMAGES.map((image) => image.url),
      alternates: { languages: SKIN_GUIDE_LANGUAGES },
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: JP_URL,
      images: JP_IMAGES.map((image) => image.url),
      alternates: { languages: SKIN_GUIDE_LANGUAGES },
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: HREFLANG },
    },
    {
      url: `${SITE_URL}/en`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: HREFLANG },
    },
    {
      url: `${SITE_URL}/ja`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: HREFLANG },
    },
    {
      url: `${SITE_URL}/zh`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: HREFLANG },
    },
    {
      url: `${SITE_URL}/th`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: HREFLANG },
    },
    {
      url: `${CI_URL}/customerinquiry/ja`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: CI_HREFLANG },
    },
    {
      url: `${CI_URL}/customerinquiry/tw`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: CI_HREFLANG },
    },
    {
      url: `${CI_URL}/customerinquiry/hk`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: CI_HREFLANG },
    },
    {
      url: B2B_HREFLANG['ko-KR'],
      alternates: { languages: B2B_HREFLANG },
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: B2B_HREFLANG['th-TH'],
      alternates: { languages: B2B_HREFLANG },
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
