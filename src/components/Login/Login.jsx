"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { ToastContext } from "../ToastContextProvider";
import LoginContainer from "./LoginContainer";
import NetworkReqInFlightContextProvider from "../NetworkReqInFlightContextProvider";

export default function Login() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const toast = useContext(ToastContext);

    const isNotLoggedIn = searchParams.has("notLoggedIn");
    const maybePathAfterLogin = searchParams.get("afterLogin");
    const pathAfterLogin = maybePathAfterLogin
        ? decodeURIComponent(maybePathAfterLogin)
        : "/home";

    useEffect(() => {
        if (isNotLoggedIn) {
            toast("Please log into your account first.");
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete("notLoggedIn");
            router.replace(`${pathname}?${newSearchParams}`);
        }
    }, []);

    return (<NetworkReqInFlightContextProvider>
        <LoginContainer pathAfterLogin={pathAfterLogin} />
    </NetworkReqInFlightContextProvider>);
}