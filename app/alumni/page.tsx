"use client";

import { useEffect, useState } from "react";

// Import tipe yang benar
import type { TracerAlumni as AlumniType } from "../api/alumni/route";
import type { TracerAlumni as TracerType } from "../api/tracer-alumni/route";

// Import komponen
import Table from "../component/ui/table";
import { Card } from "../component/ui/card";

export default function AlumniPage() {
  const [alumni, setAlumni] = useState<AlumniType[]>([]);
  const [tracerAlumni, setTracerAlumni] = useState<TracerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alumniRes, tracerRes] = await Promise.all([
          fetch("/api/alumni"),
          fetch("/api/tracer-alumni"),
        ]);

        if (!alumniRes.ok) throw new Error("Failed to fetch alumni");
        if (!tracerRes.ok) throw new Error("Failed to fetch tracer alumni");

        const alumniData = await alumniRes.json();
        const tracerData = await tracerRes.json();

        setAlumni(alumniData);
        setTracerAlumni(tracerData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  // cek pekerjaan IT/software
  const isITJob = (job?: string) => {
    if (!job) return false;
    const keywords = [
      "software","developer","engineer","programmer","it","teknologi informasi",
      "perangkat lunak","web","mobile","data","analyst","system","network",
      "cyber","security","ai","machine learning","frontend","backend","fullstack"
    ];
    return keywords.some(k => job.toLowerCase().includes(k));
  };

  const totalAlumni = alumni.length;
  const itAlumni = alumni.filter(a => isITJob(a.bidang_pekerjaan) || isITJob(a.posisi)).length;
  const itPercentage = totalAlumni ? ((itAlumni / totalAlumni) * 100).toFixed(2) : "0.00";

  // table alumni
  const alumniColumns = [
    { key: "nim", label: "NIM" },
    { key: "nama", label: "Nama" },
    { key: "email", label: "Email" },
    { key: "jurusan", label: "Jurusan" },
    { key: "angkatan", label: "Angkatan" },
    { key: "tahun_lulus", label: "Tahun Lulus" },
    { key: "pekerjaan", label: "Pekerjaan" },
    { key: "perusahaan", label: "Perusahaan" },
  ];

  const alumniData = alumni.map(a => ({
    nim: a.nim,
    nama: a.nama_lengkap,
    email: a.email || "-",
    jurusan: a.program_studi,
    angkatan: a.angkatan || "-",
    tahun_lulus: a.tahun_lulus,
    pekerjaan: a.bidang_pekerjaan || "-",
    perusahaan: a.nama_perusahaan || "-",
  }));

  // table tracer alumni
  const tracerColumns = [
    { key: "nim", label: "NIM" },
    { key: "status_pekerjaan", label: "Status" },
    { key: "nama_perusahaan", label: "Perusahaan" },
    { key: "posisi", label: "Posisi" },
    { key: "gaji", label: "Gaji" },
    { key: "lokasi", label: "Lokasi" },
    { key: "tanggal_mulai", label: "Mulai" },
    { key: "komentar", label: "Komentar" },
  ];

  const tracerData = tracerAlumni.map(t => ({
    nim: t.nim,
    status_pekerjaan: t.status_pekerjaan || "-",
    nama_perusahaan: t.nama_perusahaan || "-",
    posisi: t.posisi || "-",
    gaji: t.gaji ? `Rp ${t.gaji.toLocaleString()}` : "-",
    lokasi: t.lokasi || "-",
    tanggal_mulai: t.tanggal_mulai || "-",
    komentar: t.komentar || "-",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Data Alumni
        </h1>

        <div className="space-y-8">
          <Card title="Statistik Alumni IT/Software">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{totalAlumni}</div>
                <div className="text-sm text-gray-600">Total Alumni</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{itAlumni}</div>
                <div className="text-sm text-gray-600">Alumni IT/Software</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{itPercentage}%</div>
                <div className="text-sm text-gray-600">Persentase IT/Software</div>
              </div>
            </div>
          </Card>

          <Card title="Daftar Alumni">
            <Table columns={alumniColumns} data={alumniData} />
          </Card>

          <Card title="Tracer Alumni">
            <Table columns={tracerColumns} data={tracerData} />
          </Card>
        </div>
      </div>
    </div>
  );
}