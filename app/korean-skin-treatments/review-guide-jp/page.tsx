import LocalizedReviewGuide from "../review-guide-shared/LocalizedReviewGuide";
import { getLocalizedReviewMetadata } from "../review-guide-shared/article";

export const metadata = getLocalizedReviewMetadata("ja-JP");
export default function JapaneseReviewGuidePage() { return <LocalizedReviewGuide locale="ja-JP" />; }
