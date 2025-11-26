"use client";

export default function Footer() {
  return (
    <footer className="campus-bg text-white py-8 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Program Studi Teknik Perangkat Lunak</h3>
            <p className="text-white/90">
              Menghasilkan lulusan berkualitas tinggi di bidang Teknik Perangkat Lunak.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/90 hover:text-white transition-colors">Beranda</a></li>
              <li><a href="/profil" className="text-white/90 hover:text-white transition-colors">Profil</a></li>
              <li><a href="/dosen" className="text-white/90 hover:text-white transition-colors">Dosen</a></li>
              <li><a href="/mahasiswa" className="text-white/90 hover:text-white transition-colors">Mahasiswa</a></li>
              <li><a href="/matakuliah" className="text-white/90 hover:text-white transition-colors">Mata Kuliah</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <p className="text-white/90 mb-2">Universitas Universal</p>
            <p className="text-white/90 mb-2">Sungai Panas, Batam Kota, Batam City, Riau Islands</p>
            <p className="text-white/90">Phone: (0778) 473399</p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/90">
            © 2024 Program Studi Teknik Perangkat Lunak. Desain by <span className="font-semibold">Abel Trafin</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
