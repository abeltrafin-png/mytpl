"use client";

import { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
  hoverEffect?: boolean;
};

export function Card({ title, children, hoverEffect = true }: CardProps) {
  return (
    <div
      className={`border rounded-xl border-gray-200
        bg-white/80 backdrop-blur-sm
        shadow-lg p-5
        transition-all duration-300
        ${hoverEffect ? "hover:shadow-xl hover:-translate-y-1" : ""}
      `}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
        <span className="w-1 h-5 bg-blue-500 rounded-full mr-2"></span>
        {title}
      </h2>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
