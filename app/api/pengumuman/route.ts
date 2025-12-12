import { NextResponse } from "next/server";

// Tipe sesuai database Laravel
type Informasi = {
  id?: number;
  judul: string;
  isi: string;
  foto?: string | null;
  penulis: string;
  tanggal: string | null;
  type: "berita" | "pengumuman" | "agenda";
};

export async function GET() {
  try {
    const response = await fetch('http://localhost:8000/api/informasi?kategori=pengumuman', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Laravel API error: ${response.status} ${response.statusText}`);
    }

    const data: Informasi[] = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Error fetching pengumuman data from Laravel API:", error);
    return NextResponse.json(
      { error: "Database error: " + (error.message || error) },
      { status: 500 }
    );
  }
}
