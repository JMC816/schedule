import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "더 스케줄러",
  description: "오늘 할 일과 스케줄을 기록할 수 있는 서비스",
  icons: [
    { rel: "icon", url: "icons/192.png", sizes: "192x192" },
    { rel: "icon", url: "icons/512.png", sizes: "512x512" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADSENCE}`}
          crossOrigin="anonymous"
        ></Script>
      </head>
      <body className={`${inter.className} mx-auto bg-neutral-950 text-white `}>
        {children}
      </body>
    </html>
  );
}
