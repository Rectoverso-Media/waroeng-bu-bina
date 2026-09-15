// ─── Menu Types ─────────────────────────────────────────────────────────────
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  category: string;
  description?: string;
  image?: string;
  featured?: boolean;
}

// ─── Order Intent Types ──────────────────────────────────────────────────────
export type OrderIntent = "hari-ini" | "mingguan" | "bulanan" | "acara" | "langsung";

// ─── Conversation Flow Types ─────────────────────────────────────────────────
export interface ConversationMessage {
  id: string;
  role: "user" | "bina";
  text: string;
  timestamp: Date;
}

export interface OrderDraft {
  request: string;
  orderType?: OrderIntent;
  quantity?: string;
  notes?: string;
}
