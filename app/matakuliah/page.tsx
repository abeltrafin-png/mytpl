import MatakuliahList from "../component/MatakuliahList";

export default function MatakuliahPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 campus-text">Daftar Mata Kuliah</h1>
      <MatakuliahList />
    </div>
  );
}
