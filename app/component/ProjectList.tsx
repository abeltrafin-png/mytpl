"use client";

import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  team: string;
  description: string;
  technologies: string[];
  year: number;
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const result: Project[] = await res.json();
        setProjects(result);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading projects...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
            <h2 className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform duration-300">{project.title}</h2>
            <div className="flex items-center text-blue-100 text-sm">
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                {project.year}
              </span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium text-gray-700 mr-2">Tim:</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{project.team}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-sm font-medium text-gray-700 mr-2">Teknologi:</span>
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
