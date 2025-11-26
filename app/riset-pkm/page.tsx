"use client";

import { useState } from "react";
import ProjectMahasiswaList from "../component/ProjectMahasiswaList";
import ProjectList from "../component/ProjectList";
import PengabdianMasyarakatList from "../component/PengabdianMasyarakatList";

type MenuType = "project-mahasiswa" | "riset-dosen" | "pkm";

export default function RisetPKMPage() {
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);

  const menuOptions = [
    {
      id: "project-mahasiswa" as MenuType,
      title: "Project Mahasiswa",
      description: "Daftar proyek mahasiswa Program Studi Teknik Perangkat Lunak",
      icon: "P",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: "riset-dosen" as MenuType,
      title: "Riset Dosen",
      description: "Data riset dan penelitian yang dilakukan oleh dosen",
      icon: "R",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "pkm" as MenuType,
      title: "Pengabdian kepada Masyarakat",
      description: "Data pengabdian kepada masyarakat yang dilakukan oleh dosen",
      icon: "PKM",
      color: "from-green-500 to-green-600"
    }
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case "project-mahasiswa":
        return <ProjectMahasiswaList />;
      case "riset-dosen":
        return <ProjectList />;
      case "pkm":
        return <PengabdianMasyarakatList />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl text-white font-bold">R</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Riset & PKM</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pilih kategori yang ingin Anda lihat: Project Mahasiswa, Riset Dosen, atau Pengabdian kepada Masyarakat
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {!selectedMenu ? (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {menuOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedMenu(option.id)}
                className="campus-card rounded-xl p-8 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${option.color} rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl text-white font-bold">{option.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold campus-text mb-4">{option.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">{option.description}</p>
                <div className="mt-6 text-center">
                  <button className="campus-button px-6 py-2 rounded-lg font-semibold">
                    Pilih
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedMenu(null)}
                className="campus-button px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                ← Kembali ke Menu
              </button>
              <h2 className="text-2xl font-bold campus-text">
                {menuOptions.find(option => option.id === selectedMenu)?.title}
              </h2>
            </div>

            <div className="campus-card rounded-xl p-8">
              {renderContent()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
