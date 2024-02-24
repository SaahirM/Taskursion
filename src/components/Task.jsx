"use client";

import Link from "next/link";
import BorderHeader from "./BorderHeaders/BorderHeader";
import BorderLogo from "./BorderHeaders/BorderLogo";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { Alert, Snackbar, Typography } from "@mui/material";
import EditableTypography from "../util/EditableTypography";
import { useState } from "react";

export default function Task({ task: initialTask }) {
    const [task, setTask] = useState(initialTask);
    const [isSbOpen, setIsSbOpen] = useState(false);
    const [error, setError] = useState("");

    const saveTask = task => {
        fetch(`/api/task/${task._id.task_id}`, {
            method: 'POST',
            body: JSON.stringify(task)
        })
            .then(async res => {
                if (res.status === 404) {
                    throw new Error("Task could not be updated. Task may have been deleted");
                } else if (!res.ok) {
                    const error = await res.text();
                    if (error !== "") {
                        throw new Error(error);
                    }
                    throw new Error(`Server responded with a ${res.status} status code`);
                }
            })
            .then(() => {
                setTask(task);
            })
            .catch(e => {
                console.log(e);
                if (e.message) {
                    setError(e.message);
                    setIsSbOpen(true);
                } else {
                    setError("An unexpected error occurred while updating this task");
                    setIsSbOpen(true);
                }
            })
    }

    const backLinkComponent = (<>
        <ChevronLeftRoundedIcon fontSize='large' />
        <Typography variant='h4' component='p' noWrap width='100%'>
            Back to <b>Task name goes here</b>
        </Typography>
    </>);

    return (<BorderHeader
        primaryHeaderComponent={{ component: backLinkComponent, linkTarget: "/home/task/2" }}
        secondaryHeaderComponent={{ component: <BorderLogo />, linkTarget: "/home" }}
    >
        <h1>Task # {task?._id.task_id}</h1>
        <EditableTypography
            variant='h2'
            value={task.task_title}
            setValue={val => saveTask({ ...task, task_title: val })}
        />
        <br/>
        <EditableTypography
            variant='body1'
            value={task.task_desc}
            setValue={val => saveTask({ ...task, task_desc: val })}
            multiline
        />
        
        <br/>{JSON.stringify(initialTask)}
        <Link href={"/user"}>Back</Link>

        <Snackbar
            open={isSbOpen}
            autoHideDuration={9000}
            onClose={setIsSbOpen.bind(null, false)}
        >
            <Alert onClose={setIsSbOpen.bind(null, false)} severity='error' variant='filled'>
                {error}
            </Alert>
        </Snackbar>
    </BorderHeader>);
}