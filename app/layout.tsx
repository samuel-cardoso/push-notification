import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notificações Push App",
  description:
    "Conversas separadas por vendedor, mensagens rápidas em 1 clique e Inteligência Artificial para qualificação de clientes - tudo em um único número de WhatsApp.",
  icons: {
    icon: "/public/icon.png",
    shortcut: "/icon.png",
    other: [{ rel: "manifest", url: "/manifest.json" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
