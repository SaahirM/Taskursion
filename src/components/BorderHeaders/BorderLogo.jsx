"use client";

import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

export default function BorderLogo() {
    const isTinyScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const theme = useTheme();

    if (isTinyScreen) {
        return <Image
            src='/favicon.ico'
            alt="To home"
            width={64} height={64}
            style={{ padding: theme.spacing(1) }}
        />;
    }

    return (
        <Typography
            variant='h2'
            component='p'
            sx={{
                fontWeight: '600',
                textAlign: 'end',
                p: 1
            }}>
            Taskursion
        </Typography>
    );
}