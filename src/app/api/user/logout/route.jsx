import { SESSION_TOKEN_COOKIE_NAME } from "@/src/constants/auth";
import clientPromise from "@/src/db/db";
import { endSession, getSessionUser } from "@/src/util/session-mgmt";
import { NextResponse } from "next/server";

export async function POST(req) {
    const sessionId = req.cookies.get(SESSION_TOKEN_COOKIE_NAME)?.value;

    const res = new NextResponse();
    res.cookies.delete(SESSION_TOKEN_COOKIE_NAME);

    if (!sessionId) {
        return res;
    }

    const userId = await getSessionUser(sessionId);
    if (userId) {
        const client = await clientPromise;
        const users = client.db().collection("Users");
        const user = await users.findOne({ _id: userId });

        if (user?.auth_type === "demo") {
            await users.deleteOne({ _id: userId });
        }
    }

    endSession(sessionId);

    return res;
}