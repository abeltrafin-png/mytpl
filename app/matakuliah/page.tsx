import { db } from "../../lib/db";
import MatakuliahList from "../component/MatakuliahList";

async function getMatakuliahData() {
  try {
    const query = `
      SELECT
        m.id,
        m.kode_matkul AS kode,
        m.nama_matkul AS nama,
        m.semester,
        m.sks,
        m.deskripsi,
        m.dosen_id,
        d.id AS dosen_id_from_d,
        d.nama AS nama_dosen,
        d.nidn,
        d.foto AS foto_dosen
      FROM tbl_matakuliah m
      LEFT JOIN tbl_dosen d ON m.dosen_id = d.id
      ORDER BY m.semester, m.nama_matkul;
    `;
    const [rows] = await db.query(query);
    const transformedData = (rows as any[]).map(row => ({
      id: row.id,
      kode: row.kode,
      nama: row.nama,
      sks: row.sks,
      semester: row.semester,
      dosen_id: row.dosen_id,
      dosen: row.nama_dosen ? {
        id: row.dosen_id_from_d,
        nama: row.nama_dosen,
        nidn: row.nidn || '',
        foto_url: row.foto_dosen || '/avatar.png'
      } : {
        id: 0,
        nama: 'Dosen Tidak Ditemukan',
        nidn: '',
        foto_url: '/avatar.png'
      }
    }));
    return transformedData;
  } catch (error) {
    console.error("Error fetching matakuliah data:", error);
    return [];
  }
}

export default async function MatakuliahPage() {
  const matakuliahData = await getMatakuliahData();

  return (
    <div className="min-h-screen page-bg p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 campus-text">Daftar Mata Kuliah</h1>
      <MatakuliahList initialData={matakuliahData} />
    </div>
  );
}