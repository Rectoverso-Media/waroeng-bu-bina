"use client";

import Image from "next/image";
import { Pencil, ArrowRight } from "lucide-react";
import { useState } from "react";
import { suggestions } from "@/app/data/menu";
import { TypewriterSequence } from "./TypewriterText";

interface HeroProps {
  onRequest: (text: string) => void;
}

export default function Hero({ onRequest }: HeroProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) onRequest(inputValue.trim());
  };

  const handleSuggestionClick = (text: string) => {
    setInputValue(text);
    onRequest(text);
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        backgroundColor: "#FDF9F4",
        overflow: "hidden",
      }}
    >
      {/* ── Hero character image — full bleed, primary visual ── */}
      <div
        style={{
          position: "relative",
          height: "440px",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#F0E6D8",
        }}
      >
        <Image
          src="/assets/hero/bu-bina-hero.png"
          alt="Bu Bina — pendiri Waroeng Bu Bina yang memasak dengan cinta"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "center center",
          }}
          sizes="100vw"
          priority
        />

        {/* Top gradient — header readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "160px",
            background:
              "linear-gradient(to bottom, rgba(78,46,30,0.50) 0%, rgba(78,46,30,0.10) 50%, rgba(253,249,244,0) 100%)",
            zIndex: 1,
          }}
        />

        {/* Bottom gradient — warm cream blend into content */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "260px",
            background:
              "linear-gradient(to top, #FDF9F4 0%, rgba(253,249,244,0.88) 35%, rgba(253,249,244,0) 100%)",
            zIndex: 1,
          }}
        />
      </div>

      {/* ── Text + input block — overlaps image bottom ── */}
      <div
        style={{
          padding: "0 20px 28px",
          position: "relative",
          zIndex: 5,
          marginTop: "-72px",
        }}
      >
        {/* Floating glass card — the heart of the hero */}
        <div
          className="animate-fade-up"
          style={{
            backgroundColor: "rgba(253,249,244,0.97)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "24px",
            padding: "22px 18px 18px",
            border: "1px solid rgba(232,216,200,0.7)",
            boxShadow: "0 10px 32px rgba(78,46,30,0.12)",
            marginBottom: "16px",
          }}
        >
          {/* Hero headline — single-line typewriter, editorial */}
          <div
            className="animate-fade-up stagger-1"
            style={{
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(28px, 7.8vw, 38px)",
                fontWeight: 800,
                color: "#4E2E1E",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                margin: 0,
                textAlign: "center",
              }}
            >
              <TypewriterSequence
                lines={["Mau dimasakin apa?"]}
                initialDelay={500}
                lineDelay={350}
                speed={75}
                highlightWords={["dimasakin"]}
                highlightColor="#C45A3A"
                showCursor={true}
                cursorChar="|"
              />
            </h1>
          </div>

          {/* Supporting copy */}
          <p
            className="animate-fade-up stagger-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#7A5240",
              lineHeight: 1.65,
              margin: "0 0 16px 0",
              textAlign: "center",
              maxWidth: "320px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Ceritakan kebutuhan makanan kamu.{" "}
            <strong style={{ color: "#4E2E1E", fontWeight: 700 }}>Bu Bina</strong>{" "}
            akan membantu menyiapkannya.
          </p>

          {/* Request input — the primary CTA */}
          <form onSubmit={handleSubmit} className="animate-fade-up stagger-4">
            <div
              style={{
                position: "relative",
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                border: inputFocused
                  ? "1.5px solid #B3835F"
                  : "1.5px solid #E8D8C8",
                boxShadow: inputFocused
                  ? "0 4px 20px rgba(78,46,30,0.14), 0 0 0 3px rgba(179,131,95,0.10)"
                  : "0 2px 10px rgba(78,46,30,0.06)",
                transition:
                  "border-color 250ms ease, box-shadow 250ms ease",
                overflow: "hidden",
              }}
            >
              {/* Left accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#B3835F",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <Pencil size={15} />
              </div>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="Contoh: Ayam bakar untuk 5 orang..."
                aria-label="Ketik kebutuhan makanan kamu"
                style={{
                  width: "100%",
                  padding: "14px 48px 14px 42px",
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                  color: "#4E2E1E",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  lineHeight: 1.4,
                }}
              />

              <button
                type="submit"
                aria-label="Kirim permintaan"
                disabled={!inputValue.trim()}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "32px",
                  height: "32px",
                  borderRadius: "9px",
                  border: "none",
                  backgroundColor: inputValue.trim() ? "#C45A3A" : "#E8D8C8",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: inputValue.trim() ? "pointer" : "not-allowed",
                  transition: "background-color 200ms ease, transform 150ms ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim()) {
                    e.currentTarget.style.backgroundColor = "#A84830";
                    e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = inputValue.trim()
                    ? "#C45A3A"
                    : "#E8D8C8";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translateY(-50%) scale(0.93)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
                }}
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </form>

          {/* Suggestions */}
          {/* Suggestions — editorial list style */}
          <div className="animate-fade-up stagger-5" style={{ marginTop: "14px" }}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                color: "#9B7060",
                marginBottom: "10px",
                fontWeight: 500,
                textAlign: "center",
                letterSpacing: "0.03em",
              }}
            >
              Atau coba mulai dengan:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="animate-fade-up"
                  style={{
                    animationDelay: `${700 + i * 80}ms`,
                    animationFillMode: "both",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 14px",
                    fontSize: "13px",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    color: "#4E2E1E",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1px solid #F0E6D8",
                    cursor: "pointer",
                    transition: "color 150ms ease, background-color 150ms ease",
                    textAlign: "left",
                    width: "100%",
                    borderRadius: "0",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#C45A3A";
                    e.currentTarget.style.backgroundColor = "rgba(196,90,58,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#4E2E1E";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {/* Small terracotta arrow */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="#C45A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
