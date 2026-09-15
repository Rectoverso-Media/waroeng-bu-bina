import type { MenuItem } from "@/app/types";

export const menuItems: MenuItem[] = [
  {
    id: "ayam-bakar",
    name: "Ayam Bakar",
    price: 25000,
    priceFormatted: "Rp 25.000 / porsi",
    category: "makanan",
    description: "Ayam bakar dengan bumbu rempah pilihan.",
    image: "/assets/hero/hero-food.png",
    featured: true,
  },
  {
    id: "ayam-goreng",
    name: "Ayam Goreng",
    price: 22000,
    priceFormatted: "Rp 22.000 / porsi",
    category: "makanan",
    description: "Ayam goreng renyah di luar, lembut di dalam.",
    image: "/assets/hero/hero-food.png",
  },
  {
    id: "sayur-asem",
    name: "Sayur Asem",
    price: 15000,
    priceFormatted: "Rp 15.000 / porsi",
    category: "sayuran",
    description: "Sayur asem segar dengan bumbu tradisional.",
    image: "/assets/hero/hero-food.png",
  },
  {
    id: "tumis-kangkung",
    name: "Tumis Kangkung",
    price: 12000,
    priceFormatted: "Rp 12.000 / porsi",
    category: "sayuran",
    description: "Kangkung tumis dengan bawang dan cabai.",
    image: "/assets/hero/hero-food.png",
  },
];

export const suggestions = [
  "Ayam bakar untuk 5 orang",
  "Nasi box untuk rapat",
  "Makan siang mingguan",
];

export const whatsappNumber = "62818190692"; // Indonesia (+62) — 0818190692
export const whatsappBaseUrl = "https://wa.me";
