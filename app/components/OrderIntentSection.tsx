"use client";

import type { OrderIntent } from "@/app/types";
import RevealOnScroll from "./RevealOnScroll";

// ─── Custom SVG icons — larger, warmer, more editorial ─────────────────────────
const icons: Record<Exclude<OrderIntent, "langsung">, React.ReactNode> = {
  "hari-ini": (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="18" cy="22" rx="11" ry="7" fill="#F0E6D8" stroke="#4E2E1E" strokeWidth="1.5"/>
      <path d="M7 22c0-5.5 4.9-10 11-10s11 4.5 11 10" stroke="#4E2E1E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 13c0-2 1.5-3.5 3.5-3.5" stroke="#B3835F" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M18 11c0-2 1.5-3.5 3.5-3.5" stroke="#B3835F" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <circle cx="22" cy="18" r="2" fill="#C45A3A" opacity="0.7"/>
      <path d="M22 20v5" stroke="#C45A3A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  mingguan: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="8" width="24" height="22" rx="4" fill="#F0E6D8" stroke="#4E2E1E" strokeWidth="1.5"/>
      <path d="M11 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2M21 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" stroke="#4E2E1E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 15h24" stroke="#4E2E1E" strokeWidth="1.5"/>
      <circle cx="12" cy="21" r="1.5" fill="#C45A3A"/>
      <circle cx="18" cy="21" r="1.5" fill="#C45A3A"/>
      <circle cx="24" cy="21" r="1.5" fill="#C45A3A"/>
      <circle cx="12" cy="26" r="1.5" fill="#9B7060" opacity="0.5"/>
      <circle cx="18" cy="26" r="1.5" fill="#9B7060" opacity="0.5"/>
    </svg>
  ),
  bulanan: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="8" width="24" height="22" rx="4" fill="#F0E6D8" stroke="#4E2E1E" strokeWidth="1.5"/>
      <path d="M11 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2M21 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" stroke="#4E2E1E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 15h24" stroke="#4E2E1E" strokeWidth="1.5"/>
      <circle cx="12" cy="21" r="1.5" fill="#5B7F3A"/>
      <circle cx="18" cy="21" r="1.5" fill="#5B7F3A"/>
      <circle cx="24" cy="21" r="1.5" fill="#5B7F3A"/>
      <circle cx="12" cy="26" r="1.5" fill="#5B7F3A"/>
      <circle cx="18" cy="26" r="1.5" fill="#5B7F3A" opacity="0.4"/>
      <circle cx="24" cy="26" r="1.5" fill="#5B7F3A" opacity="0.4"/>
    </svg>
  ),
  acara: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 26c0 0 3-2 5-4s3-5 3-8c0-4-3-6-6-6s-6 2-6 6c0 3 1 6 3 8s5 4 5 4z" fill="#FDECE9" stroke="#C45A3A" strokeWidth="1.5"/>
      <path d="M18 22l1.5 2.5L21 23l-2.5.5L18 26" stroke="#C45A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="14" r="1.5" fill="#C45A3A" opacity="0.7"/>
      <circle cx="8" cy="10" r="1" fill="#5B7F3A" opacity="0.7"/>
      <circle cx="26" cy="12" r="1.5" fill="#B3835F" opacity="0.7"/>
      <path d="M28 8l2-2M30 10l2 0" stroke="#C45A3A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M6 16l-2-1M5 19l-1 2" stroke="#5B7F3A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
};

const whatsappIcon = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#E8F7EF" stroke="#25D366" strokeWidth="1.5"/>
    <path d="M12 16.5c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6c-1.1 0-2.1-.3-3-.8" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12.5 21.5v4l3-2" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="15" cy="15" r="1.5" fill="#25D366"/>
    <circle cx="18" cy="15" r="1.5" fill="#25D366"/>
    <circle cx="21" cy="15" r="1.5" fill="#25D366"/>
  </svg>
);

const orderData: {
  type: OrderIntent;
  title: string;
  description: string;
  icon: React.ReactNode;
  isWhatsApp?: boolean;
}[] = [
  {
    type: "hari-ini",
    title: "Hari Ini",
    description: "Untuk sekarang atau besok",
    icon: icons["hari-ini"],
  },
  {
    type: "mingguan",
    title: "Mingguan",
    description: "Rutin untuk beberapa hari",
    icon: icons["mingguan"],
  },
  {
    type: "bulanan",
    title: "Bulanan",
    description: "Untuk rutin setiap bulan",
    icon: icons["bulanan"],
  },
  {
    type: "acara",
    title: "Acara",
    description: "Rapat, pengajian, ulang tahun",
    icon: icons["acara"],
  },
  {
    type: "langsung",
    title: "Pesan Langsung",
    description: "Chat dengan Bu Bina",
    icon: whatsappIcon,
    isWhatsApp: true,
  },
];

interface OrderIntentSectionProps {
  onSelectIntent: (type: OrderIntent) => void;
}

export default function OrderIntentSection({ onSelectIntent }: OrderIntentSectionProps) {
  return (
    <section
      id="order-types"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "36px 0 28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20px",
          right: "20px",
          height: "1px",
          background: "linear-gradient(to right, transparent, #E8D8C8, transparent)",
        }}
      />

      {/* Section header */}
      <RevealOnScroll delay={0}>
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(20px, 5vw, 26px)",
              fontWeight: 700,
              color: "#4E2E1E",
              margin: "0 0 8px 0",
              lineHeight: 1.2,
            }}
          >
            Mau pesan untuk apa?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#9B7060",
              margin: 0,
            }}
          >
            Berikut cara Bu Bina bisa membantu Anda.
          </p>
        </div>
      </RevealOnScroll>

      {/* Horizontal scroll — large card treatment */}
      <div
        className="hide-scrollbar"
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "8px",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {orderData.map((item, index) => (
          <div
            key={item.type}
            onClick={() => onSelectIntent(item.type)}
            className="animate-fade-up"
            style={{
              scrollSnapAlign: "start",
              animationDelay: `${index * 70}ms`,
              animationFillMode: "both",
            }}
          >
            <div
              style={{
                width: "100px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "20px 8px 16px",
                gap: "10px",
                backgroundColor: item.isWhatsApp ? "#F0FFF5" : "#FAFAF8",
                border: item.isWhatsApp
                  ? "1.5px solid #C8E8D4"
                  : "1.5px solid #F0E6D8",
                borderRadius: "20px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(78,46,30,0.05)",
                transition:
                  "transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 220ms ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(78,46,30,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(78,46,30,0.05)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(0.97)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1)";
              }}
            >
              {/* Online dot for WhatsApp */}
              {item.isWhatsApp && (
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#25D366",
                    border: "1.5px solid white",
                  }}
                />
              )}

              {/* Icon wrapper — perfectly centered */}
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: item.isWhatsApp ? "#1A9E3C" : "#4E2E1E",
                  margin: 0,
                  lineHeight: 1.2,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {item.title}
              </p>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  color: "#9B7060",
                  margin: 0,
                  lineHeight: 1.4,
                  textAlign: "center",
                  width: "100%",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: "calc(11px * 1.4 * 2)",
                }}
              >
                {item.description}
              </p>

              {/* Bottom accent bar */}
              <div
                style={{
                  width: "32px",
                  height: "3px",
                  borderRadius: "2px",
                  backgroundColor: item.isWhatsApp ? "#25D366" : "#E8D8C8",
                  margin: "4px auto 0",
                  transition: "background-color 150ms ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
