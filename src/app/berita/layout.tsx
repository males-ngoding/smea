import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "Berita - SMKS YP 17 Cilegon",
  description: "Berita terbaru dari SMKS YP 17 Cilegon",
};

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const InterFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${PoppinsFont.variable} ${InterFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
