"use client";

import { Alert, Container, Snackbar } from "@mui/material";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Login() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isNotLoggedIn = searchParams.has("notLoggedIn");
    const isServerError = searchParams.has("serverAuthError");

    const [isSbOpen, setIsSbOpen] = useState(isNotLoggedIn || isServerError);

    const router = useRouter();

    let message;
    if (isNotLoggedIn) {
        message = "Please log into your account first.";
    } else if (isServerError) {
        message = "The server encountered an issue and is unable to authenticate your request.";
    }

    const handleSbClose = () => {
        setIsSbOpen(false);
        if (isNotLoggedIn) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete("notLoggedIn");
            router.replace(`${pathname}?${newSearchParams}`);
        } else if (isServerError) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete("serverAuthError");
            router.replace(`${pathname}?${newSearchParams}`);
        }
    } 

    return (<Container
        maxWidth='sm'
        component='form'
    >
        <LoginForm />

        <Snackbar
            open={isSbOpen}
            autoHideDuration={9000}
            onClose={handleSbClose}
        >
            <Alert onClose={handleSbClose} severity='error' variant='filled'>
                {message}
            </Alert>
        </Snackbar>
    </Container>);
}