"use client";

import { useState } from "react";
import InformasiList from "../component/InformasiList";

export default function InformasiPage() {
  const [activeTab, setActiveTab] = useState<'berita' | 'pengumuman' | 'agenda'>('berita');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Informasi</h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab('berita')}
            className={`px-4 py-2 mx-2 rounded ${activeTab === 'berita' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Berita
          </button>
          <button
            onClick={() => setActiveTab('pengumuman')}
            className={`px-4 py-2 mx-2 rounded ${activeTab === 'pengumuman' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Pengumuman
          </button>
          <button
            onClick={() => setActiveTab('agenda')}
            className={`px-4 py-2 mx-2 rounded ${activeTab === 'agenda' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Agenda
          </button>
        </div>

        {/* Content */}
        <InformasiList type={activeTab} />
      </div>
    </div>
  );
}
