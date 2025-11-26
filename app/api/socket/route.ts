export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { Server } from "socket.io";

let io : Server | null = null;
export async function GET(request: NextRequest) {
    if (!io) {
        console.log(" Membuat instance Socket.io server... ");
        const httpServer = (globalThis as any).httpServer;
        if (!httpServer) {
            return new Response("HTTP server tidak ditemukan", { status: 500 });
        }
        io = new Server(httpServer, {
            path: "/api/socket_io",
        });

        io.on("connection", (socket) => {
            console.log(" Client terhubung: ", socket.id);
            socket.on("message", (data) => {
                console.log(" Pesan diterima: ", data);
                io?.emit("message", data);
            });

            socket.on("disconnect", () => {
                console.log(" Client terputus: ", socket.id);
            });
        });
        (globalThis as any).io = io;
    }
    return new Response("Socket.io server aktif", { status: 200 });
}