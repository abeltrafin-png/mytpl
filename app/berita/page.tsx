import { Calendar, User, Newspaper } from 'lucide-react';
import { Suspense } from 'react';

type Informasi = {
  id: number;
  judul: string;
  isi: string;
  foto?: string;
  penulis: string;
  tanggal: string;
  type: 'berita' | 'pengumuman' | 'agenda';
};

async function fetchBerita(): Promise<Informasi[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/berita`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Failed to fetch berita:', await res.text());
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error in fetchBerita:', error);
    return [];
  }
}

function BeritaCard({ item }: { item: Informasi }) {
  return (
    <article className="flex flex-col overflow-hidden transition-transform duration-300 transform bg-white border border-gray-200 rounded-lg shadow-sm hover:-translate-y-2 hover:shadow-lg">
      {item.foto && (
        <div className="h-48 overflow-hidden">
          <img src={item.foto} alt={item.judul} className="object-cover w-full h-full" />
        </div>
      )}
      <div className="flex flex-col flex-grow p-6">
        <h2 className="mb-3 text-xl font-semibold text-gray-800 hover:text-blue-600">
          {item.judul}
        </h2>
        <p className="flex-grow mb-4 text-gray-600">
          {item.isi.substring(0, 120)}...
        </p>
        <div className="flex items-center justify-between mt-auto text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span>{item.penulis}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{new Date(item.tanggal).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function BeritaList({ berita }: { berita: Informasi[] }) {
  if (!berita || berita.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 text-gray-400 bg-gray-100 rounded-full">
            <Newspaper size={48} />
        </div>
        <h3 className="mb-2 text-2xl font-semibold text-gray-700">Belum Ada Berita</h3>
        <p className="text-gray-500">Saat ini belum ada berita yang dipublikasikan.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {berita.map((item, index) => (
        <BeritaCard key={`${item.id}-${index}`} item={item} />
      ))}
    </div>
  );
}

export default async function BeritaPage() {
  const berita = await fetchBerita();

  return (
    <div className="min-h-screen page-bg">
      <header className="text-white shadow-md bg-gradient-to-r from-teal-600 to-cyan-700">
        <div className="container px-4 py-12 mx-auto text-center">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Berita Terkini</h1>
          <p className="text-lg text-teal-100">
            Kumpulan berita dan informasi terbaru dari program studi.
          </p>
        </div>
      </header>

      <main className="container px-4 py-12 mx-auto">
        <Suspense fallback={<div className="text-center">Memuat berita...</div>}>
            <BeritaList berita={berita} />
        </Suspense>
      </main>
    </div>
  );
}