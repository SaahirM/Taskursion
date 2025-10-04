"use client";

import { Container } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SignupForm from "./SignupForm";
import { ToastContext } from "../ToastContextProvider";
import { useNetworkRequest } from "../NetworkReqInFlightContextProvider";
import { validateEmail, validateName, validatePass } from "@/src/util/validation";
import { startHolyLoader } from "holy-loader";

export default function Signup() {
    const router = useRouter();
    const toast = useContext(ToastContext);
    const { setRequestInFlight } = useNetworkRequest();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [formData, setFormData] = useState({ name: "", email: "", pass: "" });
    const [formError, setFormError] = useState({ name: "", email: "", pass: "" });

    const [loading, setLoading] = useState(false);

    const isAccountCreationFailed = searchParams.has("SocialSignupFailed");

    useEffect(() => {
        if (isAccountCreationFailed) {
            const socialSignUpProvider = searchParams.get("SocialSignupFailed") || "Provider";
            toast(
                `Sign up with ${socialSignUpProvider} failed. Email already in use with a different login method. Linking different sign-in accounts is currently unsupported`,
                true, { autoHideDuration: 30000 }
            );
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete("SocialSignupFailed");
            router.replace(`${pathname}?${newSearchParams}`);
        }
    }, [isAccountCreationFailed, searchParams]);

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
        setRequestInFlight(true);

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
                startHolyLoader();
                router.push("/home");
            })
            .catch(e => {
                const message = e.message ??
                    "An unexpected error occurred while communicating with the server";
                toast(message, false);

                // don't set these false in a finally() block, or there will be a brief period between
                // successfully signing up and navigating to the home page where the btn can be clicked again.
                setLoading(false);
                setRequestInFlight(false);
            });
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