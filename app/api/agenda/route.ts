import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

type Informasi = {
  id: number;
  judul: string;
  isi: string;
  foto?: string | null;
  penulis: string;
  tanggal: string | null;
  type: "berita" | "pengumuman" | "agenda";
};

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT id, judul, isi, foto, penulis, tanggal, type
      FROM tbl_informasi
      WHERE type = 'agenda'
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
      type: row.type,
    }));

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Database error in /api/agenda:", error);
    return NextResponse.json(
      { error: "Database error: " + (error.message || error) },
      { status: 500 }
    );
  }
}
