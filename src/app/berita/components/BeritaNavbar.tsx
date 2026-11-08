"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronLeft } from "lucide-react";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/berita", label: "Berita" },
  { href: "/#jurusan", label: "Jurusan" },
  { href: "/#kontak", label: "Kontak" },
];

export default function BeritaNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-sm">YP17</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-gray-900 text-lg leading-tight">
                SMK YP 17
              </h1>
              <p className="text-xs text-gray-500">Cilegon</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.href === "/berita"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Back to Home Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.href === "/berita"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium mt-4"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
