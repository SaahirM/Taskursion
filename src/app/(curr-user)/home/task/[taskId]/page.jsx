import NotFound from "@/src/app/not-found";
import HomeBorderHeader from "@/src/components/BorderHeaders/HomeBorderHeader";
import Task from "@/src/components/Task";
import client from "@/src/util/db";
import { getSessionUser } from "@/src/util/session-mgmt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function TaskPage({ params: { taskId } }) {
    const sessionId = cookies().get("sessionToken")?.value;
    const userId = await getSessionUser(sessionId)
    if (!userId) {
        redirect("/_bad-session-token");    // middleware will delete cookie
    }

    const fetchTask = async (userId, taskId) => {
        return client.connect()
            .then(async () => {
                const tasks = client.db().collection("Tasks");
                const task = await tasks.findOne({
                    '_id.user_id': String(userId), '_id.task_id': Number(taskId)
                });
                return task;
            })
            .finally(async () => await client.close());
    }
    const task = await fetchTask(userId, taskId);
    
    if (!task) {
        return (<HomeBorderHeader linkTarget='/home'><NotFound /></HomeBorderHeader>);
    }

    const parentTaskPromise = task.task_parent_id
        ? fetchTask(userId, task.task_parent_id)
        : null;
    
    const childTasksPromise = client.connect()
        .then(async () => {
            const tasks = client.db().collection("Tasks");
            const childTasks = await tasks.find({
                '_id.user_id': String(userId), task_parent_id: Number(taskId)
            }).toArray();
            return childTasks;
        })
        .finally(() => client.close());

    return (
        <main>
            <Task
                task={task}
                parentTaskPromise={parentTaskPromise}
                childTasksPromise={childTasksPromise}
            />
        </main>
    );
}
