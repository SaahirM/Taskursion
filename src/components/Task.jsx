"use client";

import Link from "next/link";
import BorderHeader from "./BorderHeaders/BorderHeader";
import BorderLogo from "./BorderHeaders/BorderLogo";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { Typography } from "@mui/material";
import EditableTypography from "../util/EditableTypography";
import { useState } from "react";

export default function Task({ task: initialTask }) {
    const [task, setTask] = useState(initialTask);

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
            setValue={val => setTask({ ...task, task_title: val })}
        />
        <br/>
        <EditableTypography
            variant='body1'
            value={task.task_desc}
            setValue={val => setTask({ ...task, task_desc: val })}
            multiline
        />
        
        <br/>{JSON.stringify(initialTask)}
        <Link href={"/user"}>Back</Link>
    </BorderHeader>);
}