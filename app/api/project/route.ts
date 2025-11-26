import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export type Project = {
  id: number;
  title: string;
  team: string;
  description: string;
  technologies: string[];
  year: number;
};

// GET -> ambil data semua project mahasiswa dari API Laravel atau fallback ke mock data
export async function GET() {
  try {
    const res = await fetch("http://localhost:8000/api/project");
    if (!res.ok) throw new Error("Failed to fetch projects from Laravel API");
    const projects = await res.json();
    return NextResponse.json(projects as Project[]);
  } catch (error) {
    // Fallback mock data
    const mockProjects: Project[] = [
      { id: 1, title: "E-Commerce Platform", team: "Team Alpha", description: "A full-stack e-commerce website", technologies: ["React", "Node.js", "MongoDB"], year: 2023 },
      { id: 2, title: "Mobile App for Learning", team: "Team Beta", description: "Educational mobile application", technologies: ["React Native", "Firebase"], year: 2023 },
      { id: 3, title: "AI Chatbot", team: "Team Gamma", description: "Intelligent chatbot for customer service", technologies: ["Python", "TensorFlow", "Flask"], year: 2022 },
      { id: 4, title: "IoT Smart Home", team: "Team Delta", description: "Smart home automation system", technologies: ["Arduino", "Raspberry Pi", "MQTT"], year: 2023 },
    ];
    return NextResponse.json(mockProjects);
  }
}
