"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ConfirmedPage() {
  const [orderId, setOrderId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("id") || "—");
    const wa = params.get("wa");
    if (wa) setWhatsappUrl(decodeURIComponent(wa));
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#FDF9F4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        textAlign: "center",
      }}
    >
      {/* Success animation — checkmark */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#EEF9F0",
          border: "3px solid #25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          animation: "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path
            d="M8 18l7 7 13-14"
            stroke="#25D366"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 30,
              strokeDashoffset: 30,
              animation: "drawCheck 0.5s ease 0.3s forwards",
            }}
          />
        </svg>
      </div>

      {/* Heading */}
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(24px, 6vw, 32px)",
          fontWeight: 700,
          color: "#4E2E1E",
          margin: "0 0 12px 0",
          lineHeight: 1.2,
        }}
      >
        Pesanan Terkirim!
      </h1>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "15px",
          color: "#7A5240",
          lineHeight: 1.7,
          margin: "0 0 24px 0",
          maxWidth: "320px",
        }}
      >
        Pesanan kamu sudah diterima. <strong style={{ color: "#4E2E1E", fontWeight: 600 }}>Bu Bina</strong> akan segera menghubungi kamu via WhatsApp untuk konfirmasi.
      </p>

      {/* Order card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "20px",
          border: "1.5px solid #E8D8C8",
          width: "100%",
          maxWidth: "340px",
          marginBottom: "24px",
          boxShadow: "0 4px 16px rgba(78,46,30,0.07)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
            paddingBottom: "14px",
            borderBottom: "1px solid #F0E6D8",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#9B7060",
              fontWeight: 500,
            }}
          >
            No. Pesanan
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "#4E2E1E",
              letterSpacing: "0.05em",
            }}
          >
            #{orderId}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { label: "Status", value: "Menunggu konfirmasi" },
            { label: "Respon", value: "~1-2 jam kerja" },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  color: "#9B7060",
                  fontWeight: 500,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#4E2E1E",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp CTA */}
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            maxWidth: "340px",
            padding: "14px 24px",
            backgroundColor: "#25D366",
            color: "#FFFFFF",
            borderRadius: "14px",
            textDecoration: "none",
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            boxShadow: "0 4px 14px rgba(37,211,102,0.30)",
            marginBottom: "12px",
            transition: "background-color 200ms ease, transform 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1FA855";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#25D366";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.211l4.287-1.398A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.138 0-4.146-.677-5.803-1.82l-.416-.272-2.657.868.854-2.61-.287-.445A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Lanjutkan di WhatsApp
        </a>
      )}

      {/* Back home */}
      <Link
        href="/"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          color: "#9B7060",
          textDecoration: "none",
          padding: "10px",
          transition: "color 150ms ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#4E2E1E";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#9B7060";
        }}
      >
        Kembali ke Berkamu
      </Link>
    </div>
  );
}
