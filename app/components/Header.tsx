"use client";

import Image from "next/image";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            padding: "0 16px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Buka menu"
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
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = "#E8D0B8";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = "#F0E6D8";
            }}
          >
            <Menu size={26} strokeWidth={2} />
          </button>

          {/* Logo — 30% larger */}
          <div
            style={{
              flex: 1,
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

          {/* WhatsApp */}
          <a
            href="https://wa.me/62818190692"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat WhatsApp"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              color: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              textDecoration: "none",
              transition: "background-color 150ms ease",
              minWidth: "44px",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E8F7EF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <MessageCircle size={26} strokeWidth={2} fill="#25D366" />
          </a>
        </div>
      </header>

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
                { label: "Beranda", href: "#hero" },
                { label: "Menu", href: "#menu" },
                { label: "Tentang Kami", href: "#tentang" },
                { label: "Pesan WhatsApp", href: "https://wa.me/62818190692", external: true },
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
