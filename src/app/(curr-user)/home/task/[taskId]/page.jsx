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

    let isTaskNotFound = false;
    const task = await client.connect()
        .then(async () => {
            const tasks = client.db().collection("Tasks");
            const task = await tasks.findOne({
                '_id.user_id': String(userId), '_id.task_id': Number(taskId)
            });
            if (!task) { isTaskNotFound = true; }
            return task;
        })
        .finally(async () => { await client.close(); });
    
    if (isTaskNotFound) {
        return (<HomeBorderHeader linkTarget='/home'><NotFound /></HomeBorderHeader>);
    }

    return (
        <main>
            <Task task={task} />
        </main>
    );
}
