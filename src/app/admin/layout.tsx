import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "./components/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin - SMKS YP 17 Cilegon",
  description: "Admin panel for SMKS YP 17 Cilegon",
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

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${PoppinsFont.variable} ${InterFont.variable} antialiased`}
      >
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset className="flex flex-col">{children}</SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
