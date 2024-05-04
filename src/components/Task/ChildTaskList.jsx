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

    const addTask = taskTitle => {
        if (taskTitle === "") return;

        fetch("/api/task", {
            method: 'POST',
            body: JSON.stringify({
                task_parent_id: parentId,
                task_title: taskTitle,
                task_desc: ""
            })
        })
            .then(async res => {
                if (!res.ok) {
                    const error = await res.text();
                    if (error !== "") {
                        throw new Error(error);
                    }
                    throw new Error(`Server responded with a ${res.status} status code`);
                }
                return await res.json();
            })
            .then(data => {
                setChildTasks([...childTasks, data]);
                setCreatedTask("");
            })
            .catch(e => {
                const message = e.message ??
                    "An unexpected error occurred while communicating with the server";
                toast(message);
            });
    };

    if (loading) return <Skeleton animation='wave' height={200} />;

    return (<>
        <CreateChildTaskBtn addTask={addTask} />
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