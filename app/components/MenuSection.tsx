"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { menuItems } from "@/app/data/menu";
import RevealOnScroll from "./RevealOnScroll";

// All menu items use the hero food for warm consistency in V1
const foodImageMap: Record<string, string> = {
  "ayam-bakar":    "/assets/hero/hero-food.png",
  "ayam-goreng":   "/assets/hero/hero-food.png",
  "sayur-asem":    "/assets/hero/hero-food.png",
  "tumis-kangkung": "/assets/hero/hero-food.png",
};

// ─── Single Menu Card — uniform across all items ──────────────────────────────
function MenuCard({ item }: { item: (typeof menuItems)[0] }) {
  return (
    <div
      onClick={() => {}}
      style={{
        width: "165px",
        height: "230px",
        flexShrink: 0,
        borderRadius: "20px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8D8C8",
        boxShadow: "0 2px 8px rgba(78,46,30,0.06)",
        cursor: "pointer",
        transition:
          "transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 220ms ease, border-color 220ms ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
        e.currentTarget.style.boxShadow =
          "0 12px 24px rgba(78,46,30,0.14)";
        e.currentTarget.style.borderColor = "#B3835F";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 2px 8px rgba(78,46,30,0.06)";
        e.currentTarget.style.borderColor = "#E8D8C8";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(0.98)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
      }}
    >
      {/* Food image */}
      <div
        style={{
          position: "relative",
          height: "135px",
          flexShrink: 0,
          overflow: "hidden",
          backgroundColor: "#F0E6D8",
        }}
      >
        <Image
          src={foodImageMap[item.id]}
          alt={item.name}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center top",
          }}
          sizes="165px"
        />
        {/* Warm gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(78,46,30,0.30) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          padding: "12px 12px 12px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "15px",
            fontWeight: 700,
            color: "#4E2E1E",
            margin: "0 0 4px 0",
            lineHeight: 1.2,
          }}
        >
          {item.name}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: "#9B7060",
            margin: "0 0 10px 0",
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "calc(11px * 1.45 * 2)",
          }}
        >
          {item.description}
        </p>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(232,216,200,0.5)",
            paddingTop: "10px",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "#C45A3A",
              margin: 0,
            }}
          >
            {item.priceFormatted}
          </p>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              backgroundColor: "#F0E6D8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 200ms ease",
            }}
          >
            <ChevronRight size={14} color="#7A5240" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MenuSectionProps {
  limit?: number;
}

export default function MenuSection({ limit = 20 }: MenuSectionProps) {
  return (
    <section
      id="menu"
      style={{
        backgroundColor: "#FDF9F4",
        padding: "40px 0 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative organic shape */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-60px",
          right: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50% 30% 60% 50% / 40% 50% 50% 60%",
          background:
            "radial-gradient(ellipse at center, rgba(179,131,95,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Section header */}
      <RevealOnScroll delay={0}>
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "6px",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(22px, 5.5vw, 28px)",
                  fontWeight: 700,
                  color: "#4E2E1E",
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Daftar Menu
              </h2>
              <div
                style={{
                  width: "36px",
                  height: "3px",
                  backgroundColor: "#C45A3A",
                  borderRadius: "2px",
                  marginTop: "6px",
                }}
              />
            </div>
            <Link
              href="/menu"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#C45A3A",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                padding: "6px 10px",
                borderRadius: "10px",
                transition: "color 150ms ease, background-color 150ms ease",
                marginBottom: "4px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F0E6D8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Lihat semua
              <ChevronRight size={14} />
            </Link>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#9B7060",
              margin: "6px 0 0 0",
            }}
          >
            Pilihan lezat dari Waroeng Bu Bina.
          </p>
        </div>
      </RevealOnScroll>

      {/* Horizontal scroll — all cards uniform */}
      <div
        className="hide-scrollbar"
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "12px",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          alignItems: "flex-start",
        }}
      >
        {/* All menu cards — same component */}
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className="animate-fade-up"
            style={{
              scrollSnapAlign: "start",
              animationDelay: `${index * 80}ms`,
            }}
          >
            <MenuCard item={item} />
          </div>
        ))}

        {/* "See all" placeholder card — uniform size */}
        <Link
          href="/menu"
          style={{
            width: "165px",
            height: "230px",
            flexShrink: 0,
            borderRadius: "20px",
            border: "2px dashed #E0D0C0",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
            transition:
              "border-color 150ms ease, background-color 150ms ease, transform 200ms ease",
            scrollSnapAlign: "start",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#B3835F";
            e.currentTarget.style.backgroundColor = "#F8F0E8";
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#E0D0C0";
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "#F0E6D8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronRight size={20} color="#7A5240" />
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#9B7060",
            }}
          >
            Lihat semua
          </span>
        </Link>
      </div>
    </section>
  );
}
