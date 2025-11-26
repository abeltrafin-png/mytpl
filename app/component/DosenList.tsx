import React from "react";

type TableProps<T> = {
  columns: string[];
  data: T[];
};

export default function Table<T extends Record<string, any>>({ columns, data }: TableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-6">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition"
              >
                {Object.values(row).map((val, j) => (
                  <td key={j} className="px-6 py-4 text-gray-700">
                    {val}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
