import Link from "next/link";
import BorderHeader from "./BorderHeaders/BorderHeader";
import BorderLogo from "./BorderHeaders/BorderLogo";
import { Typography } from "@mui/material";

export default function Task({ taskId }) {
    const backLinkComponent = <Typography variant='h4' component='p' noWrap width='100%'>
        &lt; Back to <b>Task 2</b>
    </Typography>;

    return (<BorderHeader
        primaryHeaderComponent={{ component: backLinkComponent, linkTarget: "/home/task/2" }}
        secondaryHeaderComponent={{ component: <BorderLogo />, linkTarget: "/home" }}
    >
        <h1>Task # {taskId}</h1>
        <Link href={"/user"}>Back</Link>
    </BorderHeader>);
}