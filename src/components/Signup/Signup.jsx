"use client";

import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import SignupForm from "./SignupForm";
import { ToastContext } from "../ToastContextProvider";
import { validateEmail, validateName, validatePass } from "@/src/util/validation";

export default function Signup() {
    const router = useRouter();
    const toast = useContext(ToastContext);

    const [formData, setFormData] = useState({ name: "", email: "", pass: "" });
    const [formError, setFormError] = useState({ name: "", email: "", pass: "" });

    const [loading, setLoading] = useState(false);

    const handleNameChange = e => {
        setFormData({ ...formData, name: e.target.value });
        const name = e.target.value;
        setFormError({ ...formError, name: validateName(name) });
    };

    const handleEmailChange = e => {
        setFormData({ ...formData, email: e.target.value });
        const email = e.target.value;

        if (email === "") {
            setFormError({ ...formError, email: "" });
            return;
        }

        setFormError({ ...formError, email: validateEmail(email) });
    };

    const handlePassChange = e => {
        setFormData({ ...formData, pass: e.target.value });
        const pass = e.target.value;

        if (pass === "") {
            setFormError({ ...formError, pass: "" });
            return;
        }
        
        setFormError({ ...formError, pass: validatePass(pass) });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

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
                const message = e.message ??
                    "An unexpected error occurred while communicating with the server";
                toast(message, false);
            })
            .finally(() => { setLoading(false); });
    };

    return (<Container
        maxWidth='sm'
        component='form'
        onSubmit={handleSubmit}
    >
        <SignupForm
            formData={formData}
            formError={formError}
            handlers={{ name: handleNameChange, email: handleEmailChange, pass: handlePassChange }}
            loading={loading}
        />
    </Container>);
}