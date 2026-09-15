import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Waroeng Bu Bina — Masakan Rumahan, untuk Hari yang Lebih Baik",
  description:
    "Ceritakan kebutuhan makanan kamu. Bu Bina akan membantu menyiapkannya. Masakan rumahan untuk hari yang lebih baik.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bu Bina" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
