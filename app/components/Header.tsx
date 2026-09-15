"use client";

import Image from "next/image";
import { Menu, MessageCircle, X, History } from "lucide-react";
import { useState, useEffect } from "react";
import ChatHistoryModal, { ChatHistoryItem } from "./ChatHistoryModal";

interface HeaderProps {
  onHistorySelect?: (item: ChatHistoryItem) => void;
}

export default function Header({ onHistorySelect }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(253, 249, 244, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #E8D8C8",
        }}
        className="animate-fade-in"
      >
        <div
          style={{
            maxWidth: "100%",
            margin: "0 auto",
            padding: "0 20px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Hamburger — positioned left */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Buka menu"
            type="button"
            style={{
              position: "absolute",
              left: "20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              color: "#4E2E1E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              transition: "background-color 150ms ease",
              minWidth: "44px",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F0E6D8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = "#E8D0B8";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = "#F0E6D8";
            }}
          >
            <Menu size={26} strokeWidth={2} />
          </button>

          {/* Logo — centered */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="/assets/brand/logo.png"
              alt="Waroeng Bu Bina"
              width={208}
              height={57}
              style={{
                objectFit: "contain",
                height: "57px",
                width: "auto",
                maxWidth: "60vw",
              }}
              priority
            />
          </div>

          {/* Right side buttons */}
          <div
            style={{
              position: "absolute",
              right: "20px",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            {/* History button */}
            <button
              onClick={() => setHistoryOpen(true)}
              aria-label="Riwayat chat"
              type="button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "10px",
                color: "#4E2E1E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                transition: "background-color 150ms ease",
                minWidth: "44px",
                minHeight: "44px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F0E6D8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <History size={22} strokeWidth={1.8} />
            </button>

            {/* AI chat button */}
            <a
              href="https://wa.me/62818190692"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat dengan Bu Bina"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                color: "#4E2E1E",
                borderRadius: "10px",
                textDecoration: "none",
                transition: "background-color 150ms ease",
                minWidth: "44px",
                minHeight: "44px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F0E6D8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  stroke="#4E2E1E"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="8.5" cy="11.5" r="1" fill="#C45A3A" />
                <circle cx="12" cy="11.5" r="1" fill="#C45A3A" />
                <circle cx="15.5" cy="11.5" r="1" fill="#C45A3A" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Chat History Modal */}
      {historyOpen && (
        <ChatHistoryModal
          onClose={() => setHistoryOpen(false)}
          onSelect={(item) => {
            onHistorySelect?.(item);
          }}
        />
      )}

      {/* Mobile Menu Drawer — outside <header> for proper stacking */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(78,46,30,0.45)",
            zIndex: 100,
            animation: "fadeIn 0.25s ease-out both",
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "300px",
              maxWidth: "85vw",
              height: "100%",
              backgroundColor: "#FDF9F4",
              padding: "20px",
              boxShadow: "6px 0 28px rgba(78,46,30,0.20)",
              display: "flex",
              flexDirection: "column",
              animation: "slideInLeft 0.32s cubic-bezier(0.4, 0, 0.2, 1) both",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "28px",
                paddingBottom: "20px",
                borderBottom: "1px solid #F0E6D8",
              }}
            >
              <Image
                src="/assets/brand/logo.png"
                alt="Waroeng Bu Bina"
                width={156}
                height={43}
                style={{ objectFit: "contain", height: "43px", width: "auto" }}
              />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Tutup menu"
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  color: "#7A5240",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  minWidth: "36px",
                  minHeight: "36px",
                  transition: "background-color 150ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F0E6D8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>

            {/* Nav */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
              {[
                { label: "Beranda", href: "/" },
                { label: "Menu", href: "/menu" },
                { label: "Pesan Sekarang", href: "/order" },
                { label: "Tentang Kami", href: "#tentang" },
                { label: "Chat WhatsApp", href: "https://wa.me/62818190692", external: true },
              ].map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#1A9E3C",
                      textDecoration: "none",
                      borderRadius: "12px",
                      backgroundColor: "#F0FFF5",
                      border: "1px solid #C8E8D4",
                      transition: "background-color 150ms ease, transform 150ms ease",
                      marginTop: "12px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#E0F8EA";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#F0FFF5";
                    }}
                  >
                    <MessageCircle size={18} strokeWidth={2} fill="#25D366" />
                    {item.label}
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "14px 16px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#4E2E1E",
                      textDecoration: "none",
                      borderRadius: "12px",
                      transition: "background-color 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#F0E6D8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>

            {/* Slogan di bawah */}
            <div
              style={{
                marginTop: "auto",
                paddingTop: "24px",
                borderTop: "1px solid #F0E6D8",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: "#7A5240",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                "Kalau punya kebutuhan makan, tinggal bilang."
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  color: "#9B7060",
                  margin: "6px 0 0 0",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Waroeng Bu Bina
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
