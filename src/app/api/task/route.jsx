import { SESSION_TOKEN_COOKIE_NAME } from "@/src/constants/auth";
import clientPromise from "@/src/db/db";
import { getSessionUser } from "@/src/util/session-mgmt";
import { validateTaskDesc, validateTaskTitle } from "@/src/util/validation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    if (
        data.task_parent_id === undefined || data.task_title === undefined ||
        data.task_desc === undefined
    ) {
        return new NextResponse(
            "Missing one of the following required fields: task_parent_id, " +
            "task_title, task_desc",
            { status: 400 }
        );
    }

    if (!data.task_title) return new NextResponse("task_title must be set", { status: 400 });

    const client = await clientPromise;
    const sessionId = (await cookies()).get(SESSION_TOKEN_COOKIE_NAME)?.value;
    const userId = await getSessionUser(sessionId);
    if (!userId) {
        return new NextResponse("You are not logged in", { status: 401 });
    }

    const valError = validateTaskTitle(data.task_title) || validateTaskDesc(data.task_desc);
    if (valError) {
        return new NextResponse(valError, { status: 400 });
    }

    const users = client.db().collection("Users");
    const lastTaskId = (await users.findOne({ _id: userId })).user_last_created_task;
    const newTaskId = Number(lastTaskId) + 1;

    const tasks = client.db().collection("Tasks");
    const task = {
        _id: { user_id: String(userId), task_id: newTaskId },
        task_parent_id: data.task_parent_id,
        task_title: String(data.task_title),
        task_desc: data.task_desc ?? "",
        task_completed: data.task_completed ?? false,
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