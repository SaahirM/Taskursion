import { SESSION_TOKEN_COOKIE_NAME } from "@/src/constants/auth";
import clientPromise from "@/src/db/db";
import { getRemainingUsage, isGlobalUsageExceeded } from "@/src/util/ai-usage";
import fetchTaskAggregation from "@/src/util/fetch-tasks-aggregation";
import { getSessionUser } from "@/src/util/session-mgmt";
import stringifyTasks from "@/src/util/stringify-tasks";
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

    if (await getRemainingUsage(userId) <= 0) {
        return new NextResponse("You have exceeded your monthly AI usage limit", { status: 429 });
    }

    if (await isGlobalUsageExceeded() === true) {
        return new NextResponse("AI Summaries are temporarily disabled. Please try again later", { status: 503 });
    }

    const tasks = client.db().collection("Tasks");
    const task = await tasks.findOne({ _id: { user_id: String(userId), task_id: Number(taskId) } });

    if (!task) {
        return new NextResponse("Task not found", { status: 404 });
    }

    const tasksAndSubtasks = await tasks.aggregate(fetchTaskAggregation(userId, taskId)).toArray();

    const { stringTasks: promptTasks, isPromptTruncated } = stringifyTasks(tasksAndSubtasks);

    const generatedAt = new Date();
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