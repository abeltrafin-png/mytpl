"use client";

import { useEffect, useState } from "react";
import { FileText, Download, Calendar, ChevronDown, ChevronUp } from "lucide-react";

type Peraturan = {
  id: number;
  judul: string;
  nomor_peraturan: string;
  isi: string;
  kategori: 'akademik' | 'kemahasiswaan' | 'administratif' | 'keuangan';
  file_url?: string;
  tanggal_berlaku: string;
  status: 'aktif' | 'tidak_aktif';
  created_at?: string;
  updated_at?: string;
};

type PeraturanListProps = {
  kategori?: string;
};

export default function PeraturanList({ kategori }: PeraturanListProps) {
  const [peraturan, setPeraturan] = useState<Peraturan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchPeraturan();
  }, [kategori]);

  const fetchPeraturan = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = "/api/peraturan";
      if (kategori) {
        url += `?kategori=${kategori}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Gagal mengambil data peraturan");
      
      const data = await response.json();
      setPeraturan(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getKategoriLabel = (kat: string) => {
    const labels: { [key: string]: string } = {
      'akademik': 'Akademik',
      'kemahasiswaan': 'Kemahasiswaan',
      'administratif': 'Administratif',
      'keuangan': 'Keuangan'
    };
    return labels[kat] || kat;
  };

  const getKategoriColor = (kat: string) => {
    const colors: { [key: string]: string } = {
      'akademik': 'bg-blue-100 text-blue-800',
      'kemahasiswaan': 'bg-green-100 text-green-800',
      'administratif': 'bg-purple-100 text-purple-800',
      'keuangan': 'bg-orange-100 text-orange-800'
    };
    return colors[kat] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (peraturan.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg text-center">
        <FileText className="mx-auto mb-2" size={48} />
        <p className="font-semibold">Tidak ada peraturan yang tersedia</p>
        <p className="text-sm">Belum ada peraturan untuk kategori ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {peraturan.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
        >
          <div className="p-6">
          <div className="flex items-start justify-between mb-3">
              <div className="flex-1 flex items-center gap-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getKategoriColor(item.kategori)}`}>
                    {getKategoriLabel(item.kategori)}
                  </span>
                  <span className="text-sm text-gray-500 font-mono ml-2">
                    {item.nomor_peraturan}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 mt-1">
                    {item.judul}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Berlaku: {formatDate(item.tanggal_berlaku)}</span>
                    </div>
                    {item.status === 'aktif' && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                        Aktif
                      </span>
                    )}
                  </div>
                </div>
                {item.file_url && (
                  <a
                    href={`http://127.0.0.1:8000/storage/${item.file_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-700 text-sm"
                    title="Download Dokumen PDF"
                  >
                    <Download size={16} />
                    PDF
                  </a>
                )}
              </div>
              <button
                onClick={() => toggleExpand(item.id)}
                className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={expandedId === item.id ? "Tutup detail" : "Lihat detail"}
              >
                {expandedId === item.id ? (
                  <ChevronUp size={24} className="text-gray-600" />
                ) : (
                  <ChevronDown size={24} className="text-gray-600" />
                )}
              </button>
            </div>

            {expandedId === item.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.isi}
                  </p>
                </div>
                
                {item.file_url && (
                  <div className="mt-4">
                    <a
                      href={`http://localhost:8000/storage/${item.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download size={18} />
                      <span>Download Dokumen PDF</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
