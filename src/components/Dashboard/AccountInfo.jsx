"use client";

import ThemeControls from "@/src/app/theme/ThemeControls";
import { ExpandMoreRounded } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import { startHolyLoader, stopHolyLoader } from "holy-loader";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../ToastContextProvider";

export default function AccountInfo({ usernamePromise }) {
    const [username, setUsername] = useState(null);
    const router = useRouter();
    const toast = useContext(ToastContext);

    const handleLogout = () => {
        startHolyLoader();
        fetch("/api/user/logout", {
            method: 'POST'
        })
            .then(() => {    
                router.push("/");
            })
            .catch(e => {
                const message = e.message ??
                    "An unexpected error occurred while communicating with the server";
                toast(message, false);
                stopHolyLoader();
            });
    };

    useEffect(() => {    
        usernamePromise.then(setUsername);
    }, [usernamePromise]);

    const displayedName = username === null
        ? <Skeleton animation='wave' />
        : username;

    return (
        <Paper sx={{ p: 3, m: 1, border: 2 }}>
            <Typography variant='h3'>{displayedName}</Typography>
            <Box sx={{
                my: 2
            }}>
                <Accordion elevation={4} slotProps={{ heading: { component: 'h4' }}}>
                    <AccordionSummary
                        aria-controls="theme-controls"
                        id="theme-controls-header"
                        expandIcon={<ExpandMoreRounded />}
                    >
                        <Typography variant="h4" component="span">Change Theme</Typography>
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
        </Paper>
    );
}