"use client";

import { useEffect, useState } from "react";
import Table from "@/app/component/ui/table";

type ProjectMahasiswa = {
  id: number;
  nama_mahasiswa: string;
  judul_project: string;
  dosen_pembimbing: string;
};

export default function ProjectMahasiswaList() {
  const [data, setData] = useState<ProjectMahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/project-mahasiswa");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching project mahasiswa data:", err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading project mahasiswa...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  const columns = [
    { key: "nama mahasiswa", label: "Nama Mahasiswa" },
    { key: "judul project", label: "Judul Project" },
    { key: "dosen pembimbing", label: "Dosen Pembimbing" },
  ];
  const tableData = data.map((p) => ({
    "nama mahasiswa": p.nama_mahasiswa,
    "judul project": p.judul_project,
    "dosen pembimbing": p.dosen_pembimbing,
  }));

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Daftar Project Mahasiswa</h2>
      <Table columns={columns} data={tableData} />
    </div>
  );
}
