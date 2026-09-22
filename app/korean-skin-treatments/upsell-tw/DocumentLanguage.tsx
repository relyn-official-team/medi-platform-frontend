"use client";

import { useEffect } from "react";

export default function DocumentLanguage() {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = "zh-TW";
    return () => { document.documentElement.lang = previous; };
  }, []);
  return null;
}
