export const ARTICLE_REACTION_PAGES = ["upsell-kr", "upsell-tw", "upsell-jp", "review-guide-kr", "review-guide-tw", "review-guide-jp"] as const;
export type ArticleReactionPage = typeof ARTICLE_REACTION_PAGES[number];

export function isArticleReactionPage(value: unknown): value is ArticleReactionPage {
  return typeof value === "string" && ARTICLE_REACTION_PAGES.some(page => page === value);
}

// Reading and cards are two views of the same article; languages stay separate.
export function getArticleReactionPage(pathname: string): ArticleReactionPage | null {
  const match = /^\/korean-skin-treatments\/([^/]+)(?:\/cards)?\/?$/.exec(pathname);
  return match && isArticleReactionPage(match[1]) ? match[1] : null;
}
