import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

// ====== TYPE EXPORT supaya bisa di-import dari frontend ======
export type TracerAlumni = {
  id_tracer: number;
  nim: string;
  nama_lengkap: string;
  program_studi: string;
  angkatan?: number;
  tahun_lulus: number;
  email?: string;
  no_hp?: string;
  status_pekerjaan?: string;
  nama_perusahaan?: string;
  jabatan?: string;
  bidang_pekerjaan?: string;
  alamat_perusahaan?: string;
  tanggal_mulai?: string;
  gaji_awal?: number;
  posisi?: string;
  gaji?: number;
  lokasi?: string;
  periode_berkerja?: string;
  komentar?: string;
  lama_mendapat_pekerjaan?: string;
  relevansi_pekerjaan?: string;
  kepuasan_pekerjaan?: string;
  saran_untuk_kampus?: string;
  created_at?: string;
  updated_at?: string;
};

// Kalau frontend butuh nama khusus, tambahkan alias export:
export type TracerAlumniWithDate = TracerAlumni;
// ⚡ atau kalau frontendmu pakai nama AlumniWithTracker:
// export type AlumniWithTracker = TracerAlumni;


// ====== ROUTE GET ======
export async function GET() {
  try {
    const query = `
      SELECT * FROM tbl_tracer_alumni
    `;
    const [rows] = await db.execute(query);

    const data = (rows as any[]).map((row) => ({
      ...row,
      tanggal_mulai: row.tanggal_mulai?.toISOString?.() || null,
      created_at: row.created_at?.toISOString?.() || null,
      updated_at: row.updated_at?.toISOString?.() || null,
    }));

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Database query error:", err.message || err);
    return NextResponse.json(
      { error: "Database query error: " + err.message },
      { status: 500 }
    );
  }
}