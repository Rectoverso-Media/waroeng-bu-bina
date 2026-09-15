import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Waroeng Bu Bina — Masakan Rumahan, untuk Hari yang Lebih Baik",
  description:
    "Ceritakan kebutuhan makanan kamu. Bu Bina akan membantu menyiapkannya. Masakan rumahan untuk hari yang lebih baik.",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FDF9F4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
