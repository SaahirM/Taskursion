import { Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AccountInfoSummary() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/user/logout", {
            method: 'POST'
        })
        router.push("/");
    }

    return (<Paper sx={{ p: 3, m: 1, border: 2 }}>
        <Typography component='p' variant='h4'>Username</Typography>
        <Button onClick={handleLogout} variant='contained' color='secondary' size='small'>Logout</Button>
    </Paper>);
}