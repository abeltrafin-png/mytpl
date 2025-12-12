import { db } from "../../lib/db";
import MatakuliahList from "../component/MatakuliahList";
import Link from "next/link";
import { BookOpen, Users, Briefcase, Gavel } from "lucide-react";

export const revalidate = 0; // Selalu ambil data baru

async function getMatakuliahData() {
  try {
    const query = `
      SELECT 
        m.id, 
        m.kode_matkul AS kode, 
        m.nama_matkul AS nama, 
        m.semester, 
        m.sks, 
        m.deskripsi, 
        d.nama AS nama_dosen,
        d.foto AS foto_dosen
      FROM tbl_matakuliah m
      LEFT JOIN tbl_dosen d ON m.dosen_id = d.id
      ORDER BY m.semester, m.nama_matkul;
    `;
    const [rows] = await db.query(query);
    return rows as any[];
  } catch (error) {
    console.error("Error fetching matakuliah data:", error);
    return [];
  }
}

const academicLinks = [
  { href: "/matakuliah", icon: BookOpen, title: "Mata Kuliah" },
  { href: "/dosen", icon: Users, title: "Dosen Pengajar" },
  { href: "/project-mahasiswa", icon: Briefcase, title: "Project Mahasiswa" },
  { href: "/peraturan", icon: Gavel, title: "Peraturan" },
];

export default async function AkademikPage() {
  const matakuliahData = await getMatakuliahData();

  return (
    <div className="min-h-screen page-bg">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
            Portal Akademik
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-indigo-100">
            Jelajahi kurikulum, dosen, dan sumber daya akademik lainnya.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {academicLinks.map((link) => (
            <Link href={link.href} key={link.href} className="group text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 text-indigo-600 rounded-full mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <link.icon className="w-8 h-8" />
              </div>
              <h3 className="text-md font-bold text-gray-800">{link.title}</h3>
            </Link>
          ))}
        </div>

        {/* Main Content: Matakuliah List */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Daftar Mata Kuliah</h2>
          <MatakuliahList initialData={matakuliahData} />
        </div>
      </div>
    </div>
  );
}