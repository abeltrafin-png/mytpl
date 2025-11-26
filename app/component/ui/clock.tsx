"use client";
import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Render placeholder saat server-side render
  if (!time) {
    return (
      <div className="flex items-center justify-between px-6 py-3 campus-bg rounded-xl shadow-lg border border-blue-300 animate-pulse">
        <div className="text-sm font-medium text-white">Loading...</div>
      </div>
    );
  }

  // Format time
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const amPm = time.getHours() >= 12 ? "PM" : "AM";

  // Date information
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const dayName = days[time.getDay()];
  const date = time.getDate().toString().padStart(2, "0");
  const month = months[time.getMonth()];
  const year = time.getFullYear();

  return (
    <div className="flex items-center justify-between px-6 py-3 campus-bg rounded-xl shadow-lg border border-blue-300 transition-all duration-300 hover:shadow-xl">
      {/* Date and Day */}
      <div className="text-sm font-medium text-white whitespace-nowrap">
        {dayName}, {date} {month} {year}
      </div>
      {/* Separator */}
      <div className="h-4 w-px bg-white bg-opacity-50 mx-4"></div>
      {/* Time */}
      <div className="flex items-baseline">
        <div className="text-2xl font-bold text-white transition-all duration-300">{hours}</div>
        <div className="text-2xl font-bold text-white mx-0.5 transition-all duration-300">:</div>
        <div className="text-2xl font-bold text-white transition-all duration-300">{minutes}</div>
        <div className="text-lg font-medium text-yellow-300 ml-1.5 transition-all duration-300">{seconds}</div>
        <div className="text-sm font-medium text-yellow-400 ml-1.5 transition-all duration-300">{amPm}</div>
      </div>
    </div>
  );
}

