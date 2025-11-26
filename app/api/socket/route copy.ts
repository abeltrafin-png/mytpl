import { NextRequest, NextResponse } from "next/server";
import { Server as SocketIOServer } from "socket.io";
import { db } from "@/lib/db";
export const runtime = "nodejs";

let io: SocketIOServer | null = null;

export async function GET(request: NextRequest) {
    if (!io) {
        console.log("Menyalakan Socket.io server");
        const httpServer = (globalThis as any).httpServer;
        if (!httpServer) {
            return new Response("HTTP server tidak ditemukan", { status: 500 });
        }   

        io = new SocketIOServer(httpServer, {
            path: "/api/socket_io",
            cors: {origin: "*"},
        }); 
    }
}