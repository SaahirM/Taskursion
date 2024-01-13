"use client";

import { Box, Typography } from "@mui/material";
import BorderHeader from "./BorderHeader";

export default function HomeBorderHeader({ children }) {
    const header = <Typography variant='h3' component='p' fontWeight='600'>Taskursion</Typography>;

    return (<BorderHeader primaryHeaderComponent={{ component: header, linkTarget: '/' }}>
        {children}
    </BorderHeader>);
}