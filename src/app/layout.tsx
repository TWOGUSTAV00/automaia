import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://automaia.pages.dev"),
  title: {
    default: "NemoWeb - Rede social de noticias",
    template: "%s | NemoWeb",
  },
  description:
    "NemoWeb e uma rede social de noticias com feed em tempo real, seguranca de conta, notificacoes e design OLED glassmorphism.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "NemoWeb",
    description: "Rede social de noticias segura, rapida e visual.",
    url: "https://automaia.pages.dev",
    siteName: "NemoWeb",
    images: ["/logo.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${inter.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-black text-slate-50">{children}</body>
    </html>
  );
}
