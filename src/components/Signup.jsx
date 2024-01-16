"use client";

import { Alert, Container, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignupForm from "./SignupForm";

const PASS_REGEX = /(?=.*[^A-Za-z0-9_ \t\r\n\v\f])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/;

export default function Signup() {
    const router = useRouter();

    const [formData, setFormData] = useState({ name: "", email: "", pass: "" });
    const [formError, setFormError] = useState({ name: "", email: "", pass: "" });

    const [isSbOpen, setIsSbOpen] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleNameChange = e => {
        setFormData({ ...formData, name: e.target.value });
        const name = e.target.value;

        if (name.length > 255) {
            setFormError({
                ...formError,
                name: "This name is too long! Please use at most 255 characters."
            });
        } else {
            setFormError({
                ...formError,
                name: ""
            });
        }
    }

    const handleEmailChange = e => {
        setFormData({ ...formData, email: e.target.value });
        const email = e.target.value;

        if (email.length > 254) {
            setFormError({
                ...formError,
                email: "This email is too long! Email addresses must not exceed 254 characters."
            });
        } else {
            setFormError({
                ...formError,
                email: ""
            });
        }
    }

    const handlePassChange = e => {
        setFormData({ ...formData, pass: e.target.value });
        const pass = e.target.value;

        if (pass === "") {
            setFormError({
                ...formError,
                pass: ""
            });
        } else if (pass.length < 8) {
            setFormError({
                ...formError,
                pass: "This password is too short! It needs to have at least 8 characters."
            });
        } else if (!PASS_REGEX.test(pass)) {
            setFormError({
                ...formError,
                pass: "This password doesn't meet the requirements."
            });
        } else {
            setFormError({
                ...formError,
                pass: ""
            });
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        fetch('/api/user/signup', {
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
                router.push("/home");
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
        <SignupForm
            formData={formData}
            formError={formError}
            handlers={{name: handleNameChange, email: handleEmailChange, pass: handlePassChange}}
        />

        <Snackbar
            open={isSbOpen}
            autoHideDuration={9000}
            onClose={setIsSbOpen.bind(null, false)}
        >
            <Alert onClose={setIsSbOpen.bind(null, false)} severity='error' variant='filled'>
                {serverError}
            </Alert>
        </Snackbar>
    </Container>);
}