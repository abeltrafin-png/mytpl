import ProjectMahasiswaList from "@/app/component/ProjectMahasiswaList";
import { db } from "@/lib/db";

async function getProjectMahasiswa() {
  try {
    const res = await fetch("http://localhost:3000/api/project-mahasiswa", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch project mahasiswa");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProjectMahasiswaPage() {
  const projectMahasiswa = await getProjectMahasiswa();

  return (
    <div className="min-h-screen page-bg">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl text-white font-bold">P</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Daftar Project Mahasiswa
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Daftar proyek mahasiswa Program Studi Teknik Perangkat Lunak
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="campus-card rounded-xl p-8">
          <ProjectMahasiswaList initialData={projectMahasiswa} />
        </div>
      </div>
    </div>
  );
}