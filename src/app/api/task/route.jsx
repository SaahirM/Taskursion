import { getSessionUser } from "@/src/util/session-mgmt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const sessionId = cookies().get("sessionToken")?.value;
    const userId = await getSessionUser(sessionId);
    if (!userId) {
        return new NextResponse(
            "Please login at /login or using /api/user/login first.", { status: 401 }
        );
    }

    return NextResponse.json([]);
}