import { SESSION_TOKEN_COOKIE_NAME } from "@/src/constants/auth";
import clientPromise from "@/src/db/db";
import { getSessionUser } from "@/src/util/session-mgmt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(_req, { params }) {
    const { taskId } = await params;

    const client = await clientPromise;
    const sessionId = (await cookies()).get(SESSION_TOKEN_COOKIE_NAME)?.value;
    const userId = await getSessionUser(sessionId);
    if (!userId) {
        return new NextResponse("You are not logged in", { status: 401 });
    }

    // TODO verify user has available usage

    const tasks = client.db().collection("Tasks");
    const task = await tasks.findOne({ _id: { user_id: String(userId), task_id: Number(taskId) } });

    if (!task) {
        return new NextResponse("Task not found", { status: 404 });
    }

    // TODO verify there arent any summarizations in progress

    const tasksAndSubtasks = await tasks.aggregate([
        {
            '$match': {
                '_id.user_id': String(userId), 
                '_id.task_id': Number(taskId)
            }
        },
        {
            '$graphLookup': {
                from: 'Tasks', 
                startWith: '$_id.task_id', 
                connectFromField: '_id.task_id', 
                connectToField: 'task_parent_id', 
                as: 'subtasks'
                // TODO maxDepth?
            }
        },
        {
            '$project': {
                tasks: {
                    '$concatArrays': [
                        [
                            {
                                task_parent_id: '$task_parent_id', 
                                task_title: '$task_title', 
                                task_desc: '$task_desc', 
                                _id: '$_id', 
                                task_completed: '$task_completed'
                            }
                        ],
                        '$subtasks'
                    ]
                }
            }
        },
        {
            '$unwind': '$tasks'
        },
        {
            '$sort': {
                'tasks.task_parent_id': 1, 
                'tasks._id.task_id': 1
            }
        },
        {
            '$replaceRoot': {
                newRoot: '$tasks'
            }
        }
    ]).toArray();

    // concat input if too many chars
    const maxChars = parseInt(process.env.AI_TASK_SUMMARY_MAX_CHARS ?? "40000");
    const jsonTasks = tasksAndSubtasks
        .map(task => ({
            id: task._id.task_id,
            parent_id: task.task_parent_id,
            title: task.task_title,
            desc: task.task_desc
        }))
        .map(JSON.stringify);

    let totalChars = 0;
    let promptTasks = "[" + jsonTasks[0];
    let isPromptTruncated = false;
    for (let i = 1; i < jsonTasks.length; i++) {
        const nextTask = jsonTasks[i];
        if (totalChars + nextTask.length > maxChars) {
            promptTasks += ", (truncated...)";
            isPromptTruncated = true;
            break;
        }

        promptTasks += "," + nextTask;
        totalChars += nextTask.length;
    }
    promptTasks += "]";

    const generatedAt = new Date().toISOString();
    const openAiClient = new OpenAI({
        apiKey: () => Promise.resolve(process.env.OPENAI_API_KEY),
    });

    const openAiRes = await openAiClient.responses.create({
        prompt: {
            id: 'pmpt_68eec4abff448195aa3e08b61c994ead0976bcee59279401',
            variables: {
                task: promptTasks,
            },
        },
    });

    const aiSummaryUsage = client.db().collection("AISummaryUsage");
    await aiSummaryUsage.insertOne({
        user_id: String(userId),
        task_id: Number(taskId),
        generated_at: generatedAt,
        input_tokens: openAiRes.usage.input_tokens,
        cached_input_tokens: openAiRes.usage.input_tokens_details.cached_tokens,
        output_tokens: openAiRes.usage.output_tokens,
        total_tokens: openAiRes.usage.total_tokens,
    });

    await tasks.updateOne(
        { _id: { user_id: String(userId), task_id: Number(taskId) } },
        {
            $set: {
                task_ai_summary: {
                    text: openAiRes.output_text,
                    generated_at: generatedAt,
                    wasPromptTruncated: isPromptTruncated,
                }
            }
        },
    );

    return NextResponse.json({
        aiSummary: openAiRes.output_text,
        isPromptTruncated,
        generatedAt
    });
}