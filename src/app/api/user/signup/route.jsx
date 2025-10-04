import { AUTH_TYPE, SESSION_EXPIRATION_TIME_SECONDS, SESSION_TOKEN_COOKIE_NAME } from "@/src/constants/auth";
import clientPromise from "@/src/db/db";
import { authenticateSession, startSession } from "@/src/util/session-mgmt";
import { validateEmail, validateName, validatePass } from "@/src/util/validation";
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

    const valError = validateName(data.name) || validateEmail(data.email) ||
        validatePass(data.pass);
    if (valError) {
        return new NextResponse(valError, { status: 400 });
    }

    const hash = await bcrypt.hash(data.pass, SALT_ROUNDS);

    const client = await clientPromise;
    const maybeSessionId = (await cookies()).get(SESSION_TOKEN_COOKIE_NAME)?.value;
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
        user_last_created_task: 0,
        auth_type: AUTH_TYPE.PASSWORD,
    });

    const sessionId = await startSession(result.insertedId);

    const res = new NextResponse();
    res.cookies.set(SESSION_TOKEN_COOKIE_NAME, sessionId, {
        maxAge: SESSION_EXPIRATION_TIME_SECONDS,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    return res;
}