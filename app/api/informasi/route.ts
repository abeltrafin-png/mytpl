import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export type Informasi = {
  id: number;
  judul: string;
  isi: string;
  foto?: string;
  penulis: string;
  tanggal: string;
  type: 'berita' | 'pengumuman' | 'agenda';
  created_at?: string;
  updated_at?: string;
};

// GET -> ambil data semua informasi dari database
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM tbl_informasi ORDER BY tanggal DESC');
    
    // Secara eksplisit petakan hasil ke tipe Informasi
    const data: Informasi[] = (rows as any[]).map(row => ({
      id: row.id,
      judul: row.judul,
      isi: row.isi,
      foto: row.foto,
      penulis: row.penulis,
      tanggal: row.tanggal,
      type: row.type,
    }));

    return NextResponse.json(data);
  } catch (dbError: any) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}