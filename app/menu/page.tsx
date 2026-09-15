"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { menuItems } from "@/app/data/menu";
import SiteHeader from "@/app/components/SiteHeader";

type Category = "semua" | "makanan" | "sayuran" | "paket" | "minuman";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "makanan", label: "Makanan" },
  { key: "sayuran", label: "Sayuran" },
  { key: "paket", label: "Paket" },
  { key: "minuman", label: "Minuman" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("semua");
  const [search, setSearch] = useState("");

  const filtered = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "semua" || item.category === activeCategory;
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#FDF9F4",
        paddingBottom: "calc(80px + env(safe-area-inset-bottom))",
      }}
    >
      {/* Header */}
      <SiteHeader
        backHref="/"
        title="Menu"
        subtitle={`${menuItems.length} pilihan lezat`}
      />

      {/* Search */}
      <div style={{ padding: "12px 20px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: "32px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#B3835F",
            pointerEvents: "none",
          }}
        >
          <Search size={15} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari menu..."
          style={{
            width: "100%",
            padding: "10px 14px 10px 38px",
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
            color: "#4E2E1E",
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #E8D8C8",
            borderRadius: "12px",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 200ms ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#B3835F";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#E8D8C8";
          }}
        />
      </div>

      {/* Category pills */}
      <div
        style={{
          padding: "0 20px 12px",
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              padding: "6px 16px",
              fontSize: "13px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: activeCategory === cat.key ? 600 : 400,
              color:
                activeCategory === cat.key ? "#FFFFFF" : "#7A5240",
              backgroundColor:
                activeCategory === cat.key ? "#4E2E1E" : "#FFFFFF",
              border:
                activeCategory === cat.key
                  ? "1.5px solid #4E2E1E"
                  : "1.5px solid #E8D8C8",
              borderRadius: "999px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition:
                "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
              flexShrink: 0,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu grid */}
      <div style={{ padding: "20px 20px 0" }}>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 20px",
              color: "#9B7060",
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "18px",
                color: "#4E2E1E",
                marginBottom: "8px",
              }}
            >
              Menu tidak ditemukan
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
              }}
            >
              Coba kata kunci lain atau lihat semua menu
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "14px",
            }}
          >
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="animate-fade-up"
                style={{
                  animationDelay: `${i * 40}ms`,
                  animationFillMode: "both",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border:
                    item.featured
                      ? "1.5px solid rgba(196,90,58,0.25)"
                      : "1.5px solid #F0E6D8",
                  boxShadow: "0 2px 10px rgba(78,46,30,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition:
                    "transform 200ms ease, box-shadow 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(78,46,30,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 10px rgba(78,46,30,0.07)";
                }}
                onClick={() => {
                  window.location.href = `/order?item=${encodeURIComponent(
                    item.name
                  )}`;
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: "120px",
                    position: "relative",
                    backgroundColor: "#F0E6D8",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={item.image || "/assets/hero/hero-food.png"}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 430px) 50vw"
                  />
                  {item.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        backgroundColor: "#C45A3A",
                        color: "#FFFFFF",
                        fontSize: "9px",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "999px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Favorit
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "12px" }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#4E2E1E",
                      margin: "0 0 4px 0",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      color: "#9B7060",
                      margin: "0 0 8px 0",
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#C45A3A",
                      }}
                    >
                      {formatPrice(item.price)}
                    </span>
                    {/* Arrow */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="#C45A3A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All items CTA */}
        <div style={{ marginTop: "28px", paddingBottom: "8px" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              padding: "20px",
              border: "1.5px solid #E8D8C8",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "#4E2E1E",
                margin: "0 0 6px 0",
              }}
            >
              Butuh menu khusus?
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#7A5240",
                margin: "0 0 16px 0",
                lineHeight: 1.6,
              }}
            >
              Ceritakan kebutuhan kamu dan Bu Bina akan bantu susun menu yang tepat.
            </p>
            <Link
              href="/order"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                backgroundColor: "#C45A3A",
                color: "#FFFFFF",
                borderRadius: "12px",
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(196,90,58,0.30)",
                transition: "background-color 150ms ease, transform 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#A84830";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#C45A3A";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Pesan Sekarang
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
