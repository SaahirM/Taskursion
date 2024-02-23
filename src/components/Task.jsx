"use client";

import Link from "next/link";
import BorderHeader from "./BorderHeaders/BorderHeader";
import BorderLogo from "./BorderHeaders/BorderLogo";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { TextField, Typography } from "@mui/material";
import EditableTypography from "../util/EditableTypography";

export default function Task({ task }) {
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
        <EditableTypography variant='h2' value={task.task_title} />
        <br/>
        <EditableTypography variant='body1' value={task.task_desc} multiline />
        
        <br/>{JSON.stringify(task)}
        <Link href={"/user"}>Back</Link>
    </BorderHeader>);
}