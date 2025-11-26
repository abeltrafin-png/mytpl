import { NextResponse } from "next/server";
import { db } from "../../../lib/db";


export type Mahasiswa = {
  id: number;
  nim: string;
  nama: string;
  email: string;
  jurusan: string;
  angkatan: number;
};

// GET -> ambil data semua mahasiswa dari database MySQL langsung
export async function GET() {
  try {
    const [rows] = await db.query("SELECT id, nim, nama, email, jurusan, angkatan FROM tbl_mahasiswa");
    // Rows is of type any[], we map it to Mahasiswa[]
    const data: Mahasiswa[] = (rows as any[]).map(row => ({
      id: row.id,
      nim: row.nim,
      nama: row.nama,
      email: row.email,
      jurusan: row.jurusan,
      angkatan: row.angkatan,
    }));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch mahasiswa data from database", error }, { status: 500 });
  }
}