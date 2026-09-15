"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal — triggers reveal animation when element enters viewport.
 * Returns: [ref, isVisible] — attach ref to element, add 'revealed' class when visible.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if user prefers reduced motion — show immediately
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
        ...options,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
