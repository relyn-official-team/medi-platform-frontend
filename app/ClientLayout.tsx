"use client";

import { useEffect, useRef } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (initializedRef.current) return;
    initializedRef.current = true;

    navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      scope: "/",
    }).catch(console.error);
  }, []);

  return <>{children}</>;
}
