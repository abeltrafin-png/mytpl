"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import PeraturanList from "../component/PeraturanList";
import { FileText, BookOpen, Users, Briefcase, DollarSign } from "lucide-react";

function PeraturanContent() {
  const searchParams = useSearchParams();
  const [activeKategori, setActiveKategori] = useState<string>("akademik");

  useEffect(() => {
    const kategoriParam = searchParams.get("kategori");
    if (kategoriParam) {
      setActiveKategori(kategoriParam);
    } else {
      // Default ke akademik jika tidak ada parameter
      setActiveKategori("akademik");
    }
  }, [searchParams]);

  const categories = [
    {
      id: "akademik",
      label: "Akademik",
      icon: BookOpen,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      description: "Peraturan terkait sistem akademik dan pembelajaran"
    },
    {
      id: "kemahasiswaan",
      label: "Kemahasiswaan",
      icon: Users,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      description: "Peraturan terkait kegiatan dan organisasi mahasiswa"
    },
    {
      id: "administratif",
      label: "Administratif",
      icon: Briefcase,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      description: "Peraturan terkait administrasi dan prosedur kampus"
    },
    {
      id: "keuangan",
      label: "Keuangan",
      icon: DollarSign,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      description: "Peraturan terkait biaya pendidikan dan pembayaran"
    }
  ];

  const activeCategory = categories.find(cat => cat.id === activeKategori);

  return (
    <div className="min-h-screen flex flex-col page-bg">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <div className="campus-bg text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <FileText className="mx-auto mb-4" size={64} />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Peraturan Program Studi
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Kumpulan peraturan dan pedoman yang berlaku di Program Studi Teknik Perangkat Lunak
              </p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeKategori === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveKategori(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? `${category.color} text-white shadow-lg scale-105`
                        : `bg-gray-100 text-gray-700 ${category.hoverColor} hover:text-white`
                    }`}
                  >
                    <Icon size={20} />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Info */}
          {activeCategory && (
            <div className="mb-8">
              <div className={`${activeCategory.color} text-white rounded-lg p-6 shadow-lg`}>
                <div className="flex items-center gap-3 mb-2">
                  {(() => {
                    const Icon = activeCategory.icon;
                    return <Icon size={32} />;
                  })()}
                  <h2 className="text-3xl font-bold">
                    Peraturan {activeCategory.label}
                  </h2>
                </div>
                <p className="text-white/90 text-lg">
                  {activeCategory.description}
                </p>
              </div>
            </div>
          )}

          {/* Peraturan List */}
          <PeraturanList kategori={activeKategori} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PeraturanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <PeraturanContent />
    </Suspense>
  );
}
