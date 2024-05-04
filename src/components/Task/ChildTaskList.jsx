import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../ToastContextProvider";
import ChildTaskCard from "./ChildTaskCard";
import CreateChildTaskBtn from "./CreateChildTaskBtn";

export default function ChildTaskList({ childTasksPromise, parentId, saveTask }) {
    const [loading, setLoading] = useState(true);
    const [childTasks, setChildTasks] = useState([]);
    const [createdTask, setCreatedTask] = useState("");

    const toast = useContext(ToastContext);

    useEffect(() => {
        childTasksPromise.then(childTasks => {
            setLoading(false);
            setChildTasks(childTasks);
        });
    }, [childTasksPromise]);

    if (loading) return <Skeleton animation='wave' height={200} />;

    return (<>
        <CreateChildTaskBtn parentId={parentId} setChildTasks={setChildTasks} />
        <Stack divider={<Divider />}>
            {childTasks.length === 0
                ? <Divider component='div' role='presentation'><Typography variant='body1' textAlign='center'>
                    This task has no subtasks
                </Typography></Divider>
                : childTasks.map(childTask => <ChildTaskCard
                    key={childTask._id.task_id}
                    childTask={childTask}
                    saveTask={saveTask}
                />)
            }
        </Stack>
    </>);
}