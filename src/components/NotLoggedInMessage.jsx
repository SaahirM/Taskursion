"use client";

import { Alert, Snackbar } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function NotLoggedInMessage() {
    const searchParams = useSearchParams();
    const isNotLoggedIn = searchParams.has("notLoggedIn");
    const [open, setOpen] = useState(isNotLoggedIn);
    console.log(searchParams.get("afterLogin"));

    return <Snackbar
        open={open}
        autoHideDuration={9000}
        onClose={setOpen.bind(null, false)}
    >
        <Alert onClose={setOpen.bind(null, false)} severity='error' variant='filled'>
            Please log into your account first
        </Alert>
    </Snackbar>;
}