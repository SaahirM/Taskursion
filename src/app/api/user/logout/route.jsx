import client from "@/src/app/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    const sessionId = req.cookies.get("sessionToken")?.value;

    const res = new NextResponse();
    res.cookies.delete("sessionToken");

    if (!sessionId) {
        return res;
    }

    client.connect()
        .then(async () => {
            const sessions = client.db().collection("Sessions");
            await sessions.findOneAndDelete({ _id: sessionId });
        })
        .finally(() => { client.close() });

    return res;
}