import client from "@/src/app/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    const sessionToken = await req.text();

    const res = client.connect()
        .then(async () => {
            const sessions = client.db().collection("Sessions");
            const maybeSession = await sessions.findOne({ _id: sessionToken });

            if (maybeSession) {
                return new NextResponse("1");
            }
            return new NextResponse("0");
        })
        .finally(() => {client.close()});
    
    return res;
}