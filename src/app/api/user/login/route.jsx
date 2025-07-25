import clientPromise from "@/src/db/db";
import { authenticateSession, startSession } from "@/src/util/session-mgmt";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    if (!data.email || !data.pass) {
        return new NextResponse(
            "Missing one of the following required fields: email, pass."
            , { status: 400 });
    }

    const client = await clientPromise;
    const maybeSessionId = (await cookies()).get("sessionToken")?.value;
    if (maybeSessionId && (await authenticateSession(maybeSessionId)) !== false) {
        return new NextResponse(
            "You are already logged in (try refreshing the page)", { status: 400 }
        );
    }

    const users = client.db().collection("Users");

    const user = await users.findOne({ user_email: data.email });
    if (!user) {
        return new NextResponse(
            "Invalid email or password", { status: 401 }
        );
    }

    const isPassCorrect = await bcrypt.compare(data.pass, user.user_pass_hash);
    if (!isPassCorrect) {
        return new NextResponse(
            "Invalid email or password", { status: 401 }
        );
    }

    const sessionId = await startSession(user._id);

    const res = new NextResponse();
    res.cookies.set("sessionToken", sessionId);
    return res;
}