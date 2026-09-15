"use client";

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OrderIntentSection from "./components/OrderIntentSection";
import MenuSection from "./components/MenuSection";
import BrandValues from "./components/BrandValues";
import AboutSection from "./components/AboutSection";
import WhatsAppCTA from "./components/WhatsAppCTA";
import ConversationFlow from "./components/ConversationFlow";
import { addChatHistory } from "./components/ChatHistoryModal";
import type { OrderIntent, OrderDraft } from "./types";

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#4E2E1E",
        padding: "32px 20px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(to right, #C45A3A, #B3835F, #5B7F3A)",
        }}
      />

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "20px",
            fontWeight: 700,
            color: "#FDF9F4",
          }}
        >
          WB
        </div>

        {/* Brand name */}
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#FDF9F4",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Waroeng Bu Bina
        </p>

        {/* Slogan */}
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontSize: "14px",
            color: "rgba(253,249,244,0.7)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Masakan rumahan, untuk hari yang lebih baik. ♡
        </p>

        {/* Divider */}
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
        />

        {/* Contact */}
        <a
          href="https://wa.me/62818190692"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            color: "rgba(253,249,244,0.8)",
            textDecoration: "none",
            transition: "color 150ms ease",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = "#FDF9F4")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "rgba(253,249,244,0.8)")
          }
        >
          hubungi@waroengbubina.com
        </a>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            color: "rgba(253,249,244,0.4)",
            margin: 0,
            marginTop: "8px",
          }}
        >
          © {new Date().getFullYear()} Waroeng Bu Bina. Dibuat dengan ♡ di Indonesia.
        </p>
      </div>
    </footer>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, #E8D8C8, transparent)",
        }}
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [conversationOpen, setConversationOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState("");
  const [orderDraft, setOrderDraft] = useState<Partial<OrderDraft>>({});

  const handleRequest = (text: string) => {
    addChatHistory(text);
    setCurrentRequest(text);
    setOrderDraft((prev) => ({ ...prev, request: text }));
    setConversationOpen(true);
  };

  const handleSelectIntent = (type: OrderIntent) => {
    setOrderDraft((prev) => ({ ...prev, orderType: type }));
    // If langsung, open WhatsApp directly
    if (type === "langsung") {
      const message = encodeURIComponent(
        `Halo Bu Bina, saya ingin bertanya tentang menu dan ketersediaan makanan. Mohon bantuannya.\n\nTerima kasih.`
      );
      window.open(`https://wa.me/62818190692?text=${message}`, "_blank");
      return;
    }
    // Otherwise open conversation flow with the order type pre-selected
    setCurrentRequest("");
    setOrderDraft((prev) => ({ ...prev, orderType: type }));
    setConversationOpen(true);
  };

  const handleCloseConversation = () => {
    setConversationOpen(false);
    setCurrentRequest("");
    setOrderDraft({});
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#FDF9F4",
        position: "relative",
      }}
    >
      {/* Header */}
      <Header onHistorySelect={(item) => handleRequest(item.request)} />

      {/* Main content — scrollable */}
      <main
        style={{
          paddingBottom: "calc(80px + env(safe-area-inset-bottom))",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* Hero Section */}
        <Hero onRequest={handleRequest} />

        <SectionDivider />

        {/* Order Intent Section */}
        <OrderIntentSection onSelectIntent={handleSelectIntent} />

        <SectionDivider />

        {/* Menu Section */}
        <MenuSection />

        <SectionDivider />

        {/* Brand Values */}
        <BrandValues />

        <SectionDivider />

        {/* About */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky WhatsApp CTA — contextual based on request state */}
      {!conversationOpen && (
        <WhatsAppCTA
          request={orderDraft.request}
          orderType={orderDraft.orderType}
          variant="sticky"
          state={
            orderDraft.request || orderDraft.orderType ? "active" : "default"
          }
        />
      )}

      {/* Conversation Flow Overlay */}
      {conversationOpen && (
        <ConversationFlow
          initialRequest={currentRequest}
          orderDraft={orderDraft as OrderDraft}
          onClose={handleCloseConversation}
          onSelectOrderType={handleSelectIntent}
        />
      )}
    </div>
  );
}
