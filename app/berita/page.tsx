"use client";

import { useEffect, useState } from "react";
export type Berita = {
  id: number;
  judul: string;
  isi: string;
  foto?: string;
  penulis: string;
  tanggal: string;
  type: 'berita' | 'pengumuman' | 'agenda';
  created_at?: string;
  updated_at?: string;
};
import { Calendar, User, Eye } from "lucide-react";

export default function BeritaPage() {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await fetch("/api/berita");
        if (!res.ok) throw new Error("Failed to fetch berita");
        const data: Berita[] = await res.json();
        setBerita(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Berita</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Berita Terbaru</h1>
          <p className="text-xl md:text-2xl opacity-90">Informasi terkini dari Teknik Perangkat Lunak</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {berita.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Belum ada berita</h3>
            <p className="text-gray-500">Berita akan segera ditampilkan di sini.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {berita.map((item) => (
              <article key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                {item.foto && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.foto}
                      alt={item.judul}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors overflow-hidden">
                    {item.judul}
                  </h2>

                  <p className="text-gray-600 mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {item.isi}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        <span>{item.penulis}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        <span>{new Date(item.tanggal).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Eye size={16} className="mr-1" />
                      <span>Dibaca</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                    <span>Baca Selengkapnya</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
