"use client";

type Dosen = {
  id: number;
  nidn: string;
  nama: string;
  email: string;
  jurusan: string;
  jabatan: string;
  foto_url: string;
};

interface DosenProfileCardProps {
  dosen: Dosen;
}

export default function DosenProfileCard({ dosen }: DosenProfileCardProps) {
  return (
    <div className="campus-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-center mb-4">
        <img
          src={dosen.foto_url}
          alt={dosen.nama}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200"
          onError={(e) => {
            e.currentTarget.src = '/api/placeholder/300/300'; // fallback image
          }}
        />
        <h3 className="text-xl font-bold campus-text mb-2">{dosen.nama}</h3>
        <p className="text-sm text-gray-600 mb-1">NIDN: {dosen.nidn}</p>
        <p className="text-sm text-gray-600 mb-1">Jabatan: {dosen.jabatan}</p>
        <p className="text-sm text-gray-600 mb-1">Jurusan: {dosen.jurusan}</p>
        <p className="text-sm text-gray-600">{dosen.email}</p>
      </div>
    </div>
  );
}