"use client";

import { Alert, Container, Snackbar } from "@mui/material";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Login() {
    const searchParams = useSearchParams();
    const isNotLoggedIn = searchParams.has("notLoggedIn");
    const isServerError = searchParams.has("serverAuthError");
    const pathAfterLogin = searchParams.get("afterLogin") || "/home";

    const [formData, setFormData] = useState({ email: "", pass: "" });

    const [isSbOpen, setIsSbOpen] = useState(isNotLoggedIn || isServerError);
    const [serverError, setServerError] = useState("");

    const pathname = usePathname();
    const router = useRouter();

    let message;
    if (isNotLoggedIn) {
        message = "Please log into your account first.";
    } else if (isServerError) {
        message = "The server encountered an issue and is unable to authenticate your request.";
    } else {
        message = serverError;
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

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();

        fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
            .then(async res => {
                if (!res.ok) {
                    const error = await res.text();
                    if (error !== "") {
                        throw new Error(error);
                    }
                    throw new Error(`Server responded with a ${res.status} status code`);
                }
            })
            .then(() => {
                router.push(pathAfterLogin);
            })
            .catch(e => {
                console.log(e);
                if (e.message) {
                    setServerError(e.message);
                    setIsSbOpen(true);
                } else {
                    setServerError(
                        "An unexpected error occurred while communicating with the server"
                    );
                    setIsSbOpen(true);
                }
            })
    }

    return (<Container
        maxWidth='sm'
        component='form'
        onSubmit={handleSubmit}
    >
        <LoginForm formData={formData} changeHandler={handleChange} />

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