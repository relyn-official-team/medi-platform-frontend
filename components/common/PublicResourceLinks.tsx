import Link from "next/link";
import {
  CONSULTATION_LINKS,
  EMPLOYEE_CONSULTATION_LINKS,
  GUIDE_LINKS,
  SERVICE_DIRECTORY_LABELS,
  SERVICE_DIRECTORY_PATH,
  type NavigationLocale,
} from "@/lib/public-navigation";
import styles from "./PublicResourceLinks.module.css";

export function ServiceDirectoryLink({ locale, className }: { locale: NavigationLocale; className?: string }) {
  return <Link prefetch={false} href={SERVICE_DIRECTORY_PATH} className={className}>{SERVICE_DIRECTORY_LABELS[locale]}</Link>;
}

export function GuideServiceLinks({ locale }: { locale: "ko" | "ja" | "tw" }) {
  const consultation = CONSULTATION_LINKS.find(link => link.lang === (locale === "ja" ? "ja-JP" : locale === "tw" ? "zh-TW" : "ko-KR"));
  return <>
    <ServiceDirectoryLink locale={locale} />
    {consultation && <a href={consultation.href} hrefLang={consultation.lang}>{consultation.label}</a>}
  </>;
}

export function ConsultationNavigation({ locale, employee = false }: { locale: "ko" | "ja" | "tw" | "hk" | "th"; employee?: boolean }) {
  const guideLanguage = locale === "ja" ? "ja-JP" : locale === "tw" || locale === "hk" ? "zh-TW" : locale === "ko" ? "ko-KR" : undefined;
  const consultations = employee ? EMPLOYEE_CONSULTATION_LINKS : CONSULTATION_LINKS;
  return <nav className={styles.navigation} aria-label={SERVICE_DIRECTORY_LABELS[locale]}>
    <ServiceDirectoryLink locale={locale} />
    {consultations.map(link => <a key={link.href} href={link.href} hrefLang={link.lang} lang={link.lang}>{link.label}</a>)}
    {GUIDE_LINKS.filter(link => link.lang === guideLanguage).map(link => <a key={link.href} href={link.href} hrefLang={link.lang} lang={link.lang}>{link.label}</a>)}
  </nav>;
}
