"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface BuBinaPortraitProps {
  size?: number;             // px — width and height of portrait
  variant?: "soft" | "card"; // soft = no border; card = framed with border + accent
  withLeafBadge?: boolean;   // floating leaf accent in top-right corner
  className?: string;
  ariaLabel?: string;
}

/**
 * BuBinaPortrait — reusable component for the founder portrait.
 *
 * V1 uses the SVG placeholder until final approved portrait is delivered.
 *
 * Animation:
 * - On scroll into view: opacity 0→1, scale 0.96→1, y 12px→0 (soft spring)
 * - Idle: subtle floating motion every few seconds (3s ease-in-out)
 * - Respects prefers-reduced-motion
 *
 * Future: replace the inline SVG with <Image src="/assets/portraits/bu-bina.png" />.
 */
export default function BuBinaPortrait({
  size = 100,
  variant = "soft",
  withLeafBadge = true,
  className = "",
  ariaLabel = "Potrait Bu Bina, pendiri Waroeng Bu Bina",
}: BuBinaPortraitProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isCard = variant === "card";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        opacity: entered ? 1 : 0,
        transform: entered
          ? "translateY(0) scale(1)"
          : "translateY(12px) scale(0.96)",
        transition:
          mounted && !entered
            ? "none"
            : "opacity 700ms cubic-bezier(0.4, 0, 0.2, 1), transform 700ms cubic-bezier(0.34, 1.4, 0.64, 1)",
        width: size,
        height: size,
      }}
    >
      {/* Portrait frame */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: `${Math.round(size * 0.24)}px`,
          overflow: "hidden",
          backgroundColor: "#D4A574",
          border: isCard
            ? `3px solid #E8D8C8`
            : "none",
          boxShadow: isCard
            ? "0 4px 16px rgba(78,46,30,0.12)"
            : "0 2px 8px rgba(78,46,30,0.08)",
          position: "relative",
        }}
      >
        {/* Once the approved portrait is delivered, replace this SVG with:
            <Image src="/assets/portraits/bu-bina.png" alt={ariaLabel} fill style={{ objectFit: "cover" }} /> */}
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", display: "block" }}
          role="img"
          aria-label={ariaLabel}
        >
          <rect width="100" height="100" fill="#D4A574" />
          {/* Body */}
          <ellipse cx="50" cy="92" rx="26" ry="16" fill="#8B5E3C" />
          <ellipse cx="50" cy="72" rx="18" ry="20" fill="#8B5E3C" />
          {/* Hijab */}
          <ellipse cx="50" cy="28" rx="26" ry="16" fill="#7A4A2C" />
          <ellipse cx="50" cy="22" rx="22" ry="11" fill="#8B5E3C" />
          <ellipse cx="28" cy="36" rx="9" ry="15" fill="#7A4A2C" />
          <ellipse cx="72" cy="36" rx="9" ry="15" fill="#7A4A2C" />
          {/* Face */}
          <circle cx="50" cy="40" r="20" fill="#E8C4A0" />
          {/* Eyes */}
          <circle cx="44" cy="38" r="2.5" fill="#4E2E1E" />
          <circle cx="56" cy="38" r="2.5" fill="#4E2E1E" />
          <circle cx="44.5" cy="37.5" r="0.8" fill="white" />
          <circle cx="56.5" cy="37.5" r="0.8" fill="white" />
          {/* Eyebrows */}
          <path
            d="M40 34 Q44 32 48 34"
            stroke="#4E2E1E"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M52 34 Q56 32 60 34"
            stroke="#4E2E1E"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Smile */}
          <path
            d="M44 47 Q50 53 56 47"
            stroke="#4E2E1E"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Blush */}
          <ellipse cx="41" cy="44" rx="4" ry="3" fill="#D4896A" opacity="0.4" />
          <ellipse cx="59" cy="44" rx="4" ry="3" fill="#D4896A" opacity="0.4" />
          {/* Nose */}
          <ellipse cx="50" cy="43" rx="2" ry="1.5" fill="#C49070" opacity="0.5" />
        </svg>

        {/* Subtle idle float — applied only after entrance */}
        {entered && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              animation: "binaFloat 4s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Leaf badge accent */}
      {withLeafBadge && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: `-${Math.round(size * 0.08)}px`,
            right: `-${Math.round(size * 0.08)}px`,
            width: `${Math.round(size * 0.28)}px`,
            height: `${Math.round(size * 0.28)}px`,
            borderRadius: "50%",
            backgroundColor: "#EEF5E8",
            border: `1.5px solid #C8E0B8`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(91,127,58,0.18)",
            opacity: entered ? 1 : 0,
            transform: entered ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-30deg)",
            transition:
              "opacity 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms",
          }}
        >
          <svg
            width={Math.round(size * 0.14)}
            height={Math.round(size * 0.14)}
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M7 12C7 12 2 9 2 5.5 2 3 4 1 7 1s5 2 5 4.5C12 9 7 12 7 12z"
              fill="#5B7F3A"
              opacity="0.85"
            />
            <path
              d="M7 2v10"
              stroke="#EEF5E8"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
