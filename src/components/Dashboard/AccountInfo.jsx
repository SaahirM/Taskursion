"use client";

import { Button, Paper, Skeleton, Typography } from "@mui/material";
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
        <Typography component='p' variant='h4' mb={1}>{displayedName}</Typography>
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