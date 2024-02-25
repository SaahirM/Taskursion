import { cookies } from 'next/headers';
import { Button, Card, CardContent, Paper, TextField } from "@mui/material";
import client from "../../util/db";
import TaskGroupCard from './TaskGroupCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { getSessionUser } from '../../util/session-mgmt';

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
        });

    return (<Paper sx={{ p: 3, m: 1, border: 2 }}>
        <Grid container spacing={2}>
            <Grid xs={12} lg={6}>
                <Card elevation={0} sx={{ height: "100%", border: "1px dashed black" }}>
                    <CardContent sx={{ ':last-child': { pb: 'unset', p: 2 } }}>
                        <TextField
                            label="Task title"
                            fullWidth
                            margin='dense'
                            size='small'
                        />
                        <TextField
                            label="Task description"
                            fullWidth
                            margin='dense'
                            size='small'
                            multiline
                            rows={3}
                        />
                        <Button size='small' sx={{ fontSize: ["0.7rem", "0.9rem"] }}>Create new root task</Button>
                    </CardContent>
                </Card>
            </Grid>

            {tasks.map(task => <Grid key={task._id} xs={12} lg={6} height={"100%"}>
                <TaskGroupCard taskGroup={task} />
            </Grid>)}
        </Grid>
    </Paper>);
}