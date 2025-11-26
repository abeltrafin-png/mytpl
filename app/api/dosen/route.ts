import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export type Dosen = {
  id: number;
  nidn: string;
  nama: string;
  email: string;
  jurusan: string;
  jabatan: string;
  foto_url: string;
  source?: string;
};

const transformDosen = (dosen: any[], source: string): Dosen[] => {
  const baseUrl = "http://localhost:8000/storage/";
  return dosen.map(d => {
    let finalUrl = '/api/placeholder/300/300';
    if (d.foto_url && typeof d.foto_url === 'string') {
      let path = d.foto_url.trim();
      if (path.startsWith('http')) {
        finalUrl = path;
      } else {
        if (path.startsWith('/')) {
          path = path.substring(1);
        }
        finalUrl = `${baseUrl}${path}`;
      }
    }
    return { ...d, foto_url: finalUrl, source: source };
  });
};

// GET -> ambil data semua dosen dari API Laravel atau fallback ke mock data
export async function GET() {
  try {
    const res = await fetch("http://localhost:8000/api/dosen", { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch dosen from Laravel API");
    const result = await res.json();
    const dosen = Array.isArray(result) ? result : (result.data || []);
    return NextResponse.json(transformDosen(dosen, 'laravel-api'));
  } catch (error: any) {
    // Fallback data dari tbl_dosen
    try {
      const [rows] = await db.execute('SELECT id, nidn, nama, email, jurusan, jabatan, foto as foto_url FROM tbl_dosen');
      return NextResponse.json(transformDosen(rows as any[], 'local-db-fallback'));
    } catch (dbError: any) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }
  }
}

// POST -> tambah data dosen baru via API Laravel
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nidn, nama, email, jurusan, jabatan, foto_url } = body;

    if (!nidn || !nama || !email || !jurusan || !jabatan || !foto_url) {
      return NextResponse.json(
        { error: "Semua field wajib diisi!" },
        { status: 400 }
      );
    }

    const res = await fetch("http://localhost:8000/api/dosen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nidn, nama, email, jurusan, jabatan, foto_url }),
    });

    if (!res.ok) throw new Error("Failed to add dosen via Laravel API");

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}