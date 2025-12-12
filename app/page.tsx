"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Newspaper,
  Megaphone,
  Calendar,
  Users,
  GraduationCap,
  Building,
  Info,
  School,
  FlaskConical,
  Gavel,
  UserPlus,
} from "lucide-react";

// Definisikan tipe data yang diharapkan dari API
type Informasi = {
  id: number;
  judul: string;
  isi: string;
  tanggal: string;
  type: 'berita' | 'pengumuman' | 'agenda';
};

export default function HomePage() {
  const [berita, setBerita] = useState<Informasi[]>([]);
  const [pengumuman, setPengumuman] = useState<Informasi[]>([]);
  const [agenda, setAgenda] = useState<Informasi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [beritaRes, pengumumanRes, agendaRes] = await Promise.all([
          fetch('/api/berita'),
          fetch('/api/pengumuman'),
          fetch('/api/agenda')
        ]);

        if (beritaRes.ok) {
          const beritaData = await beritaRes.json();
          setBerita(beritaData.slice(0, 3));
        }
        if (pengumumanRes.ok) {
          const pengumumanData = await pengumumanRes.json();
          setPengumuman(pengumumanData.slice(0, 3));
        }
        if (agendaRes.ok) {
            const agendaData = await agendaRes.json();
            if (agendaData.length > 0 && agendaData[0].id === 999) {
                 setAgenda([]);
            } else {
                setAgenda(agendaData.slice(0, 3));
            }
        }
      } catch (error) {
        console.error("Gagal mengambil data dinamis untuk dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const navigationLinks = [
    { href: "/profil", icon: Building, title: "Profil Prodi" },
    { href: "/akademik", icon: School, title: "Akademik" },
    { href: "/mahasiswa", icon: GraduationCap, title: "Mahasiswa" },
    { href: "/riset-pkm", icon: FlaskConical, title: "Riset & PKM" },
    { href: "/informasi", icon: Info, title: "Informasi" },
    { href: "/peraturan", icon: Gavel, title: "Peraturan" },
    { href: "/alumni", icon: Users, title: "Alumni" },
    { href: "/pmb", icon: UserPlus, title: "PMB" },
  ];

  const renderInfoCard = (item: Informasi) => (
    <div key={item.id} className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      <h4 className="font-bold text-gray-800 mb-2 text-lg leading-tight">{item.judul}</h4>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.isi}</p>
      <div className="flex items-center text-xs text-gray-500">
        <Calendar size={14} className="mr-1 text-blue-500" />
        <span className="font-medium">{new Date(item.tanggal).toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen page-bg">
      {/* Hero Section */}
      <div className="relative campus-bg text-white py-20 px-6 text-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
            Portal Informasi Teknik Perangkat Lunak
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            Sumber informasi terpusat untuk seluruh civitas akademika.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {navigationLinks.map((link) => (
            <Link href={link.href} key={link.href} className="group text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <link.icon className="w-8 h-8" />
              </div>
              <h3 className="text-md font-bold text-gray-800">{link.title}</h3>
            </Link>
          ))}
        </div>

        {/* Dynamic Content Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Berita Section */}
          <div>
            <div className="flex items-center mb-4">
              <Newspaper className="w-6 h-6 mr-3 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Berita Terbaru</h2>
            </div>
            <div className="space-y-4">
              {loading ? <p>Memuat...</p> : berita.length > 0 ? berita.map(renderInfoCard) : <p>Tidak ada berita untuk ditampilkan.</p>}
            </div>
          </div>

          {/* Pengumuman Section */}
          <div>
            <div className="flex items-center mb-4">
              <Megaphone className="w-6 h-6 mr-3 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">Pengumuman</h2>
            </div>
            <div className="space-y-4">
              {loading ? <p>Memuat...</p> : pengumuman.length > 0 ? pengumuman.map(renderInfoCard) : <p>Tidak ada pengumuman untuk ditampilkan.</p>}
            </div>
          </div>

          {/* Agenda Section */}
          <div>
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 mr-3 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Agenda</h2>
            </div>
            <div className="space-y-4">
              {loading ? <p>Memuat...</p> : agenda.length > 0 ? agenda.map(renderInfoCard) : <p>Tidak ada agenda untuk ditampilkan.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}