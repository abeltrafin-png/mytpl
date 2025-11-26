import React from "react";

export default function PMB() {
  return (
    <main className="px-8 py-12 max-w-5xl mx-auto font-sans text-gray-900">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-gradient bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 drop-shadow-lg">
        Penerimaan Mahasiswa Baru - Teknik Perangkat Lunak
      </h1>

      <section className="mb-12 rounded-lg backdrop-blur-md bg-white bg-opacity-50 shadow-lg p-8">
        <h2 className="text-4xl font-semibold mb-6 border-b-4 border-indigo-500 pb-3">
          Tentang Pendaftaran
        </h2>
        <p className="text-lg leading-relaxed tracking-wide">
          Jurusan Teknik Perangkat Lunak (TPL) membuka pendaftaran untuk mahasiswa baru setiap tahun. Proses pendaftaran dilakukan secara online melalui portal resmi kampus. Calon mahasiswa dapat memilih program dagang sarjana di jurusan kami sesuai minat dan kemampuan.
        </p>
      </section>

      <section className="mb-12 rounded-lg backdrop-blur-md bg-white bg-opacity-50 shadow-lg p-8">
        <h2 className="text-4xl font-semibold mb-6 border-b-4 border-indigo-500 pb-3">
          Persyaratan Masuk TPL
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg font-medium tracking-wide">
          <li>Telah menamatkan pendidikan SMA/MA/Sederajat atau setara.</li>
          <li>Memiliki nilai rapor yang memenuhi standar kelulusan.</li>
          <li>Lulus seleksi administrasi dan seleksi akademik yang diadakan oleh jurusan.</li>
          <li>Mengikuti ujian masuk atau jalur seleksi PMB yang berlaku.</li>
          <li>Menyerahkan dokumen persyaratan lengkap sesuai ketentuan.</li>
        </ul>
      </section>

      <section className="mb-12 rounded-lg backdrop-blur-md bg-white bg-opacity-50 shadow-lg p-8">
        <h2 className="text-4xl font-semibold mb-6 border-b-4 border-indigo-500 pb-3">
          Hal-Hal Penting Mengenai TPL
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg font-medium tracking-wide">
          <li>Jurusan kami memiliki dosen berkompeten di bidang pengembangan perangkat lunak modern.</li>
          <li>Kami menyediakan fasilitas laboratorium komputer dengan perangkat lunak terkini.</li>
          <li>Selain teori, program studi menekankan praktik melalui proyek dan magang industri.</li>
          <li>Anda berkesempatan bergabung dengan komunitas riset dan pengabdian masyarakat yang aktif.</li>
          <li>Lulusan jurusan TPL siap bekerja sebagai software engineer, developer, analis sistem, dan profesional TI lainnya.</li>
        </ul>
      </section>
    </main>
  );
}
