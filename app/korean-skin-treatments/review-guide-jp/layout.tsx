import type { ReactNode } from "react";
import DocumentLanguage from "../upsell-jp/DocumentLanguage";
import "../upsell-kr/guide.css";
import "../review-guide-kr/review-guide.css";
import "../review-guide-shared/localized.css";

export default function JapaneseReviewLayout({ children }: { children: ReactNode }) { return <div lang="ja-JP"><DocumentLanguage />{children}</div>; }
