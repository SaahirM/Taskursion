import NotFound from "@/src/app/not-found";
import HomeBorderHeader from "@/src/components/BorderHeaders/HomeBorderHeader";
import Task from "@/src/components/Task/Task";
import { SESSION_TOKEN_COOKIE_NAME } from "@/src/constants/auth";
import clientPromise from "@/src/db/db";
import { getRemainingUsage } from "@/src/util/ai-usage";
import { getSessionUser } from "@/src/util/session-mgmt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function TaskPage(props) {
    const params = await props.params;
    const { taskId } = params;

    const sessionId = (await cookies()).get(SESSION_TOKEN_COOKIE_NAME)?.value;
    const userId = await getSessionUser(sessionId);
    if (!userId) {
        redirect("/_bad-session-token");    // middleware will delete cookie
    }

    const fetchTask = async (userId, taskId) => {
        return clientPromise.then(async client => {
            const tasks = client.db().collection("Tasks");
            const task = await tasks.findOne({
                '_id.user_id': String(userId), '_id.task_id': Number(taskId)
            });
            return task;
        });
    };
    const task = await fetchTask(userId, taskId);

    if (!task) {
        return (<HomeBorderHeader linkTarget='/home'><NotFound /></HomeBorderHeader>);
    }

    const parentTaskPromise = task.task_parent_id
        ? fetchTask(userId, task.task_parent_id)
        : null;

    const childTasksPromise = clientPromise.then(async client => {
        const tasks = client.db().collection("Tasks");
        const childTasks = await tasks.find({
            '_id.user_id': String(userId), task_parent_id: Number(taskId)
        }).toArray();
        return childTasks;
    });

    const userAiUsagePromise = getRemainingUsage(userId);

    return (
        <main>
            <Task
                task={task}
                parentTaskPromise={parentTaskPromise}
                childTasksPromise={childTasksPromise}
                userAiUsagePromise={userAiUsagePromise}
            />
        </main>
    );
}
