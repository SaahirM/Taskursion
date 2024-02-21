import Link from "next/link";
import BorderHeader from "./BorderHeaders/BorderHeader";
import BorderLogo from "./BorderHeaders/BorderLogo";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { Typography } from "@mui/material";

export default function Task({ taskId }) {
    const backLinkComponent = <>
        <ChevronLeftRoundedIcon fontSize='large' />
        <Typography variant='h4' component='p' noWrap width='100%'>
            Back to <b>Task 2</b>
        </Typography>
    </>;

    return (<BorderHeader
        primaryHeaderComponent={{ component: backLinkComponent, linkTarget: "/home/task/2" }}
        secondaryHeaderComponent={{ component: <BorderLogo />, linkTarget: "/home" }}
    >
        <h1>Task # {taskId}</h1>
        <Link href={"/user"}>Back</Link>
    </BorderHeader>);
}