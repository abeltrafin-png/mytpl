import PengabdianMasyarakatList from "../component/PengabdianMasyarakatList";

export default function PengabdianMasyarakatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl text-white font-bold">PKM</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Pengabdian kepada Masyarakat</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Data pengabdian kepada masyarakat yang dilakukan oleh dosen Program Studi Teknik Perangkat Lunak
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="campus-card rounded-xl p-8">
          <PengabdianMasyarakatList />
        </div>
      </div>
    </div>
  );
}
