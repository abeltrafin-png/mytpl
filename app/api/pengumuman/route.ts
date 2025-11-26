import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

// Tipe sesuai database Laravel
type Informasi = {
  id: number;
  judul: string;
  isi: string;
  foto?: string | null;
  penulis: string;
  tanggal: string | null;
  kategori: "berita" | "pengumuman" | "agenda";
};

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT id, judul, isi, foto, penulis, tanggal, kategori
      FROM tbl_informasi
      WHERE kategori = 'pengumuman'
      ORDER BY tanggal DESC
    `);

    const data: Informasi[] = (rows as any[]).map((row) => ({
      id: row.id,
      judul: row.judul,
      isi: row.isi,
      foto: row.foto ?? null,
      penulis: row.penulis,
      tanggal:
        row.tanggal instanceof Date
          ? row.tanggal.toISOString().split("T")[0]
          : row.tanggal ?? null,
      kategori: row.kategori,
    }));

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Database error in /api/pengumuman:", error);
    return NextResponse.json(
      { error: "Database error: " + (error.message || error) },
      { status: 500 }
    );
  }
}
