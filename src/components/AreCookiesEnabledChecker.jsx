"use client";

export default function AreCookiesEnabledChecker() {
    console.log(navigator.cookieEnabled);
    return <></>;   //TODO show modal explaining why cookies are required
}