import MahasiswaList from "@/app/component/MahasiswaList";
import MatakuliahList from "@/app/component/MatakuliahList";
import ProjectTable from "@/app/component/ProjectTable";

async function getMahasiswa() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mahasiswa`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch mahasiswa");
  }
  return res.json();
}

async function getMatakuliah() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matakuliah`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch matakuliah");
  }
  return res.json();
}

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
}

export default async function DashboardPage() {
  const mahasiswaData = await getMahasiswa();
  const matakuliahData = await getMatakuliah();
  const projectData = await getProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl text-white font-bold">D</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Dashboard Akademik</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tampilan lengkap data mahasiswa, mata kuliah, dan proyek mahasiswa Program Studi Teknik Perangkat Lunak
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Daftar Mahasiswa</h2>
            <div className="campus-card rounded-xl p-8">
              <MahasiswaList initialData={mahasiswaData} />
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Daftar Mata Kuliah</h2>
            <div className="campus-card rounded-xl p-8">
              <MatakuliahList initialData={matakuliahData} />
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Proyek Mahasiswa</h2>
            <div className="campus-card rounded-xl p-8">
              <ProjectTable initialData={projectData} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}