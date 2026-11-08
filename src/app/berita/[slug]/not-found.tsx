import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Berita Tidak Ditemukan
        </h1>
        <p className="text-gray-600 mb-8">
          Maaf, berita yang Anda cari tidak ditemukan atau mungkin telah
          dihapus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/berita"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Berita</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            <span>Ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
