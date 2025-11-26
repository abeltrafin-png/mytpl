"use client";

import React from "react";

type TableProps = {
  columns: { key: string; label: string; }[];
  data: { [key: string]: any }[];
};

export default function Table({ columns, data }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300 bg-white">
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-blue-500"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.isArray(data) && data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium"
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}