import { AddCircleOutlineRounded } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Divider, IconButton, Paper, Skeleton, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChildTaskList({ childTasksPromise }) {
    const [loading, setLoading] = useState(true);
    const [childTasks, setChildTasks] = useState([]);

    useEffect(() => {    
        childTasksPromise.then(childTasks => {
            setLoading(false);
            setChildTasks(childTasks);
        })
    }, [childTasksPromise]);

    if (loading) return <Skeleton animation='wave' height={200} />

    return (<Stack gap={1}>
        <Paper elevation={0} sx={{ p: 2}}>
            <Grid container>
                <Grid xs='auto'>
                    <IconButton aria-label="Add subtask">
                        <AddCircleOutlineRounded fontSize='large'/>
                    </IconButton>
                </Grid>
                <Grid xs>
                    <TextField
                        placeholder="Plan everything out..."
                        label="Subtask"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Paper>
        {childTasks.length === 0
            ? <Divider component='div' role='presentation'><Typography variant='body1' textAlign='center'>
                This task has no subtasks
            </Typography></Divider>
            : childTasks.map(childTask => <Card key={childTask._id.task_id}>
                <CardActionArea href={`/home/task/${childTask._id.task_id}`} LinkComponent={Link}>
                    <CardContent>
                        <Typography variant='body1'>{childTask.task_title}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>)
        }
    </Stack>);
}