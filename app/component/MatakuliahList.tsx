"use client";
import { useState, useEffect } from "react";
import { BookUser, ChevronDown, ChevronUp, Info, Loader2, ServerCrash } from "lucide-react";

interface Dosen {
  id: number;
  nama: string;
  nidn: string;
  foto_url: string;
}

interface Matakuliah {
  id: number;
  kode: string;
  nama:string;
  sks: number;
  semester: number;
  dosen_id: number;
  dosen: Dosen;
}

interface MatakuliahListProps {
  initialData: Matakuliah[];
}

const MatakuliahList = ({ initialData }: MatakuliahListProps) => {
  const [matakuliah, setMatakuliah] = useState<Matakuliah[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setMatakuliah(initialData);
      setLoading(false);
    }
  }, [initialData]);

  const uniqueSemesters = Array.from(new Set(matakuliah.map((mk) => mk.semester))).sort((a, b) => a - b);

  const filteredMatakuliah = selectedSemester ? matakuliah.filter((mk) => mk.semester === selectedSemester) : matakuliah;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg shadow-md">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="mt-4 text-lg font-semibold text-gray-600">Memuat data mata kuliah...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-lg shadow-md border border-red-200">
        <ServerCrash className="w-12 h-12 text-red-500" />
        <p className="mt-4 text-lg font-semibold text-red-600">Gagal Memuat Data</p>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Daftar Mata Kuliah</h2>
        <div className="relative">
          <button onClick={() => setIsSemesterOpen(!isSemesterOpen)} className="flex items-center justify-between w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {selectedSemester ? `Semester ${selectedSemester}` : "Semua Semester"}
            {isSemesterOpen ? <ChevronUp className="w-5 h-5 ml-2 -mr-1" /> : <ChevronDown className="w-5 h-5 ml-2 -mr-1" />}
          </button>
          {isSemesterOpen && (
            <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedSemester(null); setIsSemesterOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Semua Semester
                </a>
                {uniqueSemesters.map((semester) => (
                  <a href="#" key={semester} onClick={(e) => { e.preventDefault(); setSelectedSemester(semester); setIsSemesterOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Semester {semester}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Mata Kuliah</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Dosen Pengajar</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">SKS</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Semester</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMatakuliah.map((mk) => (
              <tr key={mk.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                      <BookUser className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900">{mk.nama}</div>
                      <div className="text-xs text-gray-500">{mk.kode}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{mk.dosen?.nama || "Belum ada dosen"}</div>
                      <div className="text-xs text-gray-500">NIDN: {mk.dosen?.nidn || "-"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{mk.sks} SKS</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    {mk.semester}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredMatakuliah.map((mk) => (
          <div key={mk.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                <BookUser className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-bold text-gray-900">{mk.nama}</p>
                <p className="text-xs text-gray-500">{mk.kode}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center mb-2">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{mk.dosen?.nama || "Belum ada dosen"}</p>
                  <p className="text-xs text-gray-500">NIDN: {mk.dosen?.nidn || "-"}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mt-3">
                <div className="flex items-center space-x-1">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{mk.sks} SKS</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    Semester {mk.semester}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMatakuliah.length === 0 && (
        <div className="text-center py-10">
          <Info className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Data Tidak Ditemukan</h3>
          <p className="mt-1 text-sm text-gray-500">Tidak ada mata kuliah untuk semester yang dipilih.</p>
        </div>
      )}
    </div>
  );
};

export default MatakuliahList;