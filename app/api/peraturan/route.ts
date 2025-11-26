import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export type Peraturan = {
  id: number;
  judul: string;
  nomor_peraturan: string;
  isi: string;
  kategori: 'akademik' | 'kemahasiswaan' | 'administratif' | 'keuangan';
  file_url?: string;
  tanggal_berlaku: string;
  status: 'aktif' | 'tidak_aktif';
  created_at?: string;
  updated_at?: string;
};

// GET -> ambil data peraturan dari API Laravel atau fallback ke database
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kategori = searchParams.get('kategori');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    // Try to fetch from Laravel API
    let url = "http://localhost:8000/api/peraturan";
    if (kategori) {
      url += `?kategori=${kategori}`;
    }

    const res = await fetch(url, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("Failed to fetch peraturan from Laravel API");
    
    const peraturan = await res.json();
    let data: Peraturan[];
    
    if (Array.isArray(peraturan)) {
      data = peraturan;
    } else if (peraturan.data && Array.isArray(peraturan.data)) {
      data = peraturan.data;
    } else {
      throw new Error("Unexpected response format from Laravel API");
    }
    
    return NextResponse.json(data);
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Fallback to direct database query
    try {
      let query = "SELECT * FROM tbl_pengaturan WHERE status = 'aktif'";
      const params: any[] = [];
      
      if (kategori) {
        query += " AND kategori = ?";
        params.push(kategori);
      }
      
      query += " ORDER BY tanggal_berlaku DESC";
      
      const [rows] = await db.query(query, params);
      return NextResponse.json(rows as Peraturan[]);
    } catch (dbError: any) {
      // If database also fails, return mock data
      const mockPeraturan: Peraturan[] = [
        {
          id: 1,
          judul: 'Peraturan Akademik Tahun 2024',
          nomor_peraturan: 'SK/001/AKD/2024',
          isi: 'Peraturan ini mengatur tentang sistem akademik, kurikulum, dan evaluasi pembelajaran di Program Studi Teknik Perangkat Lunak.',
          kategori: 'akademik',
          file_url: 'peraturan/akademik_2024.pdf',
          tanggal_berlaku: '2024-01-01',
          status: 'aktif',
          created_at: '2024-01-01 00:00:00',
          updated_at: '2024-01-01 00:00:00'
        },
        {
          id: 2,
          judul: 'Pedoman Penyusunan Tugas Akhir',
          nomor_peraturan: 'SK/002/AKD/2024',
          isi: 'Pedoman ini berisi tata cara penyusunan tugas akhir/skripsi, mulai dari pengajuan judul, bimbingan, hingga sidang akhir.',
          kategori: 'akademik',
          file_url: 'peraturan/pedoman_ta.pdf',
          tanggal_berlaku: '2024-02-01',
          status: 'aktif',
          created_at: '2024-02-01 00:00:00',
          updated_at: '2024-02-01 00:00:00'
        },
        {
          id: 4,
          judul: 'Tata Tertib Mahasiswa',
          nomor_peraturan: 'SK/001/KMH/2024',
          isi: 'Peraturan ini mengatur tata tertib dan kode etik mahasiswa di lingkungan kampus.',
          kategori: 'kemahasiswaan',
          file_url: 'peraturan/tata_tertib.pdf',
          tanggal_berlaku: '2024-01-01',
          status: 'aktif',
          created_at: '2024-01-01 00:00:00',
          updated_at: '2024-01-01 00:00:00'
        },
        {
          id: 7,
          judul: 'Prosedur Administrasi Akademik',
          nomor_peraturan: 'SK/001/ADM/2024',
          isi: 'Mengatur prosedur administrasi akademik seperti registrasi, KRS, perubahan data, cuti akademik, dan pengunduran diri.',
          kategori: 'administratif',
          file_url: 'peraturan/prosedur_admin.pdf',
          tanggal_berlaku: '2024-01-01',
          status: 'aktif',
          created_at: '2024-01-01 00:00:00',
          updated_at: '2024-01-01 00:00:00'
        },
        {
          id: 10,
          judul: 'Peraturan Biaya Pendidikan',
          nomor_peraturan: 'SK/001/KEU/2024',
          isi: 'Mengatur komponen biaya pendidikan, besaran SPP, biaya praktikum, dan biaya lainnya.',
          kategori: 'keuangan',
          file_url: 'peraturan/biaya_pendidikan.pdf',
          tanggal_berlaku: '2024-01-01',
          status: 'aktif',
          created_at: '2024-01-01 00:00:00',
          updated_at: '2024-01-01 00:00:00'
        }
      ];
      
      // Filter by kategori if provided
      const filteredData = kategori 
        ? mockPeraturan.filter(p => p.kategori === kategori)
        : mockPeraturan;
      
      return NextResponse.json(filteredData);
    }
  }
}

// POST -> tambah peraturan baru via API Laravel
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, nomor_peraturan, isi, kategori, file_url, tanggal_berlaku, status } = body;

    if (!judul || !nomor_peraturan || !isi || !kategori || !tanggal_berlaku) {
      return NextResponse.json(
        { error: "Field judul, nomor_peraturan, isi, kategori, dan tanggal_berlaku wajib diisi!" },
        { status: 400 }
      );
    }

    const res = await fetch("http://localhost:8000/api/peraturan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        judul, 
        nomor_peraturan, 
        isi, 
        kategori, 
        file_url, 
        tanggal_berlaku, 
        status: status || 'aktif' 
      }),
    });

    if (!res.ok) throw new Error("Failed to add peraturan via Laravel API");

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
