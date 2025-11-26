import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export type TracerAlumni = {
  id: number;
  alumni_id: number;
  nim: string;
  status_pekerjaan: string;
  nama_perusahaan?: string;
  posisi?: string;
  gaji?: number;
  lokasi?: string;
  tanggal_mulai?: string;
  tanggal_selesai?: string;
  komentar?: string;
};

// GET -> ambil data semua tracer alumni dari database
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM tbl_tracer_alumni');
    return NextResponse.json(rows as TracerAlumni[]);
  } catch (dbError: any) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}