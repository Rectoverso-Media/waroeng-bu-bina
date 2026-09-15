"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, User, Phone, MapPin, Calendar, MessageSquare, Check } from "lucide-react";
import { menuItems } from "@/app/data/menu";
import type { OrderIntent } from "@/app/types";
import { supabase } from "@/app/lib/supabase";

const ORDER_TYPES: { key: OrderIntent; label: string; desc: string }[] = [
  { key: "hari-ini", label: "Hari ini / besok", desc: "Untuk kebutuhan mendesak" },
  { key: "mingguan", label: "Mingguan", desc: "Rutin beberapa hari" },
  { key: "bulanan", label: "Bulanan", desc: "Untuk kebutuhan rutin bulanan" },
  { key: "acara", label: "Acara", desc: "Rapat, pengajian, hajatan" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export default function OrderPage() {
  const [orderType, setOrderType] = useState<OrderIntent | "">("");
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill from URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemName = params.get("item");
    if (itemName) {
      const item = menuItems.find(
        (m) => m.name.toLowerCase() === itemName.toLowerCase()
      );
      if (item) {
        setSelectedItems([{ id: item.id, name: item.name, price: item.price, qty: 1 }]);
      }
    }
  }, []);

  const addItem = (item: (typeof menuItems)[0]) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setSelectedItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item && item.qty > 1) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i));
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const total = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!orderType) errs.orderType = "Pilih jenis pesanan";
    if (!name.trim()) errs.name = "Nama lengkap diperlukan";
    if (!phone.trim()) errs.phone = "Nomor WhatsApp diperlukan";
    if (!address.trim()) errs.address = "Alamat lengkap diperlukan";
    if (selectedItems.length === 0) errs.items = "Pilih minimal 1 menu";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    const orderTypeLabel: Record<OrderIntent, string> = {
      "hari-ini": "Hari ini / besok",
      mingguan: "Mingguan",
      bulanan: "Bulanan",
      acara: "Acara",
      langsung: "Langsung",
    };

    const orderData = {
      name,
      phone,
      address,
      order_type: orderType,
      order_type_label: orderTypeLabel[orderType as OrderIntent],
      items: selectedItems,
      total,
      delivery_date: deliveryDate,
      notes,
      created_at: new Date().toISOString(),
    };

    // Store in Supabase
    try {
      await supabase.from("orders").insert([orderData]);
    } catch {
      // Continue even if DB fails
    }

    // Build WhatsApp message
    const lines = [
      "Assalamualaikum Bu Bina, saya mau pesan:",
      "",
      `Nama: ${name}`,
      `WhatsApp: ${phone}`,
      `Alamat: ${address}`,
      `Jenis pesanan: ${orderTypeLabel[orderType as OrderIntent]}`,
      deliveryDate ? `Tanggal kirim: ${deliveryDate}` : "",
      "",
      "Menu:",
      ...selectedItems.map((i) => `• ${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`),
      "",
      `Total: ${formatPrice(total)}`,
      notes ? `Catatan: ${notes}` : "",
      "",
      "Mohon bantuannya ya Bu, terima kasih! 🙏",
    ];

    const message = encodeURIComponent(lines.filter(Boolean).join("\n"));
    const whatsappUrl = `https://wa.me/62818190692?text=${message}`;

    // Redirect to confirmation first, then WhatsApp
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    window.location.href = `/order/confirmed?id=${orderId}&wa=${encodeURIComponent(whatsappUrl)}`;
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#FDF9F4",
        paddingBottom: "calc(100px + env(safe-area-inset-bottom))",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(253, 249, 244, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E8D8C8",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            height: "72px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              color: "#4E2E1E",
              textDecoration: "none",
              transition: "background-color 150ms ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F0E6D8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <ArrowLeft size={22} strokeWidth={2} />
          </Link>
          <div>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "#4E2E1E",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Form Pesanan
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                color: "#9B7060",
                margin: 0,
                fontWeight: 500,
              }}
            >
              Isi detail pesanan Anda
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Order type */}
        <section style={{ marginBottom: "24px" }}>
          <SectionLabel>Jenis pesanan</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {ORDER_TYPES.map((ot) => (
              <button
                key={ot.key}
                onClick={() => {
                  setOrderType(ot.key);
                  setErrors((e) => ({ ...e, orderType: "" }));
                }}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border:
                    orderType === ot.key
                      ? "2px solid #4E2E1E"
                      : "1.5px solid #E8D8C8",
                  backgroundColor: orderType === ot.key ? "#4E2E1E" : "#FFFFFF",
                  color: orderType === ot.key ? "#FFFFFF" : "#4E2E1E",
                  cursor: "pointer",
                  textAlign: "left",
                  transition:
                    "background-color 150ms ease, border-color 150ms ease, color 150ms ease",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    margin: "0 0 2px 0",
                  }}
                >
                  {ot.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    fontWeight: 400,
                    opacity: orderType === ot.key ? 0.8 : 0.6,
                    margin: 0,
                  }}
                >
                  {ot.desc}
                </p>
              </button>
            ))}
          </div>
          {errors.orderType && <ErrorText>{errors.orderType}</ErrorText>}
        </section>

        {/* Cart */}
        <section style={{ marginBottom: "24px" }}>
          <SectionLabel>
            Menu yang dipesan
            <span
              style={{
                fontSize: "12px",
                color: "#9B7060",
                fontWeight: 400,
                marginLeft: "6px",
              }}
            >
              ({selectedItems.length} item)
            </span>
          </SectionLabel>

          {/* Selected items */}
          {selectedItems.length > 0 && (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "14px",
                border: "1.5px solid #E8D8C8",
                overflow: "hidden",
                marginBottom: "10px",
              }}
            >
              {selectedItems.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 14px",
                    borderBottom:
                      i < selectedItems.length - 1
                        ? "1px solid #F0E6D8"
                        : "none",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#4E2E1E",
                        margin: "0 0 2px 0",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        color: "#C45A3A",
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                  {/* Qty controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "1.5px solid #E8D8C8",
                        backgroundColor: "#FFFFFF",
                        color: "#4E2E1E",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        lineHeight: 1,
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#4E2E1E",
                        minWidth: "20px",
                        textAlign: "center",
                      }}
                    >
                      {item.qty}
                    </span>
                    <button
                      onClick={() => {
                        const mi = menuItems.find((m) => m.id === item.id);
                        if (mi) addItem(mi);
                      }}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#4E2E1E",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        lineHeight: 1,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              {/* Total */}
              <div
                style={{
                  padding: "12px 14px",
                  backgroundColor: "#FDF9F4",
                  borderTop: "1px solid #F0E6D8",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#7A5240",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#C45A3A",
                  }}
                >
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          )}

          {/* Add items */}
          <button
            onClick={() => {
              const el = document.getElementById("menu-picker");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1.5px dashed #D4B8A0",
              backgroundColor: "transparent",
              color: "#C45A3A",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(196,90,58,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            + Tambah menu lain
          </button>

          {errors.items && <ErrorText>{errors.items}</ErrorText>}
        </section>

        {/* Menu picker */}
        <div id="menu-picker" style={{ marginBottom: "24px" }}>
          <SectionLabel>Pilih dari menu</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
            }}
          >
            {menuItems.slice(0, 4).map((item) => {
              const inCart = selectedItems.some((i) => i.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => addItem(item)}
                  style={{
                    backgroundColor: inCart ? "rgba(196,90,58,0.06)" : "#FFFFFF",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: inCart
                      ? "1.5px solid rgba(196,90,58,0.3)"
                      : "1.5px solid #F0E6D8",
                    cursor: "pointer",
                    transition:
                      "background-color 150ms ease, border-color 150ms ease",
                  }}
                >
                  <div style={{ height: "80px", position: "relative" }}>
                    <Image
                      src={item.image || "/assets/hero/hero-food.png"}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="200px"
                    />
                  </div>
                  <div style={{ padding: "8px 10px" }}>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#4E2E1E",
                        margin: "0 0 2px 0",
                      }}
                    >
                      {item.name}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#C45A3A",
                        }}
                      >
                        {formatPrice(item.price)}
                      </span>
                      {inCart && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                            fontSize: "10px",
                            color: "#C45A3A",
                            fontWeight: 600,
                          }}
                        >
                          <Check size={10} /> Ditambahkan
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personal details */}
        <section style={{ marginBottom: "24px" }}>
          <SectionLabel>Detail pengiriman</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <TextField
              icon={<User size={15} />}
              label="Nama lengkap"
              placeholder="Contoh: Siti Rahayu"
              value={name}
              onChange={(v) => {
                setName(v);
                setErrors((e) => ({ ...e, name: "" }));
              }}
              error={errors.name}
            />
            <TextField
              icon={<Phone size={15} />}
              label="Nomor WhatsApp"
              placeholder="Contoh: 081234567890"
              value={phone}
              onChange={(v) => {
                setPhone(v);
                setErrors((e) => ({ ...e, phone: "" }));
              }}
              error={errors.phone}
              keyboardType="tel"
            />
            <TextField
              icon={<MapPin size={15} />}
              label="Alamat lengkap"
              placeholder="Contoh: Jl. Melati No. 12, RT 03/RW 02, Kelurahan Mawar, Jakarta Selatan"
              value={address}
              onChange={(v) => {
                setAddress(v);
                setErrors((e) => ({ ...e, address: "" }));
              }}
              error={errors.address}
              multiline
            />
            <TextField
              icon={<Calendar size={15} />}
              label="Tanggal kirim (opsional)"
              placeholder="Contoh: Jumat, 20 September 2024"
              value={deliveryDate}
              onChange={setDeliveryDate}
            />
            <TextField
              icon={<MessageSquare size={15} />}
              label="Catatan (opsional)"
              placeholder="Contoh: Tanpa pedas, porsi besar"
              value={notes}
              onChange={setNotes}
              multiline
            />
          </div>
        </section>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: submitting ? "#E8D8C8" : "#25D366",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "14px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            cursor: submitting ? "not-allowed" : "pointer",
            boxShadow: "0 4px 14px rgba(37,211,102,0.30)",
            transition: "background-color 200ms ease, transform 150ms ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          onMouseEnter={(e) => {
            if (!submitting) {
              e.currentTarget.style.backgroundColor = "#1FA855";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            if (!submitting) {
              e.currentTarget.style.backgroundColor = "#25D366";
              e.currentTarget.style.transform = "translateY(0)";
            }
          }}
        >
          {submitting ? (
            "Mengirim..."
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.211l4.287-1.398A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.138 0-4.146-.677-5.803-1.82l-.416-.272-2.657.868.854-2.61-.287-.445A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Kirim Pesanan via WhatsApp
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "16px",
        fontWeight: 700,
        color: "#4E2E1E",
        margin: "0 0 12px 0",
      }}
    >
      {children}
    </h2>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "12px",
        color: "#C45A3A",
        margin: "6px 0 0 0",
        fontWeight: 500,
      }}
    >
      {children}
    </p>
  );
}

interface TextFieldProps {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  keyboardType?: string;
  multiline?: boolean;
}

function TextField({
  icon,
  label,
  placeholder,
  value,
  onChange,
  error,
  multiline,
}: TextFieldProps) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "12px 14px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          border: error ? "1.5px solid #C45A3A" : "1.5px solid #E8D8C8",
          transition: "border-color 200ms ease",
        }}
      >
        <div
          style={{
            color: "#B3835F",
            marginTop: "2px",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              color: "#9B7060",
              margin: "0 0 2px 0",
              letterSpacing: "0.04em",
              textTransform: "uppercase" as const,
            }}
          >
            {label}
          </p>
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={3}
              style={{
                width: "100%",
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                color: "#4E2E1E",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                resize: "none",
                lineHeight: 1.5,
                padding: 0,
                boxSizing: "border-box",
              }}
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              style={{
                width: "100%",
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                color: "#4E2E1E",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                padding: 0,
                boxSizing: "border-box",
              }}
            />
          )}
        </div>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
