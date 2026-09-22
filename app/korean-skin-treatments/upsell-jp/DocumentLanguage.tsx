"use client";

import { useEffect } from "react";

export default function DocumentLanguage() {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = "ja-JP";
    return () => { document.documentElement.lang = previous; };
  }, []);
  return null;
}
