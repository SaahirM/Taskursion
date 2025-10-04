"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import NetworkReqInFlightContextProvider from "../NetworkReqInFlightContextProvider";
import { ToastContext } from "../ToastContextProvider";
import SignupContainer from "./SignupContainer";

export default function Signup() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const toast = useContext(ToastContext);

    const isAccountCreationFailed = searchParams.has("socialSignupFailed");

    useEffect(() => {
        if (isAccountCreationFailed) {
            const socialSignUpProvider = searchParams.get("socialSignupFailed") || "Provider";
            toast(
                `Sign up with ${socialSignUpProvider} failed. Email already in use with a different login method. Linking different sign-in accounts is currently unsupported`,
                true, { autoHideDuration: 30000 }
            );
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete("socialSignupFailed");
            router.replace(`${pathname}?${newSearchParams}`);
        }
    }, [isAccountCreationFailed, searchParams]);

    return (<NetworkReqInFlightContextProvider>
        <SignupContainer />
    </NetworkReqInFlightContextProvider>);
}