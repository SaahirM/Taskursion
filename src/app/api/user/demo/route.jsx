import { SESSION_EXPIRATION_TIME_SECONDS, SESSION_TOKEN_COOKIE_NAME } from "@/src/constants/auth";
import clientPromise from "@/src/db/db";
import { authenticateSession, startSession } from "@/src/util/session-mgmt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const client = await clientPromise;
    const maybeSessionId = (await cookies()).get(SESSION_TOKEN_COOKIE_NAME)?.value;

    if (maybeSessionId && (await authenticateSession(maybeSessionId)) !== false) {
        return new NextResponse(
            "You are already logged in (try refreshing the page)", { status: 400 }
        );
    }

    const users = client.db().collection("Users");
    const userUuid = crypto.randomUUID();

    const userResult = await users.insertOne({
        user_name: `Demo User`,
        user_email: `demo-${userUuid}@example.com`,
        user_pass_hash: "",
        user_root_task_ids: [],
        user_last_created_task: 0,
        auth_type: "demo",
    });

    const sessionId = await startSession(userResult.insertedId);

    const res = new NextResponse();
    res.cookies.set(SESSION_TOKEN_COOKIE_NAME, sessionId, {
        maxAge: SESSION_EXPIRATION_TIME_SECONDS,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    return res;
}