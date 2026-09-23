import LocalizedReviewCards from "../../review-guide-shared/LocalizedReviewCards";
import { getLocalizedReviewMetadata } from "../../review-guide-shared/article";

export const metadata = getLocalizedReviewMetadata("ja-JP", true);
export default function JapaneseReviewCardsPage() { return <LocalizedReviewCards locale="ja-JP" />; }
