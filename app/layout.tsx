import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Email Calendar Dashboard - Interconnections",
  description: "Email marketing calendar dashboard for e-commerce brands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={interTight.variable}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[var(--paper)] font-sans antialiased">{children}</body>
    </html>
  );
}
