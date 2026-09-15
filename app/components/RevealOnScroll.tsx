"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import type { ReactNode, ElementType } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  /** Delay in ms before reveal starts */
  delay?: number;
  /** Translate Y from in px */
  y?: number;
  /** Scale from in % */
  scale?: number;
  /** Duration in ms */
  duration?: number;
  /** Once revealed, never hide again */
  once?: boolean;
  className?: string;
  as?: ElementType;
  style?: React.CSSProperties;
}

/**
 * RevealOnScroll — wraps children, fades + translates them in when entering viewport.
 * Honors prefers-reduced-motion.
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  y = 16,
  scale = 1,
  duration = 600,
  once = true,
  className,
  as: Tag = "div",
  style,
}: RevealOnScrollProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : `translateY(${y}px) scale(${scale})`,
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.34, 1.3, 0.64, 1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
