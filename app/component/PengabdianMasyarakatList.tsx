"use client";

import Table from "@/app/component/ui/table";

type PengabdianMasyarakat = {
  id_pengabdian: number;
  nidn: string;
  nama_dosen: string;
  judul_pengabdian: string;
  bidang_pengabdian: string;
  lokasi: string;
  tahun: number;
  sumber_dana: string;
};

interface PengabdianMasyarakatListProps {
  initialData: PengabdianMasyarakat[];
}

export default function PengabdianMasyarakatList({
  initialData,
}: PengabdianMasyarakatListProps) {
  const columns = [
    { key: "nama_dosen", label: "Nama Dosen" },
    { key: "judul_pengabdian", label: "Judul Pengabdian" },
    { key: "bidang_pengabdian", label: "Bidang" },
    { key: "lokasi", label: "Lokasi" },
    { key: "tahun", label: "Tahun" },
    { key: "sumber_dana", label: "Sumber Dana" },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Daftar Pengabdian Masyarakat</h2>
      <Table columns={columns} data={initialData} />
    </div>
  );
}