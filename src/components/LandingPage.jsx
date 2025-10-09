"use client";

import { Box, Button, ButtonGroup, Typography, useMediaQuery } from "@mui/material";
import PlainBorderHeader from "./BorderHeaders/PlainBorderHeader";
import Link from "next/link";
import ThemeChangeBtn from "../app/theme/ThemeChangeBtn";

export default function LandingPage() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <PlainBorderHeader disableTopShadow>
            <Box sx={theme => ({
                position: 'fixed',
                width: `calc(100% - ${theme.spacing(2)})`,
                height: `calc(100% - ${theme.spacing(2)})`,
                top: theme.spacing(1),
                left: theme.spacing(1),
                boxShadow: `0 0 20px 4px ${theme.vars.palette.primary.main} inset`,
                [theme.getColorSchemeSelector('dark')]: {
                    boxShadow: `0 0 20px 4px ${theme.vars.palette.secondary.main} inset`,
                },
                borderRadius: 3,
                animation: '6s ease infinite fade-in-out',
                pointerEvents: 'none',

                '@keyframes fade-in-out': {
                    from: { opacity: 0 },
                    '50%': { opacity: 1 },
                    to: { opacity: 0 },
                },
            })} />
            <ThemeChangeBtn />
            <Typography
                variant="h1"
                sx={{
                    textAlign: 'center',
                    mt: '33vh'
                }}
            >
                Taskursion
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 4
                }}
            >
                <ButtonGroup
                    variant='contained'
                    orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                    fullWidth={isSmallScreen ? true : false}
                >
                    <Button
                        size='large'
                        sx={{
                            px: 8,
                            py: { xs: 3, sm: 1, md: 2 },
                            fontSize: { xs: '1.5rem', sm: '1.2rem' }
                        }}
                        LinkComponent={Link}
                        href="/signup"
                    >
                        Signup
                    </Button>
                    <Button
                        size='large'
                        sx={{
                            px: 8,
                            py: { xs: 3, sm: 1, md: 2 },
                            fontSize: { xs: '1.5rem', sm: '1.2rem' }
                        }}
                        LinkComponent={Link}
                        href="/login"
                    >
                        Login
                    </Button>
                </ButtonGroup>
            </Box>
        </PlainBorderHeader>
    );
}