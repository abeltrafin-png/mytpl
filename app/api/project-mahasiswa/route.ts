import { NextResponse } from "next/server";

export type ProjectMahasiswa = {
  id: number;
  nama_mahasiswa: string;
  judul_project: string;
  dosen_pembimbing: string;
};

// GET -> ambil data semua project mahasiswa dari API Laravel atau fallback ke mock data
export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

  try {
    const res = await fetch("http://localhost:8000/api/project-mahasiswa", {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error("Failed to fetch project mahasiswa from Laravel API");
    const projects = await res.json();
    let data: ProjectMahasiswa[];
    if (Array.isArray(projects)) {
      data = projects;
    } else if (projects.data && Array.isArray(projects.data)) {
      data = projects.data;
    } else {
      throw new Error("Unexpected response format from Laravel API");
    }
    return NextResponse.json(data);
  } catch (error) {
    clearTimeout(timeoutId);
    // Fallback mock data
    const mockProjects: ProjectMahasiswa[] = [
      { id: 1, nama_mahasiswa: "Ahmad Fauzi", judul_project: "E-Commerce Platform", dosen_pembimbing: "Dr. Budi Santoso" },
      { id: 2, nama_mahasiswa: "Siti Nurhaliza", judul_project: "Mobile App for Learning", dosen_pembimbing: "Prof. Maya Sari" },
      { id: 3, nama_mahasiswa: "Budi Santoso", judul_project: "AI Chatbot", dosen_pembimbing: "Dr. Ahmad Fauzi" },
      { id: 4, nama_mahasiswa: "Maya Sari", judul_project: "IoT Smart Home", dosen_pembimbing: "Prof. Siti Nurhaliza" },
    ];
    return NextResponse.json(mockProjects);
  }
}
