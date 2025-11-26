"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

type Dosen = {
  id: number;
  nidn: string;
  nama: string;
  email: string;
  jurusan: string;
  jabatan: string;
  foto_url: string;
};

export default function DosenPage() {
  const [dosens, setDosens] = useState<Dosen[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJabatan, setSelectedJabatan] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dosen');
        const data: Dosen[] = await response.json();
        setDosens(data);
      } catch (error) {
        console.error('Error fetching dosens:', error);
      }
    };
    fetchData();
  }, []);

  const jabatanOptions = ['Semua', ...Array.from(new Set(dosens.map(d => d.jabatan)))];

  const filteredDosens = dosens
    .filter(dosen =>
      dosen.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dosen.nidn.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(dosen =>
      selectedJabatan === 'Semua' || dosen.jabatan === selectedJabatan
    );

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredDosens.length / itemsPerPage);
  const paginatedDosens = filteredDosens.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getJabatanColor = (jabatan: string) => {
    const colors: { [key: string]: string } = {
      'Tenaga Pengajar': 'from-blue-500 to-cyan-500',
      'Asisten Ahli': 'from-green-500 to-teal-500',
      'Lektor': 'from-yellow-500 to-amber-500',
      'Lektor Kepala': 'from-orange-500 to-red-500',
      'Guru Besar': 'from-red-600 to-rose-600',
      'Ketua Program Studi': 'from-purple-500 to-pink-500',
    };
    return colors[jabatan] || 'from-gray-500 to-slate-500';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800">Profil Dosen</h1>
          <p className="text-lg text-gray-600 mt-2">Fakultas Teknik dan Ilmu Komputer</p>
        </motion.div>

        {/* Filter and Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white rounded-xl shadow-md"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari nama atau NIDN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div className="flex-shrink-0">
            <select
              value={selectedJabatan}
              onChange={(e) => setSelectedJabatan(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {jabatanOptions.map(jabatan => (
                <option key={jabatan} value={jabatan}>{jabatan}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Dosen Grid */}
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {paginatedDosens.map(dosen => (
              <motion.div
                key={dosen.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Photo Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dosen.foto_url}
                      alt={dosen.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = '/api/placeholder/300/300'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Jabatan Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${getJabatanColor(dosen.jabatan)}`}>
                        {dosen.jabatan}
                      </span>
                    </div>
                  </div>
                  
                  {/* Info Section */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 truncate">{dosen.nama}</h3>
                    <p className="text-sm text-gray-500">NIDN: {dosen.nidn}</p>
                    <div className="mt-auto pt-4">
                      <p className="text-sm text-blue-600 font-medium truncate">{dosen.email}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center items-center mt-12 space-x-4"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-gray-700 font-medium">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}