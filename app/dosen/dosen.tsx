"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Dosen = {
  id: number;
  nama: string;
  nidn: string;
  jurusan: string;
  foto_url: string;
};

import DosenTable from "../component/DosenTable";

export default function DosenPage() {
  return (
    <div>
      <DosenTable />
    </div>
  );
}
