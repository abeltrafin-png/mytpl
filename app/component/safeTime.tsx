"use client";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function SafeTime() {
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
      setDate(now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time || !date) return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-3 mb-2">
        <Clock className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Waktu Sekarang</h3>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-mono font-bold text-blue-600">{time}</p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
    </div>
  );
}
