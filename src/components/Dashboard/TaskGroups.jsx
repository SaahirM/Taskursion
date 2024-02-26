import { cookies } from 'next/headers';
import { Paper } from "@mui/material";
import client from "../../util/db";
import TaskGroupCard from './TaskGroupCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { getSessionUser } from '../../util/session-mgmt';
import AddTaskGroup from './AddTaskGroup';

export default async function TaskGroups() {
    const tasks = await client.connect()
        .then(async () => {
            const sessionId = cookies().get("sessionToken").value;
            const userId = (await getSessionUser(sessionId));

            const users = client.db().collection("Users");
            const rootTaskIds = (await users.findOne({ _id: userId })).user_root_task_ids;

            const tasksCollection = client.db().collection("Tasks");
            const tasks = await tasksCollection.find({
                // TODO: limit number of tasks in rootTaskIds to improve performance
                // (can ask user to load more tasks if desired)
                "_id.user_id": userId.toString(), "_id.task_id": { $in: rootTaskIds } 
            }).toArray();

            return tasks;
        })
        .catch(e => {
            console.log("Failed to fetch tasks\n" + e);
            return [];
        })
        .finally(() => client.close());

    return (<Paper sx={{ p: 3, m: 1, border: 2 }}>
        <Grid container spacing={2}>
            <Grid xs={12} lg={6}>
                <AddTaskGroup />
            </Grid>

            {tasks.map(task => <Grid key={task._id.task_id} xs={12} lg={6} height={"100%"}>
                <TaskGroupCard taskGroup={task} />
            </Grid>)}
        </Grid>
    </Paper>);
}