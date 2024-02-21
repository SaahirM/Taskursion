"use client";

import { Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

export default function BorderLogo() {
    const isTinyScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    if (isTinyScreen) {
        return <Image
            src='/favicon.ico'
            alt="To home"
            width={64} height={64}
        />;
    }

    return <Typography
        variant='h3'
        component='p'
        fontWeight='600'
        textAlign='end'
        p={1}
    >
        Taskursion
    </Typography>;
}