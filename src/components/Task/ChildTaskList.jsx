import { Divider, List, ListItem, Paper, Skeleton, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ChildTaskCard from "./ChildTaskCard";
import CreateChildTaskBtn from "./CreateChildTaskBtn";

export default function ChildTaskList({ childTasksPromise, parentId, saveTask }) {
    const [loading, setLoading] = useState(true);
    const [childTasks, setChildTasks] = useState([]);

    useEffect(() => {
        childTasksPromise.then(childTasks => {
            setLoading(false);
            setChildTasks(childTasks);
        });
    }, [childTasksPromise]);

    if (loading) return <Skeleton animation='wave' height={200} />;

    return (<>
        <CreateChildTaskBtn parentId={parentId} setChildTasks={setChildTasks} />
        {childTasks.length === 0
            ? <Divider component='div' role='presentation'><Typography variant='body1' textAlign='center'>
                This task has no subtasks
            </Typography></Divider>
            : <Paper elevation={3}><List disablePadding>
                {childTasks.map(childTask => <Fragment key={childTask._id.task_id}>
                    <ListItem disablePadding>
                        <ChildTaskCard
                            childTask={childTask}
                            saveTask={saveTask}
                        />
                    </ListItem>
                    <Divider component='li' />
                </Fragment>)}
            </List></Paper>
        }
    </>);
}