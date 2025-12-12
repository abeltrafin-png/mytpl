import { Suspense } from "react";
import Link from "next/link";
import { Newspaper, Megaphone, Calendar } from "lucide-react";
import InformasiList from "../component/InformasiList";

type Informasi = {
  id: number;
  judul: string;
  isi: string;
  foto?: string;
  penulis: string;
  tanggal: string;
  type: "berita" | "pengumuman" | "agenda";
};

async function fetchInformasi(
  type: "berita" | "pengumuman" | "agenda"
): Promise<Informasi[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${type}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.error(`Failed to fetch ${type}:`, await res.text());
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error in fetch${type}:`, error);
    return [];
  }
}

function TabLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
        isActive
          ? "bg-blue-600 text-white shadow-lg"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </Link>
  );
}

export default async function InformasiPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeTab =
    (searchParams.tab as "berita" | "pengumuman" | "agenda") || "berita";

  const [berita, pengumuman, agenda] = await Promise.all([
    fetchInformasi("berita"),
    fetchInformasi("pengumuman"),
    fetchInformasi("agenda"),
  ]);

  const dataMap = {
    berita,
    pengumuman,
    agenda,
  };

  return (
    <div className="min-h-screen page-bg">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pusat Informasi
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Berita terkini, pengumuman penting, dan agenda kegiatan dari Program
            Studi Teknik Perangkat Lunak.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-center mb-12 bg-white p-2 rounded-full shadow-md">
          <TabLink href="/informasi?tab=berita" isActive={activeTab === "berita"}>
            <Newspaper size={18} className="mr-2" />
            Berita
          </TabLink>
          <TabLink
            href="/informasi?tab=pengumuman"
            isActive={activeTab === "pengumuman"}
          >
            <Megaphone size={18} className="mr-2" />
            Pengumuman
          </TabLink>
          <TabLink href="/informasi?tab=agenda" isActive={activeTab === "agenda"}>
            <Calendar size={18} className="mr-2" />
            Agenda
          </TabLink>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <InformasiList
            type={activeTab}
            initialData={dataMap[activeTab]}
          />
        </Suspense>
      </main>
    </div>
  );
}