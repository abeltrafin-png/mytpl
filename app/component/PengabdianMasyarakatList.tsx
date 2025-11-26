"use client";

import { useEffect, useState } from "react";

type PengabdianMasyarakat = {
  id_pengabdian: number;
  nidn: string;
  nama_dosen: string;
  judul_pengabdian: string;
  bidang_pengabdian: string;
  lokasi: string;
  tahun: number;
  sumber_dana: string;
  jumlah_dana: number;
  mitra: string;
  deskripsi: string;
  file_laporan: string;
  tanggal_input: string;
};

export default function PengabdianMasyarakatList() {
  const [data, setData] = useState<PengabdianMasyarakat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/pengabdian-masyarakat");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result: PengabdianMasyarakat[] = await res.json();
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
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300 bg-white p-6">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">ID</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">NIDN</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">Nama Dosen</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">Judul Pengabdian</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">Bidang</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">Lokasi</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">Tahun</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">Sumber Dana</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">Jumlah Dana</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">Mitra</th>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border border-green-500">Deskripsi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id_pengabdian} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold border border-gray-300">{item.id_pengabdian}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold border border-gray-300">{item.nidn}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold border border-gray-300">{item.nama_dosen}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold border border-gray-300">{item.judul_pengabdian}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold border border-gray-300">{item.bidang_pengabdian}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold border border-gray-300">{item.lokasi}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold border border-gray-300">{item.tahun}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold border border-gray-300">{item.sumber_dana}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold border border-gray-300">Rp {item.jumlah_dana?.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold border border-gray-300">{item.mitra}</td>
              <td className="px-6 py-4 text-sm text-gray-800 font-semibold border border-gray-300 max-w-xs truncate">{item.deskripsi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
