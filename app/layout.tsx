import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import FullscreenNav from "@/components/FullscreenNav";
import Footer from "@/components/Footer";
import DiamondCursor from "@/components/DiamondCursor";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeagueMed — Where Medicine Meets Capital",
  description:
    "An exclusive private investment community for physicians and medical professionals. Access private market deals in medical arts, sciences, and technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#0A1628] text-white cursor-none">
        <SmoothScroll>
          <DiamondCursor />
          <FullscreenNav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
