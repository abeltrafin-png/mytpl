import ProjectList from "@/app/component/ProjectList";

export default function StudentsPage() {
  return (
    <div className="min-h-screen page-bg">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl text-white font-bold">P</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Project Mahasiswa</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Karya inovatif dan proyek menarik dari mahasiswa Teknik Perangkat Lunak yang menunjukkan kreativitas dan kemampuan teknis
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="campus-card rounded-xl p-8">
          <ProjectList />
        </div>
      </div>
    </div>
  );
}
