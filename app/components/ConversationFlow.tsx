"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import type { OrderDraft } from "@/app/types";

interface Message {
  id: string;
  role: "user" | "bina";
  text: string;
  showCTA?: boolean;
}

const BIBA_RESPONSES = [
  "Bisa! Saya bantu pilihkan yang cocok untuk kebutuhan kamu.",
  "Wah, pilihan yang enak! Saya siap bantu siapkan.",
  "Siap! Saya akan bantu susun menu yang sesuai.",
  "Mantap! Mari saya bantu carikan yang terbaik untuk kamu.",
];

function BinaMessage({ text, showCTA, request }: { text: string; showCTA?: boolean; request: string }) {
  const waUrl = `https://wa.me/62818190692?text=${encodeURIComponent(
    `Halo Bu Bina!\n\nSaya sudah konsultasi via aplikasi:\n"${request}"\n\nMohon bantuannya ya. Terima kasih!`
  )}`;

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
        marginBottom: "16px",
      }}
    >
      {/* Bina avatar */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#D4A574",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1.5px solid #E8D8C8",
          marginTop: "2px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#4E2E1E" }}>B</span>
      </div>
      <div style={{ flex: 1, maxWidth: "260px" }}>
        <div
          style={{
            display: "inline-block",
            padding: "12px 16px",
            backgroundColor: "#FFFFFF",
            borderRadius: "4px 16px 16px 16px",
            border: "1px solid #E8D8C8",
            boxShadow: "0 2px 8px rgba(78,46,30,0.06)",
            marginBottom: showCTA ? "10px" : 0,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#4E2E1E",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {text}
          </p>
        </div>

        {/* CTA button — opens WhatsApp */}
        {showCTA && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "10px 16px",
              backgroundColor: "#25D366",
              color: "#FFFFFF",
              borderRadius: "12px",
              textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              boxShadow: "0 3px 10px rgba(37,211,102,0.28)",
              transition: "background-color 150ms ease, transform 150ms ease",
              marginTop: "6px",
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.211l4.287-1.398A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.138 0-4.146-.677-5.803-1.82l-.416-.272-2.657.868.854-2.61-.287-.445A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Lanjutkan di WhatsApp
          </a>
        )}

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: "#9B7060",
            margin: "4px 0 0 0",
          }}
        >
          Bu Bina
        </p>
      </div>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "12px 16px",
          backgroundColor: "#C45A3A",
          color: "#FFFFFF",
          borderRadius: "16px 4px 16px 16px",
          maxWidth: "260px",
          boxShadow: "0 2px 8px rgba(196,90,58,0.2)",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

interface ConversationFlowProps {
  initialRequest: string;
  orderDraft: OrderDraft;
  onClose: () => void;
  onSelectOrderType: (type: string) => void;
}

export default function ConversationFlow({
  initialRequest,
  onClose,
}: ConversationFlowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial user message and bina response
  useEffect(() => {
    const binaResponse = BIBA_RESPONSES[Math.floor(Math.random() * BIBA_RESPONSES.length)];
    setMessages([
      {
        id: "1",
        role: "user",
        text: initialRequest,
      },
      {
        id: "2",
        role: "bina",
        text: binaResponse,
      },
    ]);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [initialRequest]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { id: Date.now().toString(), role: "user", text: inputValue.trim() },
      {
        id: (Date.now() + 1).toString(),
        role: "bina",
        text: "Baik! Saya catat kebutuhan kamu. Kalau sudah sesuai, pesanan bisa dilanjutkan melalui WhatsApp untuk konfirmasi dan pembayaran.",
        showCTA: true,
      },
    ];

    setMessages(newMessages);
    setInputValue("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundColor: "#FDF9F4",
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.3s ease-out both",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E8D8C8",
          boxShadow: "0 2px 8px rgba(78,46,30,0.06)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={onClose}
            aria-label="Tutup"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "#4E2E1E",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "#F0E6D8")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "transparent")
            }
          >
            <X size={20} />
          </button>
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                color: "#4E2E1E",
                margin: 0,
              }}
            >
              Pesan untuk Bu Bina
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                color: "#9B7060",
                margin: 0,
              }}
            >
              Ceritakan kebutuhan kamu
            </p>
          </div>
        </div>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#D4A574",
            border: "1.5px solid #E8D8C8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#4E2E1E" }}>B</span>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 16px",
          paddingBottom: "8px",
        }}
      >
        {messages.map((msg) =>
          msg.role === "user" ? (
            <UserMessage key={msg.id} text={msg.text} />
          ) : (
            <BinaMessage
              key={msg.id}
              text={msg.text}
              showCTA={msg.showCTA}
              request={msg.text}
            />
          )
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 16px",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E8D8C8",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Tambahkan catatan..."
            style={{
              flex: 1,
              padding: "10px 14px",
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              color: "#4E2E1E",
              backgroundColor: "#FDF9F4",
              border: "1.5px solid #E8D8C8",
              borderRadius: "12px",
              outline: "none",
              transition: "border-color 200ms ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#B3835F";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#E8D8C8";
            }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: inputValue.trim() ? "#C45A3A" : "#E8D8C8",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: inputValue.trim() ? "pointer" : "not-allowed",
              transition: "background-color 200ms ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (inputValue.trim())
                (e.target as HTMLElement).style.backgroundColor = "#A84830";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = inputValue.trim()
                ? "#C45A3A"
                : "#E8D8C8";
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
