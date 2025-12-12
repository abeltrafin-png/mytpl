import { NextResponse } from "next/server";

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
    const response = await fetch('http://localhost:8000/api/informasi?kategori=berita', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Laravel API error: ${response.status} ${response.statusText}`);
    }

    const berita: Informasi[] = await response.json();

    return NextResponse.json(berita);
  } catch (error: any) {
    console.error("❌ Error fetching berita data from Laravel API:", error);
    return NextResponse.json(
      { error: `Failed to fetch berita data: ${error.message}` },
      { status: 500 }
    );
  }
}
