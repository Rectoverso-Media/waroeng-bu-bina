"use client";

import Image from "next/image";
import { Pencil, ArrowRight, Sparkles } from "lucide-react";
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
      {/* ── Hero food image — full bleed, primary visual ── */}
      <div
        style={{
          position: "relative",
          height: "440px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Image
          src="/assets/hero/hero-food.png"
          alt="Ayam bakar dengan sayuran segar dan sambal — masakan rumahan Bu Bina"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center 45%",
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
            height: "200px",
            background:
              "linear-gradient(to bottom, rgba(78,46,30,0.55) 0%, rgba(78,46,30,0.15) 50%, rgba(253,249,244,0) 100%)",
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
            height: "240px",
            background:
              "linear-gradient(to top, #FDF9F4 0%, rgba(253,249,244,0.85) 35%, rgba(253,249,244,0) 100%)",
            zIndex: 1,
          }}
        />

        {/* Eyebrow badge — "Premium & Homemade" tag floating on top of image */}
        <div
          className="animate-slide-down"
          style={{
            position: "absolute",
            top: "82px",
            left: "20px",
            zIndex: 2,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            backgroundColor: "rgba(253,249,244,0.94)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "999px",
            border: "1px solid rgba(232,216,200,0.7)",
            boxShadow: "0 2px 8px rgba(78,46,30,0.10)",
          }}
        >
          <Sparkles size={11} color="#C45A3A" strokeWidth={2.5} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              color: "#4E2E1E",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Waroeng Bu Bina
          </span>
        </div>

        {/* Slogan overlay on lower food photo */}
        <div
          className="animate-fade-up stagger-5"
          style={{
            position: "absolute",
            bottom: "78px",
            left: "20px",
            right: "20px",
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(16px, 4.5vw, 18px)",
              color: "#FDF9F4",
              textShadow: "0 2px 12px rgba(78,46,30,0.8)",
              margin: 0,
              lineHeight: 1.4,
              fontWeight: 600,
              maxWidth: "85%",
              letterSpacing: "-0.01em",
            }}
          >
            Masakan rumahan, untuk hari
            <br />
            yang lebih baik.{" "}
            <span style={{ color: "#F4A4A4" }}>♡</span>
          </p>
        </div>
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
            Ceritakan kebutuhan makanan Anda.{" "}
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
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  background:
                    "linear-gradient(to bottom, #C45A3A, #B3835F)",
                  borderRadius: "16px 0 0 16px",
                }}
              />

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
                aria-label="Ketik kebutuhan makanan Anda"
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
          <div className="animate-fade-up stagger-5" style={{ marginTop: "12px" }}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                color: "#9B7060",
                marginBottom: "8px",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Atau coba mulai dengan:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="animate-fade-up"
                  style={{
                    animationDelay: `${700 + i * 80}ms`,
                    animationFillMode: "both",
                    padding: "7px 14px",
                    fontSize: "12px",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    color: "#C45A3A",
                    backgroundColor: "#FDF9F4",
                    border: "1.5px solid rgba(196,90,58,0.18)",
                    borderRadius: "999px",
                    cursor: "pointer",
                    transition:
                      "background-color 150ms ease, transform 150ms ease, color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
                    whiteSpace: "nowrap",
                    boxShadow: "0 1px 4px rgba(78,46,30,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(196,90,58,0.06)";
                    e.currentTarget.style.color = "#A84830";
                    e.currentTarget.style.borderColor = "rgba(196,90,58,0.35)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 3px 8px rgba(196,90,58,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FDF9F4";
                    e.currentTarget.style.color = "#C45A3A";
                    e.currentTarget.style.borderColor = "rgba(196,90,58,0.18)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 1px 4px rgba(78,46,30,0.06)";
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(0.96)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px) scale(1)";
                  }}
                >
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
