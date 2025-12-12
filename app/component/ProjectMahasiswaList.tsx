"use client";

import Table from "@/app/component/ui/table";

type ProjectMahasiswa = {
  id: number;
  nama_mahasiswa: string;
  judul_project: string;
  dosen_pembimbing: string;
};

interface ProjectMahasiswaListProps {
  initialData: ProjectMahasiswa[];
}

export default function ProjectMahasiswaList({
  initialData,
}: ProjectMahasiswaListProps) {
  const columns = [
    { key: "nama_mahasiswa", label: "Nama Mahasiswa" },
    { key: "judul_project", label: "Judul Project" },
    { key: "dosen_pembimbing", label: "Dosen Pembimbing" },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Daftar Project Mahasiswa</h2>
      <Table columns={columns} data={initialData} />
    </div>
  );
}