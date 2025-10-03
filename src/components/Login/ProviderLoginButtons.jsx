"use client";

import { Button, Box, CircularProgress, Divider, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useContext } from "react";
import { ToastContext } from "../ToastContextProvider";

export default function ProviderLoginButtons() {
    const [loading, setLoading] = useState(false);
    const toast = useContext(ToastContext);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await signIn('google', { callbackUrl: '/home' });
            
            if (result?.error) {
                toast("Google login failed. Please try again.", false);
            }
        } catch (error) {
            console.error('Google login error:', error);
            toast("An unexpected error occurred during Google login", false);
        } finally {
            setLoading(false);
        }
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
                disabled={loading}
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
            {loading && (
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
    </>);
}

