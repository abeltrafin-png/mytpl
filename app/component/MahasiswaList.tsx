"use client";

import Table from "./ui/table";

type Mahasiswa = {
  id: number;
  nim: string;
  nama: string;
  email: string;
  jurusan: string;
  angkatan: number;
};

type Props = {
  initialData: Mahasiswa[];
};

export default function MahasiswaList({ initialData }: Props) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "nim", label: "NIM" },
    { key: "nama", label: "Nama" },
    { key: "email", label: "Email" },
    { key: "jurusan", label: "Jurusan" },
    { key: "angkatan", label: "Angkatan" },
  ];

  return (
    <div>
      <Table columns={columns} data={initialData} />
    </div>
  );
}