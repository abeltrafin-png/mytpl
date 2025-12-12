"use client";

import { Calendar, User, Newspaper, Megaphone } from "lucide-react";

type Informasi = {
  id: number;
  judul: string;
  isi: string;
  foto?: string;
  penulis: string;
  tanggal: string;
  type: "berita" | "pengumuman" | "agenda";
};

interface InformasiListProps {
  initialData: Informasi[];
  type: "berita" | "pengumuman" | "agenda";
}

function Card({ item }: { item: Informasi }) {
  return (
    <article className="flex flex-col overflow-hidden transition-transform duration-300 transform bg-white border border-gray-200 rounded-lg shadow-sm hover:-translate-y-2 hover:shadow-lg">
      {item.foto && (
        <div className="h-48 overflow-hidden">
          <img
            src={item.foto}
            alt={item.judul}
            className="object-cover w-full h-full"
          />
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
              <span>
                {new Date(item.tanggal).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function InformasiList({
  initialData,
  type,
}: InformasiListProps) {
  if (!initialData || initialData.length === 0) {
    const messages = {
      berita: {
        icon: <Newspaper size={48} />,
        title: "Belum Ada Berita",
        text: "Saat ini belum ada berita yang dipublikasikan.",
      },
      pengumuman: {
        icon: <Megaphone size={48} />,
        title: "Belum Ada Pengumuman",
        text: "Tidak ada pengumuman penting untuk saat ini.",
      },
      agenda: {
        icon: <Calendar size={48} />,
        title: "Belum Ada Agenda",
        text: "Tidak ada agenda kegiatan yang dijadwalkan.",
      },
    };
    const { icon, title, text } = messages[type];

    return (
      <div className="py-16 text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 text-gray-400 bg-gray-100 rounded-full">
          {icon}
        </div>
        <h3 className="mb-2 text-2xl font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-500">{text}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {initialData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}