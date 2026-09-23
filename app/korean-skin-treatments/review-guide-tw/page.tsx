import LocalizedReviewGuide from "../review-guide-shared/LocalizedReviewGuide";
import { getLocalizedReviewMetadata } from "../review-guide-shared/article";

export const metadata = getLocalizedReviewMetadata("zh-TW");
export default function TaiwanReviewGuidePage() { return <LocalizedReviewGuide locale="zh-TW" />; }
