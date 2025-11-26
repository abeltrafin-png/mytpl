import type { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { db } from "../../../lib/db";

export const config = {
  api: {
    bodyParser: false, // penting agar WebSocket tidak bentrok dengan parser Next.js
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(res.socket as any).server.io) {
    console.log("🔌 Inisialisasi Socket.IO...");

    const httpServer: HTTPServer = (res.socket as any).server as any;
    const io = new IOServer(httpServer, {
      path: "/api/socket_io",
      addTrailingSlash: false,
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("✅ Client connected:", socket.id);

      socket.on("message", async (data) => {
        console.log("💬 Pesan diterima:", data);
        try {
          await db.execute("INSERT INTO chat_messages (text, created_at) VALUES (?, NOW())", [data.text]);
          console.log("💾 Pesan disimpan ke database");
        } catch (error) {
          console.error("❌ Gagal menyimpan pesan:", error);
        }
        socket.broadcast.emit("message", data);
      });

      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
      });
    });

    (res.socket as any).server.io = io;
  }

  res.end();
}
