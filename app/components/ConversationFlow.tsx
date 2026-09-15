"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import WhatsAppCTA from "./WhatsAppCTA";
import type { OrderIntent, OrderDraft } from "@/app/types";

interface Message {
  id: string;
  role: "user" | "bina";
  text: string;
}

const ORDER_TYPE_LABELS: Record<OrderIntent, string> = {
  "hari-ini": "Hari ini / besok",
  mingguan: "Mingguan",
  bulanan: "Bulanan",
  acara: "Acara",
  langsung: "Langsung",
};

const BIBA_RESPONSES = [
  "Bisa! Saya bantu pilihkan yang cocok untuk kebutuhan kamu.",
  "Wah, pilihan yang enak! Saya siap bantu siapkan.",
  "Siap! Saya akan bantu susun menu yang sesuai.",
  "Mantap! Mari saya bantu carikan yang terbaik untuk kamu.",
];

function BinaResponse({ text }: { text: string }) {
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
      <div>
        <div
          style={{
            display: "inline-block",
            padding: "12px 16px",
            backgroundColor: "#FFFFFF",
            borderRadius: "4px 16px 16px 16px",
            border: "1px solid #E8D8C8",
            boxShadow: "0 2px 8px rgba(78,46,30,0.06)",
            maxWidth: "260px",
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
  onSelectOrderType: (type: OrderIntent) => void;
}

export default function ConversationFlow({
  initialRequest,
  orderDraft,
  onClose,
  onSelectOrderType,
}: ConversationFlowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showOrderTypes, setShowOrderTypes] = useState(true);
  const [selectedOrderType, setSelectedOrderType] = useState<OrderIntent | null>(null);
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

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [initialRequest]);

  const handleSelectOrderType = (type: OrderIntent) => {
    setSelectedOrderType(type);
    setShowOrderTypes(false);

    const userText = `Saya pesan untuk: ${ORDER_TYPE_LABELS[type]}`;
    const binaFollowUp =
      type === "hari-ini"
        ? "Baik! Untuk kebutuhan hari ini atau besok, saya bisa bantu siapkan. Mau untuk berapa porsi, dan ada preferensi menu tertentu?"
        : type === "mingguan"
        ? "Untuk mingguan, saya biasanya susun menu yang variatif supaya tidak monoton. Ada berapa hari dalam seminggu yang kamu butuhkan?"
        : type === "bulanan"
        ? "Untuk kebutuhan bulanan, saya bisa buatkan paket yang lebih ekonomis. Boleh tahu kira-kira untuk berapa orang dan acara apa saja?"
        : type === "acara"
        ? "Untuk acara, biasanya saya tanyakan: berapa jumlah tamu, jenis acara apa, dan apakah ada permintaan khusus untuk menunya?"
        : "Langsung ke WhatsApp ya, di sana saya bisa bantu lebih detail untuk kebutuhan spesifik kamu.";

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text: userText },
      { id: (Date.now() + 1).toString(), role: "bina", text: binaFollowUp },
    ]);

    if (type === "langsung") {
      // Skip to WhatsApp flow
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { id: Date.now().toString(), role: "user", text: inputValue.trim() },
      {
        id: (Date.now() + 1).toString(),
        role: "bina",
        text: "Baik! Saya catat kebutuhan kamu. Kalau sudah sesuai, pesanan bisa dilanjutkan melalui WhatsApp untuk konfirmasi dan pembayaran.",
      },
    ];

    setMessages(newMessages);
    setInputValue("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const updatedDraft: OrderDraft = {
    ...orderDraft,
    request: initialRequest,
    orderType: selectedOrderType ?? undefined,
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
            <BinaResponse key={msg.id} text={msg.text} />
          )
        )}

        {/* Order type quick selection */}
        {showOrderTypes && (
          <div
            style={{
              marginTop: "16px",
              marginBottom: "8px",
              animation: "fadeUp 0.4s ease-out both",
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#9B7060",
                marginBottom: "12px",
                fontWeight: 500,
              }}
            >
              Mau pesan untuk apa?
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {Object.entries(ORDER_TYPE_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleSelectOrderType(key as OrderIntent)}
                  style={{
                    padding: "8px 14px",
                    fontSize: "13px",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    color: key === "langsung" ? "#25D366" : "#7A5240",
                    backgroundColor: key === "langsung" ? "#E8F7EF" : "#F0E6D8",
                    border: `1px solid ${key === "langsung" ? "#C8E8D4" : "#E8D8C8"}`,
                    borderRadius: "999px",
                    cursor: "pointer",
                    transition: "background-color 150ms ease, transform 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor =
                      key === "langsung" ? "#D0F0E0" : "#E8D0B8";
                    (e.target as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor =
                      key === "langsung" ? "#E8F7EF" : "#F0E6D8";
                    (e.target as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom section */}
      <div
        style={{
          padding: "12px 16px",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E8D8C8",
          flexShrink: 0,
        }}
      >
        {/* WhatsApp CTA */}
        <WhatsAppCTA
          request={updatedDraft.request}
          orderType={selectedOrderType ?? undefined}
          variant="card"
        />

        {/* Input fallback */}
        <div
          style={{
            marginTop: "10px",
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
