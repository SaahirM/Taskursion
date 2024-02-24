import client from "@/src/util/db";
import { getSessionUser } from "@/src/util/session-mgmt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    if (
        !data._id.user_id || !data._id.task_id || !data.task_title || !data.task_desc
    ) {
        return new NextResponse(
            "Missing one of the following required fields: _id.user_id, _id.task_id, " +
            "task_title, task_desc",
            { status: 400 }
        );
    }

    const res = client.connect()
        .then(async () => {
            const sessionId = cookies().get("sessionToken")?.value;
            const userId = await getSessionUser(sessionId);
            if (!userId) {
                return new NextResponse("You are not logged in", { status: 401 });
            }

            const tasks = client.db().collection("Tasks");
            const task = await tasks.findOneAndReplace({
                '_id.user_id': userId.toString(), '_id.task_id': data._id.task_id
            }, data);
            
            if (!task) {
                return NextResponse.json({}, { status: 404 });
            }

            return NextResponse.json(task);
        });

    return res;
}