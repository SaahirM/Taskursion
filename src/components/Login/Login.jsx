"use client";

import { Container } from "@mui/material";
import LoginForm from "./LoginForm";
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ToastContext } from "../ToastContextProvider";

export default function Login() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const isNotLoggedIn = searchParams.has("notLoggedIn");
    const maybePathAfterLogin = searchParams.get("afterLogin");
    const pathAfterLogin = maybePathAfterLogin
        ? decodeURIComponent(maybePathAfterLogin)
        : "/home";
    
    const toast = useContext(ToastContext);

    const [formData, setFormData] = useState({ email: "", pass: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isNotLoggedIn) {
            toast("Please log into your account first.");
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete("notLoggedIn");
            router.replace(`${pathname}?${newSearchParams}`);
        }
    }, [])

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

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
                const message = e.message
                    ? e.message
                    : "An unexpected error occurred while communicating with the server";
                toast(message);
            })
            .finally(() => { setLoading(false); });
    };

    return (<Container
        maxWidth='sm'
        component='form'
        onSubmit={handleSubmit}
    >
        <LoginForm formData={formData} changeHandler={handleChange} loading={loading} />
    </Container>);
}