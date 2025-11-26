"use client";
import { useEffect, useState } from "react";

export default function SafeTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  if (!time) return <p>Loading...</p>; // render awal sama untuk server & client
  return <p>{time}</p>;
}
