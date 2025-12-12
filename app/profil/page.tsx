"use client";

import { useEffect, useState } from "react";
import DosenProfileCard from "../component/DosenProfileCard";

type Dosen = {
  id: number;
  nidn: string;
  nama: string;
  email: string;
  jurusan: string;
  jabatan: string;
  foto_url: string;
};

export default function ProfilPage() {
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const res = await fetch("/api/dosen");
        if (!res.ok) throw new Error("Failed to fetch dosen");
        const data: Dosen[] = await res.json();
        setDosenList(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDosen();
  }, []);



  return (
    <div className="min-h-screen page-bg p-4 md:p-10">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold campus-text mb-4">Profil Program Studi</h1>
          <h2 className="text-2xl md:text-3xl font-semibold campus-accent mb-6 md:mb-8">Teknik Perangkat Lunak</h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Program Studi Teknik Perangkat Lunak berkomitmen untuk menghasilkan lulusan yang berkualitas dan siap menghadapi tantangan industri teknologi informasi dengan mengedepankan inovasi, penelitian, dan pengabdian masyarakat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="campus-card rounded-xl p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="w-16 md:w-20 h-16 md:h-20 campus-bg rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl md:text-3xl text-white font-bold">V</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold campus-text mb-4">Visi</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              Menjadi program studi unggulan dalam bidang Teknik Perangkat Lunak yang menghasilkan lulusan berkualitas dan berdaya saing global.
            </p>
          </div>

          <div className="campus-card rounded-xl p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="w-16 md:w-20 h-16 md:h-20 campus-bg rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl md:text-3xl text-white font-bold">M</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold campus-text mb-4">Misi</h3>
            </div>
            <ul className="text-gray-700 space-y-2 md:space-y-3 text-sm md:text-base">
              <li className="flex items-start">
                <span className="campus-accent mr-2">•</span>
                Menyelenggarakan pendidikan berkualitas di bidang Teknik Perangkat Lunak.
              </li>
              <li className="flex items-start">
                <span className="campus-accent mr-2">•</span>
                Melaksanakan penelitian inovatif yang berkontribusi pada pengembangan ilmu dan teknologi perangkat lunak.
              </li>
              <li className="flex items-start">
                <span className="campus-accent mr-2">•</span>
                Memberikan pengabdian kepada masyarakat melalui penerapan ilmu Teknik Perangkat Lunak.
              </li>
              <li className="flex items-start">
                <span className="campus-accent mr-2">•</span>
                Mengembangkan kerjasama dengan berbagai pihak untuk meningkatkan kualitas dan relevansi pendidikan.
              </li>
            </ul>
          </div>

          <div className="campus-card rounded-xl p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="w-16 md:w-20 h-16 md:h-20 campus-bg rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl md:text-3xl text-white font-bold">D</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold campus-text mb-4">Deskripsi</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              Program Studi Teknik Perangkat Lunak merupakan salah satu program studi yang fokus pada pengembangan, perancangan, dan pemeliharaan perangkat lunak berkualitas tinggi. Kami berkomitmen untuk menghasilkan lulusan yang siap menghadapi tantangan industri teknologi informasi.
            </p>
          </div>
        </div>

        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold campus-text mb-6 text-center">Dosen</h2>
          {loading ? (
            <div className="text-center py-8">Loading dosen...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error: {error}</div>
          ) : Array.isArray(dosenList) && dosenList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dosenList.map((dosen) => (
                <DosenProfileCard key={dosen.id} dosen={dosen} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-red-500">No dosen data available or invalid data format.</div>
          )}
        </div>

        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold campus-text mb-6 text-center">Kontak Kampus</h2>
          <div className="campus-card rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 md:w-20 h-16 md:h-20 campus-bg rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl md:text-3xl text-white font-bold">K</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold campus-text mb-4">Universitas Universal</h3>
              <p className="text-gray-700 mb-2 text-sm md:text-base">
                Sungai Panas, Batam Kota, Batam City, Riau Islands
              </p>
              <p className="text-gray-700 text-sm md:text-base">
                Phone: (0778) 473399
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
