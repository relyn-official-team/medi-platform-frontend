import type { ReactNode } from "react";
import DocumentLanguage from "./DocumentLanguage";
import "../upsell-kr/guide.css";
import "./guide-tw.css";

export default function TaiwanGuideLayout({ children }: { children: ReactNode }) {
  return <div lang="zh-TW"><DocumentLanguage />{children}</div>;
}
