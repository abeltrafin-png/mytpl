"use client";

import { useState } from "react";
import Table from "./ui/table";

type Matakuliah = {
  id: number;
  kode: string;
  nama: string;
  semester: number;
  sks: number;
  deskripsi: string;
  nama_dosen: string;
};

type Props = {
  initialData: Matakuliah[];
};

export default function MatakuliahList({ initialData }: Props) {
  const [semester, setSemester] = useState<number | "">("");
  const [filteredData, setFilteredData] = useState<Matakuliah[]>(initialData);

  const handleSemesterChange = (value: number | "") => {
    setSemester(value);
    if (value === "") {
      setFilteredData(initialData);
    } else {
      const filtered = initialData.filter((mk) => mk.semester === value);
      setFilteredData(filtered);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "kode", label: "Kode Matkul" },
    { key: "nama", label: "Nama Matkul" },
    { key: "semester", label: "Semester" },
    { key: "sks", label: "SKS" },
    { key: "deskripsi", label: "Deskripsi" },
    {
      key: "foto_dosen",
      label: "Foto Dosen",
      render: (foto: string) => (
        <img
          src={foto ? `/foto-dosen/${foto}` : "/dosen.jpeg"}
          alt="Foto Dosen"
          className="h-12 w-12 rounded-full object-cover"
        />
      ),
    },
    { key: "nama_dosen", label: "Nama Dosen" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="semester" className="font-semibold">
          Pilih Semester:
        </label>
        <select
          id="semester"
          value={semester}
          onChange={(e) => handleSemesterChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Semua Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>
      <Table columns={columns} data={filteredData} />
    </div>
  );
}