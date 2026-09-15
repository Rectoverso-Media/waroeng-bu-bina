"use client";

import { X, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export interface ChatHistoryItem {
  id: string;
  request: string;
  timestamp: number;
}

const STORAGE_KEY = "wbb_chat_history";

export function getChatHistory(): ChatHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveChatHistory(items: ChatHistoryItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 50)));
  } catch {}
}

export function addChatHistory(request: string): string {
  const id = Date.now().toString();
  const items = getChatHistory();
  items.unshift({ id, request, timestamp: Date.now() });
  saveChatHistory(items);
  return id;
}

function formatDay(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const itemDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((today.getTime() - itemDay.getTime()) / 86400000);

  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 7) return date.toLocaleDateString("id-ID", { weekday: "long" });
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long" });
}

interface ChatHistoryModalProps {
  onClose: () => void;
  onSelect: (item: ChatHistoryItem) => void;
}

export default function ChatHistoryModal({ onClose, onSelect }: ChatHistoryModalProps) {
  const [items, setItems] = useState<ChatHistoryItem[]>([]);

  useEffect(() => {
    setItems(getChatHistory());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = items.filter((item) => item.id !== id);
    saveChatHistory(updated);
    setItems(updated);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Riwayat chat"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(78,46,30,0.45)",
        zIndex: 200,
        animation: "fadeIn 0.25s ease-out both",
        display: "flex",
        alignItems: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxHeight: "85vh",
          backgroundColor: "#FDF9F4",
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.32s cubic-bezier(0.4, 0, 0.2, 1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "12px",
            paddingBottom: "4px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: "#E8D8C8",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px 12px",
            borderBottom: "1px solid #F0E6D8",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#4E2E1E",
              margin: 0,
            }}
          >
            Riwayat Chat
          </h2>
          <button
            onClick={onClose}
            aria-label="Tutup"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "#7A5240",
              display: "flex",
              borderRadius: "10px",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F0E6D8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <X size={22} strokeWidth={2} />
          </button>
        </div>

        {/* List */}
        <div style={{ overflowY: "auto", flex: 1, padding: "12px 20px 24px" }}>
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "#9B7060",
              }}
            >
              <MessageCircle
                size={40}
                strokeWidth={1.5}
                style={{ margin: "0 auto 12px", opacity: 0.4 }}
              />
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#9B7060",
                  margin: 0,
                }}
              >
                Belum ada riwayat chat
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  color: "#B3835F",
                  margin: "6px 0 0 0",
                }}
              >
                Percakapan kamu akan muncul di sini
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {items.map((item, i) => (
                <div key={item.id}>
                  {/* Date separator */}
                  {i === 0 ||
                  formatDay(new Date(items[i - 1].timestamp)) !==
                      formatDay(new Date(item.timestamp)) ? (
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#B3835F",
                        margin: "8px 0 4px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {formatDay(new Date(item.timestamp))}
                    </p>
                  ) : null}

                  {/* Chat item */}
                  <div
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      padding: "12px 14px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "14px",
                      border: "1.5px solid #F0E6D8",
                      cursor: "pointer",
                      transition:
                        "background-color 150ms ease, border-color 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#FDF9F4";
                      e.currentTarget.style.borderColor = "#E8D8C8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                      e.currentTarget.style.borderColor = "#F0E6D8";
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        backgroundColor: "#F0E6D8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <MessageCircle size={16} color="#7A5240" strokeWidth={2} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#4E2E1E",
                          margin: 0,
                          lineHeight: 1.4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.request}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "11px",
                          color: "#9B7060",
                          margin: "3px 0 0 0",
                        }}
                      >
                        {new Date(item.timestamp).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      aria-label="Hapus"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        color: "#9B7060",
                        display: "flex",
                        borderRadius: "6px",
                        transition: "background-color 150ms ease",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#FDECE9";
                        e.currentTarget.style.color = "#C45A3A";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#9B7060";
                      }}
                    >
                      <X size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
