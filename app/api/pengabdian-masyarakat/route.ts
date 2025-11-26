import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export type PengabdianMasyarakat = {
  id_pengabdian: number;
  nidn: string;
  nama_dosen: string;
  judul_pengabdian: string;
  bidang_pengabdian: string;
  lokasi: string;
  tahun: number;
  sumber_dana: string;
  jumlah_dana: number;
  mitra: string;
  deskripsi: string;
  file_laporan: string;
  tanggal_input: string;
};

// GET -> ambil data semua pengabdian masyarakat dari database
export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM tbl_pkm ORDER BY tanggal_input DESC"
    );
    return NextResponse.json(rows as PengabdianMasyarakat[]);
  } catch (error: any) {
    console.error("Error fetching pengabdian masyarakat:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST -> tambah data pengabdian masyarakat baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nidn,
      nama_dosen,
      judul_pengabdian,
      bidang_pengabdian,
      lokasi,
      tahun,
      sumber_dana,
      jumlah_dana,
      mitra,
      deskripsi,
      file_laporan,
    } = body;

    if (!nidn || !nama_dosen || !judul_pengabdian) {
      return NextResponse.json(
        { error: "NIDN, nama dosen, dan judul pengabdian wajib diisi!" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      `INSERT INTO tbl_pkm
       (nidn, nama_dosen, judul_pengabdian, bidang_pengabdian, lokasi, tahun, sumber_dana, jumlah_dana, mitra, deskripsi, file_laporan)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nidn,
        nama_dosen,
        judul_pengabdian,
        bidang_pengabdian || null,
        lokasi || null,
        tahun || null,
        sumber_dana || null,
        jumlah_dana || null,
        mitra || null,
        deskripsi || null,
        file_laporan || null,
      ]
    );

    return NextResponse.json({
      message: "Data pengabdian masyarakat berhasil ditambahkan",
      id: (result as any).insertId,
    });
  } catch (error: any) {
    console.error("Error adding pengabdian masyarakat:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
