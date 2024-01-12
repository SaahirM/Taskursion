"use client";

import { Typography } from "@mui/material";
import BorderHeader from "./BorderHeader";

export default function HomeBorderHeader({ children }) {
    return (<BorderHeader headerComponent={<Typography variant='h3'>Taskursion</Typography>}>
        {children}
    </BorderHeader>);
}