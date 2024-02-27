import clientPromise from "@/src/util/db";
import { authenticateSession, startSession } from "@/src/util/session-mgmt";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SALT_ROUNDS = 10;

export async function POST(req) {
    const data = await req.json();
    if (!data.name || !data.email || !data.pass) {
        return new NextResponse(
            "Missing one of the following required fields: name, email, pass."
            , { status: 400 });
    }

    const hash = await bcrypt.hash(data.pass, SALT_ROUNDS);

    const res = await clientPromise.then(async client => {
        const maybeSessionId = cookies().get("sessionToken")?.value;
        if (maybeSessionId && (await authenticateSession(maybeSessionId)) !== false) {
            return new NextResponse(
                "You are already logged in (try refreshing the page)", { status: 400 }
            );
        }

        const users = client.db().collection("Users");

        const maybeUser = await users.findOne({ user_email: data.email });
        if (maybeUser) {
            return new NextResponse(
                "That email is already being used", { status: 400 }
            );
        }

        const result = await users.insertOne({
            user_name: data.name,
            user_email: data.email,
            user_pass_hash: hash,
            user_root_task_ids: [],
            user_last_created_task: 0
        })

        const sessionId = await startSession(result.insertedId);

        const res = new NextResponse();
        res.cookies.set("sessionToken", sessionId);
        return res;
    });

    return res;
}