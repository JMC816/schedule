import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Modal from "@/components/modal";

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
  manifest: "/manifest.ts",
  icons: [
    { rel: "icon", url: "/icons/192.png", sizes: "192x192" },
    { rel: "icon", url: "/icons/512.png", sizes: "512x512" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto bg-neutral-950 text-white `}>
        <>
          <Modal>{children}</Modal>
          <Footer />
        </>
      </body>
    </html>
  );
}
