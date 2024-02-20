import { endSession } from "@/src/util/session-mgmt";
import { NextResponse } from "next/server";

export async function POST(req) {
    const sessionId = req.cookies.get("sessionToken")?.value;

    const res = new NextResponse();
    res.cookies.delete("sessionToken");

    if (!sessionId) {
        return res;
    }

    endSession(sessionId);

    return res;
}