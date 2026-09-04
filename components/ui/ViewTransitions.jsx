"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * ViewTransitions — wraps Next.js App Router navigation in the native
 * View Transitions API for a cinematic cross-fade between routes.
 *
 * How it works:
 *   · intercepts internal <a>/<Link> clicks (capture phase)
 *   · skips: hash-only, external, modified clicks, download links
 *   · runs document.startViewTransition(async () => router.push(...)) so the
 *     browser snapshots the OLD and NEW UI and cross-fades them
 *   · no-ops gracefully in browsers without the API (Chrome/Edge 111+,
 *     Safari 18+, Firefox 141+)
 *   · honours prefers-reduced-motion via CSS
 */
export default function ViewTransitions() {
  const router = useRouter();
  const runningRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("startViewTransition" in document)) return;

    const onClick = (event) => {
      if (event.defaultPrevented || runningRef.current) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      // Use closest only if the target is an Element (text nodes don't have it).
      const target = event.target;
      const anchor = target && target.closest ? target.closest('a[href]') : null;
      if (!anchor) return;

      if (anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      let url;
      try {
        url = new URL(anchor.getAttribute("href"), window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      // Same-page hash scroll — let the browser handle it natively.
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      runningRef.current = true;

      const done = () => {
        runningRef.current = false;
      };

      let transition;
      try {
        transition = document.startViewTransition(async () => {
          try {
            await router.push(url.pathname + url.search + url.hash);
          } finally {
            done();
          }
        });
      } catch {
        // API threw synchronously (rare) — fall back to default navigation.
        done();
        window.location.assign(anchor.href);
        return;
      }

      if (transition && transition.finished && typeof transition.finished.then === "function") {
        transition.finished.then(done, done);
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}