"use client";

import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import type { OrderIntent } from "@/app/types";

function buildWhatsAppMessage(
  request?: string,
  orderType?: OrderIntent
): string {
  const orderTypeLabel: Record<OrderIntent, string> = {
    "hari-ini": "Hari ini / besok",
    mingguan: "Mingguan",
    bulanan: "Bulanan",
    acara: "Acara",
    langsung: "Langsung",
  };

  const lines: string[] = ["Assalamualaikum Bu Bina, saya mau pesan:"];
  if (request) lines.push("", request);
  if (orderType) lines.push("", `Untuk: ${orderTypeLabel[orderType]}`);
  lines.push("", "Mohon bantuannya ya Bu, terima kasih! 🙏");

  return encodeURIComponent(lines.join("\n"));
}

interface WhatsAppCTAProps {
  request?: string;
  orderType?: OrderIntent;
  variant?: "sticky" | "inline" | "card";
  state?: "default" | "active" | "ready";
}

/**
 * state:
 * - default: no draft yet — show "Pesan Sekarang"
 * - active: user is creating request — show "Lanjutkan →"
 * - ready: draft complete — show "Konfirmasi pesanan →"
 */
export default function WhatsAppCTA({
  request,
  orderType,
  variant = "sticky",
  state = "default",
}: WhatsAppCTAProps) {
  const message = buildWhatsAppMessage(request, orderType);
  const whatsappUrl = `https://wa.me/62818190692?text=${message}`;

  const ctaText =
    state === "ready"
      ? "Konfirmasi pesanan"
      : state === "active" && (request || orderType)
      ? "Lanjutkan"
      : "Pesan Sekarang";

  const ctaIcon =
    state === "ready" ? (
      <CheckCircle2 size={20} fill="#FFFFFF" />
    ) : (
      <MessageCircle size={20} fill="#FFFFFF" />
    );

  if (variant === "sticky") {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          zIndex: 40,
          padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
          backgroundColor: "rgba(253,249,244,0.95)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid #E8D8C8",
          boxShadow: "0 -4px 18px rgba(78,46,30,0.08)",
        }}
        className="animate-fade-in"
      >
        <a
          href={state === "default" ? "/order" : whatsappUrl}
          target={state === "default" ? "_self" : "_blank"}
          rel="noopener noreferrer"
          aria-label={ctaText}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            padding: "16px 24px",
            backgroundColor: state === "ready" ? "#1FA855" : "#25D366",
            color: "#FFFFFF",
            borderRadius: "14px",
            textDecoration: "none",
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            boxShadow:
              state === "ready"
                ? "0 4px 14px rgba(31,168,85,0.35)"
                : "0 4px 12px rgba(37,211,102,0.30)",
            transition:
              "background-color 250ms ease, transform 150ms ease, box-shadow 250ms ease",
            letterSpacing: "0.01em",
            position: "relative",
            overflow: "hidden",
          }}
          className={state === "default" ? "animate-whatsapp-pulse" : ""}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1FA855";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 6px 18px rgba(37,211,102,0.42)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              state === "ready" ? "#1FA855" : "#25D366";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              state === "ready"
                ? "0 4px 14px rgba(31,168,85,0.35)"
                : "0 4px 12px rgba(37,211,102,0.30)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.98)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {ctaText}
        </a>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ctaText}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "14px 20px",
          backgroundColor: state === "ready" ? "#1FA855" : "#25D366",
          color: "#FFFFFF",
          borderRadius: "14px",
          textDecoration: "none",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          boxShadow:
            state === "ready"
              ? "0 4px 14px rgba(31,168,85,0.30)"
              : "0 4px 12px rgba(37,211,102,0.25)",
          transition:
            "background-color 250ms ease, transform 150ms ease, box-shadow 250ms ease",
          width: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1FA855";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(37,211,102,0.40)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor =
            state === "ready" ? "#1FA855" : "#25D366";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            state === "ready"
              ? "0 4px 14px rgba(31,168,85,0.30)"
              : "0 4px 12px rgba(37,211,102,0.25)";
        }}
      >
        {ctaIcon}
        {ctaText}
        <Send size={14} />
      </a>
    );
  }

  // Inline variant
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 18px",
        backgroundColor: state === "ready" ? "#1FA855" : "#25D366",
        color: "#FFFFFF",
        borderRadius: "999px",
        textDecoration: "none",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        boxShadow: "0 3px 10px rgba(37,211,102,0.25)",
        transition:
          "background-color 200ms ease, transform 150ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#1FA855";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor =
          state === "ready" ? "#1FA855" : "#25D366";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {ctaIcon}
      {ctaText}
    </a>
  );
}
