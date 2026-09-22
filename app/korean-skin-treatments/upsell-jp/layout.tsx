import type { ReactNode } from "react";
import DocumentLanguage from "./DocumentLanguage";
import "../upsell-kr/guide.css";
import "./guide-jp.css";

export default function JapaneseGuideLayout({ children }: { children: ReactNode }) {
  return <div lang="ja-JP"><DocumentLanguage />{children}</div>;
}
