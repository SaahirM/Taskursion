"use client";

import { Typography } from "@mui/material";
import BorderHeader from "./BorderHeader";

export default function HomeBorderHeader({ children, linkTarget }) {
    const header = <Typography variant='h2' component='p' fontWeight='600'>Taskursion</Typography>;

    return (<BorderHeader primaryHeaderComponent={{ component: header, linkTarget: linkTarget }}>
        {children}
    </BorderHeader>);
}