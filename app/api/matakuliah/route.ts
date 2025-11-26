import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export type Matakuliah = {
  id: number;
  kode: string;
  nama: string;
  semester: number;
  sks: number;
  deskripsi: string;
  nama_dosen: string;
};

// GET -> ambil data matakuliah dari database MySQL langsung dengan filter semester opsional
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const semesterParam = searchParams.get("semester");

    let query = "SELECT id, kode, nama, semester, sks, deskripsi, nama_dosen FROM tbl_matakuliah";
    let params: any[] = [];

    if (semesterParam) {
      query += " WHERE semester = ?";
      params.push(Number(semesterParam));
    }

    const [rows] = await db.query(query, params);

    const data: Matakuliah[] = (rows as any[]).map(row => ({
      id: row.id,
      kode: row.kode,
      nama: row.nama,
      semester: row.semester,
      sks: row.sks,
      deskripsi: row.deskripsi,
      nama_dosen: row.nama_dosen,
    }));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch matakuliah data from database", error }, { status: 500 });
  }
}
