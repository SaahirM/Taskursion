"use client";

import BorderHeader from "./BorderHeaders/BorderHeader";
import BorderLogo from "./BorderHeaders/BorderLogo";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { Alert, Box, Skeleton, Snackbar, Typography } from "@mui/material";
import EditableTypography from "../util/EditableTypography";
import { useEffect, useState } from "react";

export default function Task({ task: initialTask, parentTaskPromise }) {
    const [task, setTask] = useState(initialTask);
    const [isSbOpen, setIsSbOpen] = useState(false);
    const [error, setError] = useState("");
    const [backLinkInfo, setBackLinkInfo] = useState({ text: "", linkTarget: "" });

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

    useEffect(() => {
        if (parentTaskPromise) {
            parentTaskPromise.then(parentTask => {
                setBackLinkInfo({
                    text: parentTask.task_title,
                    linkTarget: `/home/task/${parentTask._id.task_id}`
                });
            });
        }
    }, [parentTaskPromise])

    const backLinkComponent = (<>
        <ChevronLeftRoundedIcon fontSize='large' />
        <Typography variant='h4' component='p' noWrap width='100%' textAlign='start'>
            {parentTaskPromise ? (
                backLinkInfo.text
                ? backLinkInfo.text
                : <Skeleton animation='wave' />
            ) : "Home"}
        </Typography>
    </>);

    return (<BorderHeader
        primaryHeaderComponent={{
            component: backLinkComponent,
            linkTarget: parentTaskPromise ? backLinkInfo.linkTarget : "/home"
        }}
        secondaryHeaderComponent={{ component: <BorderLogo />, linkTarget: "/home" }}
    >
        <Box p={1} width={{ xs: "100%", lg: "66vw" }} sx={{ '& div, & input': { width: "100%" } }}>
            <EditableTypography
                variant='h2'
                value={task.task_title}
                setValue={val => saveTask({ ...task, task_title: val })}
            />
            <EditableTypography
                variant='body1'
                value={task.task_desc}
                setValue={val => saveTask({ ...task, task_desc: val })}
                multiline
                minRows={5}
            />
        </Box>

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