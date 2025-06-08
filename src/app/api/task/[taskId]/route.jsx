import clientPromise from "@/src/db/db";
import { getSessionUser } from "@/src/util/session-mgmt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const data = await req.json();
    if (
        !data._id.user_id || !data._id.task_id || data.task_parent_id === undefined ||
        data.task_title === undefined || data.task_desc === undefined ||
        data.task_completed === undefined
    ) {
        return new NextResponse(
            "Missing one of the following required fields: _id.user_id, _id.task_id, " +
            "task_parent_id, task_title, task_desc, task_completed",
            { status: 400 }
        );
    }

    const client = await clientPromise;
    const sessionId = (await cookies()).get("sessionToken")?.value;
    const userId = await getSessionUser(sessionId);
    if (!userId) {
        return new NextResponse("You are not logged in", { status: 401 });
    }

    const tasks = client.db().collection("Tasks");
    const task = await tasks.findOneAndReplace({
        '_id.user_id': userId.toString(), '_id.task_id': data._id.task_id
    }, data, { returnDocument: 'after' });

    if (!task) {
        return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json(task);
}