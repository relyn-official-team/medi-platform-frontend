import type { ReactNode } from "react";
import DocumentLanguage from "../upsell-tw/DocumentLanguage";
import "../upsell-kr/guide.css";
import "../review-guide-kr/review-guide.css";
import "../review-guide-shared/localized.css";

export default function TaiwanReviewLayout({ children }: { children: ReactNode }) { return <div lang="zh-TW"><DocumentLanguage />{children}</div>; }
