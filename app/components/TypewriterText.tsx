"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  highlightWords?: string[];
  highlightColor?: string;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

interface TypewriterSequenceProps {
  lines: string[];               // each line types in sequence
  lineDelay?: number;            // delay BEFORE starting each new line (ms)
  initialDelay?: number;         // delay before first line starts
  speed?: number;                // ms per character
  highlightWords?: string[];
  highlightColor?: string;
  showCursor?: boolean;
  cursorChar?: string;
  lineStyle?: React.CSSProperties;
  onComplete?: () => void;
}

export function TypewriterSequence({
  lines,
  lineDelay = 250,
  initialDelay = 300,
  speed = 65,
  highlightWords = [],
  highlightColor = "#C45A3A",
  showCursor = true,
  cursorChar = "|",
  lineStyle = {},
  onComplete,
}: TypewriterSequenceProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  useEffect(() => {
    if (!started) return;
    if (lineIndex >= lines.length) {
      if (!done) {
        setDone(true);
        onComplete?.();
      }
      return;
    }
    const currentLine = lines[lineIndex];
    if (displayed.length < currentLine.length) {
      const t = setTimeout(() => {
        setDisplayed(currentLine.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(t);
    } else {
      // Line complete — wait lineDelay then move to next
      const t = setTimeout(() => {
        setDisplayed("");
        setLineIndex((i) => i + 1);
      }, lineDelay);
      return () => clearTimeout(t);
    }
  }, [started, lineIndex, displayed, lines, speed, lineDelay, done, onComplete]);

  const renderLine = (line: string) => {
    const parts = line.split(/(\s+)/);
    return parts.map((part, i) => {
      const trimmed = part.trim();
      if (!trimmed) return <span key={i}>{part}</span>;
      const isHighlight = highlightWords.some((hw) =>
        trimmed.toLowerCase() === hw.toLowerCase()
      );
      if (isHighlight) {
        return (
          <span
            key={i}
            style={{
              color: highlightColor,
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <span>
      {lines.slice(0, lineIndex).map((line, idx) => (
        <span key={idx} style={{ display: "block", ...lineStyle }}>
          {renderLine(line)}
        </span>
      ))}
      {/* Current typing line */}
      {lineIndex < lines.length && (
        <span style={{ display: "block", ...lineStyle }}>
          {renderLine(displayed)}
          {showCursor && (
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                marginLeft: "2px",
                color: highlightColor,
                fontWeight: 300,
                animation: "cursorBlink 0.7s steps(2) infinite",
              }}
            >
              {cursorChar}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export default function TypewriterText({
  text,
  delay = 300,
  speed = 70,
  className = "",
  style = {},
  highlightWords = [],
  highlightColor = "#C45A3A",
  showCursor = true,
  cursorChar = "|",
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      if (!done) {
        setDone(true);
        onComplete?.();
      }
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed, done, onComplete]);

  const renderText = () => {
    const words = displayed.split(/(\s+)/);
    return words.map((word, i) => {
      const trimmed = word.trim();
      if (!trimmed) return <span key={i}>{word}</span>;
      const isHighlight = highlightWords.some((hw) =>
        trimmed.toLowerCase() === hw.toLowerCase()
      );
      if (isHighlight) {
        return (
          <span
            key={i}
            style={{
              color: highlightColor,
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            {word}
          </span>
        );
      }
      return <span key={i}>{word}</span>;
    });
  };

  return (
    <span className={className} style={style}>
      {renderText()}
      {showCursor && !done && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            marginLeft: "2px",
            color: highlightColor,
            fontWeight: 300,
            animation: "cursorBlink 0.7s steps(2) infinite",
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
