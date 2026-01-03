import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CaveBackgroundWrapper } from "@/components/shared";
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
  title: "Clark Kitchen | Kyzlo - AI Engineer & Full-Stack Developer",
  description: "Portfolio of Clark Kitchen: AI agent systems, algorithmic trading, Web3 applications, and educational technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Batcave atmosphere - PIXI.js WebGL */}
        <CaveBackgroundWrapper />
        {children}
      </body>
    </html>
  );
}
