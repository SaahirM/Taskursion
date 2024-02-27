import clientPromise from "@/src/db/db";
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

export async function POST(req) {
    const data = await req.json();
    if (
        data.task_parent_id === undefined || data.task_title === undefined ||
        data.task_desc === undefined
    ) {
        return new NextResponse(
            "Missing one of the following required fields: _id.user_id, _id.task_id, " +
            "task_parent_id, task_title, task_desc",
            { status: 400 }
        );
    }

    const client = await clientPromise;
    const sessionId = cookies().get("sessionToken")?.value;
    const userId = await getSessionUser(sessionId);
    if (!userId) {
        return new NextResponse("You are not logged in", { status: 401 });
    }

    const users = client.db().collection("Users");
    const lastTaskId = (await users.findOne({ _id: userId })).user_last_created_task;
    const newTaskId = Number(lastTaskId) + 1;

    const tasks = client.db().collection("Tasks");
    const task = {
        _id: { user_id: String(userId), task_id: newTaskId },
        task_completed: false,
        ...data
    };
    await tasks.insertOne(task);

    const maybeAdditionalUpdate = data.task_parent_id === null ? {
        $addToSet: { user_root_task_ids: newTaskId }
    } : {};
    await users.updateOne({ _id: userId }, {
        $inc: { user_last_created_task: 1 },
        ...maybeAdditionalUpdate
    });

    return NextResponse.json(task);
}