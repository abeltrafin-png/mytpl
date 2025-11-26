import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

// Definisikan tipe secara lokal untuk menghindari masalah impor
type Informasi = {
  id: number;
  judul: string;
  isi: string;
  foto?: string;
  penulis: string;
  tanggal: string;
  type: 'berita' | 'pengumuman' | 'agenda';
};

export async function GET() {
  try {
    const [results] = await db.query(
      `SELECT * FROM tbl_informasi WHERE type = 'berita' ORDER BY tanggal DESC`
    );

    // Secara eksplisit petakan hasil ke tipe Informasi
    const berita = (results as any[]).map((row): Informasi => ({
      id: row.id,
      judul: row.judul,
      isi: row.isi,
      foto: row.foto,
      penulis: row.penulis,
      tanggal: new Date(row.tanggal).toISOString(),
      type: row.type,
    }));

    return NextResponse.json(berita);
  } catch (error: any) {
    console.error("❌ Error fetching berita data from DB:", error);
    return NextResponse.json(
      { error: `Failed to fetch berita data: ${error.message}` },
      { status: 500 }
    );
  }
}