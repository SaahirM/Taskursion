"use client"

import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/user/logout", {
            method: 'POST'
        })
        router.push("/");
    }
    
    return (<>
        <h1>After login</h1>
        <Button onClick={handleLogout}>Logout</Button>
        <Link href={"/user/settings"}>Settings</Link>
        <Link href={"/user/tasks/1"}>Task 1</Link>
    </>);
}