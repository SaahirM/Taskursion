import client from "@/src/app/db";
import bcrypt from 'bcrypt';
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

    const res = client.connect()
        .then(async () => {
            const users = client.db().collection("Users");

            const maybeUser = await users.findOne({ user_email: data.email });
            console.log(maybeUser);
            if (maybeUser != null) {
                return new NextResponse(
                    "That email is already being used"
                    , { status: 400 });
            }

            const result = await users.insertOne({
                user_name: data.name,
                user_email: data.email,
                user_pass_hash: hash
            })

            const sessions = client.db().collection("Sessions");
            const sessionId = crypto.randomUUID();
            await sessions.insertOne({ _id: sessionId, userId: result.insertedId });

            const res = new NextResponse();
            res.cookies.set("sessionToken", sessionId);
            return res;
        })
        .finally(() => { client.close() });

    return res;
}