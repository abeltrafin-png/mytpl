import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export type RisetDosen = {
  id_penelitian: number;
  nidn: string;
  nama_dosen: string;
  judul_penelitian: string;
  bidang_penelitian: string;
  tahun: number;
  sumber_dana: string;
  jumlah_dana: number;
  mitra: string;
  deskripsi: string;
  file_laporan: string;
  tanggal_input: string;
};

// GET -> ambil data semua riset dosen dari database
export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM tbl_penelitian ORDER BY tanggal_input DESC"
    );
    return NextResponse.json(rows as RisetDosen[]);
  } catch (error: any) {
    console.error("Error fetching riset dosen:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST -> tambah data riset dosen baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nidn,
      nama_dosen,
      judul_penelitian,
      bidang_penelitian,
      tahun,
      sumber_dana,
      jumlah_dana,
      mitra,
      deskripsi,
      file_laporan,
    } = body;

    if (!nidn || !nama_dosen || !judul_penelitian) {
      return NextResponse.json(
        { error: "NIDN, nama dosen, dan judul penelitian wajib diisi!" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      `INSERT INTO tbl_penelitian
      (nidn, nama_dosen, judul_penelitian, bidang_penelitian, tahun, sumber_dana, jumlah_dana, mitra, deskripsi, file_laporan)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nidn,
        nama_dosen,
        judul_penelitian,
        bidang_penelitian || null,
        tahun || null,
        sumber_dana || null,
        jumlah_dana || null,
        mitra || null,
        deskripsi || null,
        file_laporan || null,
      ]
    );

    return NextResponse.json({
      message: "Data riset dosen berhasil ditambahkan",
      id: (result as any).insertId,
    });
  } catch (error: any) {
    console.error("Error adding riset dosen:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
