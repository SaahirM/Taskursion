"use client";

import ThemeControls from "@/src/app/theme/ThemeControls";
import { ExpandMoreRounded } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountInfo({ usernamePromise }) {
    const [username, setUsername] = useState(null);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/user/logout", {
            method: 'POST'
        });
        router.push("/");
    };

    useEffect(() => {    
        usernamePromise.then(setUsername);
    }, [usernamePromise]);

    const displayedName = username === null
        ? <Skeleton animation='wave' />
        : username;

    return (<Paper sx={{ p: 3, m: 1, border: 2 }}>
        <Typography variant='h3'>{displayedName}</Typography>

        <Box my={2}>
            <Accordion elevation={4}>
                <AccordionSummary
                    aria-controls="theme-controls"
                    id="theme-controls-header"
                    expandIcon={<ExpandMoreRounded />}
                >
                    <Typography variant='h4'>Change Theme</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ThemeControls />
                </AccordionDetails>
            </Accordion>
        </Box>

        <Button
            onClick={handleLogout}
            variant='contained'
            color='secondary'
            size='small'
        >
            Logout
        </Button>
    </Paper>);
}