"use client";

import { useEffect, useState } from "react";

type Dosen = {
  id: number;
  nidn: string;
  nama: string;
  email: string;
  jurusan: string;
  jabatan: string;
  foto_url: string;
};

export default function Tabeltes() {
  const [data, setData] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dosen");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result: Dosen[] = await res.json();
        setData(result);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300 bg-white">
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-blue-500">ID</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-blue-500">Foto</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-blue-500">NIDN</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-blue-500">Nama</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-blue-500">Email</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-blue-500">Jurusan</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-blue-500">Jabatan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((dosen) => (
            <tr key={dosen.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{dosen.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                <img src={dosen.foto_url} alt={dosen.nama} className="w-12 h-12 rounded-full object-cover" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{dosen.nidn}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{dosen.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{dosen.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{dosen.jurusan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{dosen.jabatan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
