"use client";

import { Button, Box, CircularProgress, Divider, Typography } from "@mui/material";
import { AutoDeleteRounded, Google } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useState, useContext } from "react";
import { ToastContext } from "../ToastContextProvider";
import { useNetworkRequest } from "../NetworkReqInFlightContextProvider";
import { startHolyLoader } from "holy-loader";
import { useRouter } from "next/navigation";

export default function AltLoginButtons() {
    const [loading, setLoading] = useState(null);
    const toast = useContext(ToastContext);
    const router = useRouter();
    const { isRequestInFlight, setRequestInFlight } = useNetworkRequest();

    const handleGoogleLogin = async () => {
        setLoading("google");
        setRequestInFlight(true);

        try {
            const result = await signIn('google', { callbackUrl: '/home' });
            
            if (result?.error) {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Google login error:', error);
            toast("An unexpected error occurred during Google login", false);


            // don't set these false in a finally() block, or there will be a brief period between
            // successfully logging in and navigating to the home page where the btn can be clicked
            // again.
            setLoading(null);
            setRequestInFlight(false);
        }
    };

    const handleDemoLogin = async () => {
        setLoading("demo");
        setRequestInFlight(true);

        fetch('/api/user/demo', { method: 'POST' })
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

    return (<>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
                or
            </Typography>
            <Divider sx={{ flex: 1 }} />
        </Box>

        <Box sx={{ width: '100%', position: 'relative' }}>
            <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={handleGoogleLogin}
                disabled={isRequestInFlight}
                sx={{
                    py: 1.5,
                    borderColor: '#4285f4',
                    color: '#4285f4',
                    '&:hover': {
                        borderColor: '#3367d6',
                        backgroundColor: 'rgba(66, 133, 244, 0.04)'
                    }
                }}
            >
                Continue with Google
            </Button>
            {loading === "google" && (
                <CircularProgress 
                    size={24} 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px'
                    }} 
                />
            )}
        </Box>

        <Box sx={{ my: 1, width: '100%', position: 'relative' }}>
            <Button
                fullWidth
                variant="outlined"
                startIcon={<AutoDeleteRounded />}
                onClick={handleDemoLogin}
                disabled={isRequestInFlight}
                sx={{ py: 1.5 }}
            >
                Create demo account
            </Button>
            {loading === "demo" && (
                <CircularProgress 
                    size={24} 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px'
                    }} 
                />
            )}
        </Box>
        
        <Typography variant="body2">
            Demo accounts are temporary. They are deleted upon logging out or after 24 hours,
            along with any data created during that time.
        </Typography>
    </>);
}

