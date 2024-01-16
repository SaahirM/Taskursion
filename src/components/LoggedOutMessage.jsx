"use client";

import { Alert, Snackbar } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoggedOutMessage() {
    const searchParams = useSearchParams();
    const isNotLoggedIn = searchParams.has("notLoggedIn");
    const isServerError = searchParams.has("serverAuthError");

    const [open, setOpen] = useState(isNotLoggedIn || isServerError);
    
    let message;
    if (isNotLoggedIn) {
        message = "Please log into your account first.";
    } else if (isServerError) {
        message = "The server encountered an issue and is unable to authenticate your request.";
    }

    return <Snackbar
        open={open}
        autoHideDuration={9000}
        onClose={setOpen.bind(null, false)}
    >
        <Alert onClose={setOpen.bind(null, false)} severity='error' variant='filled'>
            {message}
        </Alert>
    </Snackbar>;
}