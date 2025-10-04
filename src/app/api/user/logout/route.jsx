import { endSession } from "@/src/util/session-mgmt";
import { SESSION_TOKEN_COOKIE_NAME } from "@/src/constants/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    const sessionId = req.cookies.get(SESSION_TOKEN_COOKIE_NAME)?.value;

    const res = new NextResponse();
    res.cookies.delete(SESSION_TOKEN_COOKIE_NAME);

    if (!sessionId) {
        return res;
    }

    endSession(sessionId);

    return res;
}