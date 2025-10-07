import { SESSION_EXPIRATION_TIME_SECONDS, SESSION_TOKEN_COOKIE_NAME } from "@/src/constants/auth";
import { DEMO_ACCOUNT_LIFESPAN_MS } from "@/src/constants/demo";
import clientPromise from "@/src/db/db";
import { authenticateSession, startSession } from "@/src/util/session-mgmt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const client = await clientPromise;
    const maybeSessionId = (await cookies()).get(SESSION_TOKEN_COOKIE_NAME)?.value;

    if (maybeSessionId && (await authenticateSession(maybeSessionId)) !== false) {
        return new NextResponse(
            "You are already logged in (try refreshing the page)", { status: 400 }
        );
    }

    const users = client.db().collection("Users");
    const userUuid = crypto.randomUUID();

    const demoTasks = [
        {
            task_id: 1,
            task_title: "Explore Taskursion",
            task_desc: "Welcome to Taskursion! Click this task if you need help getting started.\nThis is a demo account so feel free to play around and test features out.",
            task_parent_id: null,
            task_completed: false,
        },
        {
            task_id: 2,
            task_title: "View a task or subtask",
            task_desc: "Click on a task to view its details. We've checked this task off for you because you've already completed it!",
            task_parent_id: 1,
            task_completed: true,
        },
        {
            task_id: 3,
            task_title: "Create tasks",
            task_desc: "You can create tasks from the homepage by adding a title, maybe a description, and hitting \"Create new task\". You can also create subtasks within a task by adding a title below and clicking the '+'.",
            task_parent_id: 1,
            task_completed: false,
        },
        {
            task_id: 4,
            task_title: "Create deeply nested subtasks",
            task_desc: "You can create subtasks within subtasks to any depth you want. This is a subtask of a subtask of a task! Organize your tasks into hierarchies however you see fit.\n\nObserve how the app header changes as you navigate.",
            task_parent_id: 3,
            task_completed: false,
        },
        {
            task_id: 5,
            task_title: "Update tasks",
            task_desc: "You can update a task's title and description any time.",
            task_parent_id: 1,
            task_completed: false,
        },
        {
            task_id: 6,
            task_title: "Complete tasks",
            task_desc: "Mark tasks as completed by clicking the checkbox next to them.",
            task_parent_id: 1,
            task_completed: false,
        },
    ];

    const lastCreatedTaskId = Math.max(...demoTasks.map(t => t.task_id));

    const userResult = await users.insertOne({
        user_name: `Demo User`,
        user_email: `demo-${userUuid}@example.com`,
        user_pass_hash: "",
        user_root_task_ids: [1],
        user_last_created_task: lastCreatedTaskId,
        auth_type: "demo",
        demo_user_expires: new Date(Date.now() + DEMO_ACCOUNT_LIFESPAN_MS),
    });

    const tasks = client.db().collection("Tasks");
    await tasks.insertMany(
        demoTasks.map(task => ({
            _id: { user_id: String(userResult.insertedId), task_id: task.task_id },
            task_title: task.task_title,
            task_desc: task.task_desc,
            task_parent_id: task.task_parent_id,
            task_completed: task.task_completed,
        }))
    );

    const sessionId = await startSession(userResult.insertedId);

    const res = new NextResponse();
    res.cookies.set(SESSION_TOKEN_COOKIE_NAME, sessionId, {
        maxAge: SESSION_EXPIRATION_TIME_SECONDS,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    return res;
}