import client from "@/src/app/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    if (!data.email || !data.pass) {
        return new NextResponse(
            "Missing one of the following required fields: email, pass."
            , { status: 400 });
    }

    const res = client.connect()
        .then(async () => {
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

            const sessions = client.db().collection("Sessions");
            const sessionId = crypto.randomUUID();
            await sessions.insertOne({ _id: sessionId, userId: user._id });

            const res = new NextResponse();
            res.cookies.set("sessionToken", sessionId);
            return res;
        })
        .finally(() => { client.close() });

    return res;
}