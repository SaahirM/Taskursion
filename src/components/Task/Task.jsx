"use client";

import BorderHeader from "../BorderHeaders/BorderHeader";
import BorderLogo from "../BorderHeaders/BorderLogo";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { Box, Checkbox, LinearProgress, Skeleton, Typography } from "@mui/material";
import EditableTypography from "../../util/EditableTypography";
import { useContext, useEffect, useState } from "react";
import ChildTaskList from "./ChildTaskList";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ToastContext } from "../ToastContextProvider";

export default function Task({ task: initialTask, parentTaskPromise, childTasksPromise }) {
    const [task, setTask] = useState(initialTask);
    const [completed, setCompleted] = useState(initialTask.task_completed);

    const [loading, setLoading] = useState(false);
    const [backLinkInfo, setBackLinkInfo] = useState({ text: "", linkTarget: "" });

    const toast = useContext(ToastContext);

    const saveTask = task => {
        setLoading(true);
        fetch(`/api/task/${task._id.task_id}`, {
            method: 'PUT',
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
                const message = e.message
                    ? e.message
                    : "An unexpected error occurred while communicating with the server";
                toast(message);
            })
            .finally(() => { setLoading(false); });
    };

    const handleCompletionChange = e => {
        setCompleted(e.target.checked);
        saveTask({ ...task, task_completed: e.target.checked });
    };

    useEffect(() => {
        if (parentTaskPromise) {
            parentTaskPromise.then(parentTask => {
                setBackLinkInfo({
                    text: parentTask.task_title,
                    linkTarget: `/home/task/${parentTask._id.task_id}`
                });
            });
        }
    }, [parentTaskPromise]);

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
        <Box p={1} width={{ xs: "100%", lg: "66%" }}>
            <Grid container flexDirection='row-reverse'>
                <Grid xs>
                    <EditableTypography
                        variant='h2'
                        value={task.task_title}
                        setValue={val => saveTask({ ...task, task_title: val })}
                        placeholder="Task title"
                    />
                </Grid>
                <Grid xs='auto' display='flex' alignContent='center'>
                    <Checkbox
                        aria-label="Mark task as completed"
                        sx={theme => {
                            return {
                                '& .MuiSvgIcon-root': {
                                    fontSize: theme.typography.h2.fontSize
                                }
                            };
                        }}
                        checked={completed}
                        onChange={e => handleCompletionChange(e)}
                    />
                </Grid>
            </Grid>
            {loading ? <LinearProgress color='secondary' /> : <Box height="4px" />}
            <EditableTypography
                variant='body1'
                value={task.task_desc}
                setValue={val => saveTask({ ...task, task_desc: val })}
                multiline
                minRows={5}
                fullWidth
                placeholder="Task description"
            />
            <ChildTaskList
                childTasksPromise={childTasksPromise}
                parentId={task._id.task_id}
            />
        </Box>
    </BorderHeader>);
}