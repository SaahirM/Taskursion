"use client";

import { Container } from "@mui/material";
import LoginForm from "./LoginForm";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContext } from "../ToastContextProvider";
import { useNetworkRequest } from "../NetworkReqInFlightContextProvider";
import { startHolyLoader } from "holy-loader";

export default function LoginContainer({ pathAfterLogin = '/home' }) {
    const router = useRouter();
    const toast = useContext(ToastContext);
    const { setRequestInFlight } = useNetworkRequest();

    const [formData, setFormData] = useState({ email: "", pass: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setRequestInFlight(true);

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
                startHolyLoader();
                router.push(pathAfterLogin);
            })
            .catch(e => {
                const message = e.message ??
                    "An unexpected error occurred while communicating with the server";
                toast(message, false);

                // don't set these false in a finally() block, or there will be a brief period between
                // successfully logging in and navigating to the home page where the btn can be clicked
                // again after logging in.
                setLoading(false); 
                setRequestInFlight(false);
            });
    };

    return (<Container
        maxWidth='sm'
        component='form'
        onSubmit={handleSubmit}
    >
        <LoginForm formData={formData} changeHandler={handleChange} loading={loading} />
    </Container>);
}