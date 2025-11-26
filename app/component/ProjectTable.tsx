"use client";

import Table from "./ui/table";

type Project = {
  id: number;
  title: string;
  team: string;
  description: string;
  technologies: string[];
  year: number;
};

type Props = {
  initialData: Project[];
};

export default function ProjectTable({ initialData }: Props) {
  const transformedData = initialData.map(project => ({
    ...project,
    technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies,
  }));

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "team", label: "Team" },
    { key: "description", label: "Description" },
    { key: "technologies", label: "Technologies" },
    { key: "year", label: "Year" },
  ];

  return (
    <div>
      <Table columns={columns} data={transformedData} />
    </div>
  );
}