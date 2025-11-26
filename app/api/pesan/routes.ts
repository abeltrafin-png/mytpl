import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
    const [rows] = await db.query("SELECT * FROM pesan ORDER BY id ASC");
    return Response.json(rows);
}
