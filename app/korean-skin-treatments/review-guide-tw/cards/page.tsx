import LocalizedReviewCards from "../../review-guide-shared/LocalizedReviewCards";
import { getLocalizedReviewMetadata } from "../../review-guide-shared/article";

export const metadata = getLocalizedReviewMetadata("zh-TW", true);
export default function TaiwanReviewCardsPage() { return <LocalizedReviewCards locale="zh-TW" />; }
